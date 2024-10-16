"use client";
import AppLoader from "@/src/components/AppLoader";
import MarketplaceDetail from "@/src/components/MarketplaceDetail";
import PickedUpList from "@/src/components/PickedUpList";
import withAuth from "@/src/components/ProtectedRoute";
import UserDonationList from "@/src/components/UserDonationList/UserDonationList";
import { QueryKey } from "@/src/constants/query-key.constant";
import { useUpdateInventory } from "@/src/hooks/useUpdateInventory";
import { InventoryService } from "@/src/services/inventory.service";
import { useAuthStore } from "@/src/store/Auth.store";
import {
  DonationStatusEnum
} from "@/src/types/inventory.type";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
export const Marketplace = () => {
  const [key, setKey] = useState("marketplace");
  const { userData } = useAuthStore();
  const {
    mutate: UpdateMutate,
    isPending: isUpdateStatusPending,
    isSuccess: isSuccessUpdateInventory,
  } = useUpdateInventory();

  const {
    data: markeplaceListData,
    isPending: ismarkeplaceListPending,
    refetch: refetchMarketplaceList,
  } = useQuery({
    queryKey: [QueryKey.MARKETPLACE_LIST],
    queryFn: () => InventoryService.getMarketplaceList(),
  });

  const {
    data: pickedUpListData,
    isPending: ispickedUpListPending,
    refetch: refetchPickedUpList,
  } = useQuery({
    queryKey: [QueryKey.PICKEDUP_LIST],
    queryFn: () =>
      InventoryService.getCollectorInventoryList(
        userData?.user_id || "",
        DonationStatusEnum.PICKED_UP
      ),
  });

  const {
    data: userDonationInventoryListData,
    isPending: isUserInventoryListPending,
    refetch: refetchUserDonationInventoryList
  } = useQuery({
    queryKey: [QueryKey.USER_DONATION_INVENTORY_LIST],
    queryFn: () =>
      InventoryService.getUserDonationInventoryList(userData?.user_id),
  });

  useEffect(() => {
    refetchMarketplaceList();
    refetchPickedUpList();
    refetchUserDonationInventoryList()
  }, [isSuccessUpdateInventory]);

  const onUpdateStatus = (inventory_id: string, status: string) => {
    UpdateMutate({
      inventory_id: inventory_id,
      collector_id: userData?.user_id || "",
      collector_name: userData?.user_name || "",
      donation_status: status,
    });
  };

  return (
    <Container className="my-3">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(key) => key && setKey(key)}
        className="mb-3"
        fill
      >
        <Tab eventKey="marketplace" title="Marketplace">
          <MarketplaceDetail
            onUpdateStatus={onUpdateStatus}
            markeplaceListData={markeplaceListData}
          />
        </Tab>
        <Tab eventKey="my_donation" title="My Donation">
          <UserDonationList 
          onUpdateStatus={onUpdateStatus}
          userDonationInventoryListData={userDonationInventoryListData}/>
        </Tab>
        <Tab eventKey="picked_up" title="Picked Up">
          <PickedUpList
            onUpdateStatus={onUpdateStatus}
            pickedUpListData={pickedUpListData}
          />
        </Tab>
        {/* <Tab eventKey="received" title="Dropped Off">
          <DroppedoffList inventoryListData={inventoryListData} />
        </Tab> */}
      </Tabs>
      {(ismarkeplaceListPending ||
        ispickedUpListPending ||
        isUpdateStatusPending ||
        isUserInventoryListPending) && <AppLoader />}
    </Container>
  );
};

export default withAuth(Marketplace);
