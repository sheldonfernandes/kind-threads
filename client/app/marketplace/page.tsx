"use client";
import AppLoader from "@/src/components/AppLoader";
import DroppedoffList from "@/src/components/DroppedOffList";
import MarketplaceDetail from "@/src/components/MarketplaceDetail";
import PickedUpList from "@/src/components/PickedUpList";
import withAuth from "@/src/components/ProtectedRoute";
import UserDonationList from "@/src/components/UserDonationList/UserDonationList";
import { QueryKey } from "@/src/constants/query-key.constant";
import { useUpdateInventory } from "@/src/hooks/useUpdateInventory";
import { InventoryService } from "@/src/services/inventory.service";
import { useAuthStore } from "@/src/store/Auth.store";
import {
  OrganizationStatusEnum
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
        OrganizationStatusEnum.PICKED_UP
      ),
  });

  const {
    data: inventoryListData,
    isPending: isInventoryListPending,
    refetch: refetchInventoryList,
  } = useQuery({
    queryKey: [QueryKey.DROPPEDOFF_LIST],
    queryFn: () =>
      InventoryService.getCollectorInventoryList(
        userData?.user_id || "",
        OrganizationStatusEnum.RECEIVED
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
    refetchInventoryList();
    refetchUserDonationInventoryList()
  }, [isSuccessUpdateInventory]);

  const onUpdateStatus = (inventory_id: string, status: string) => {
    UpdateMutate({
      inventory_id: inventory_id,
      collector_id: userData?.user_id || "",
      collector_name: userData?.user_name || "",
      organization_received_status: status,
    });
  };

  return (
    <Container>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(key) => key && setKey(key)}
        className="mb-3"
      >
        <Tab eventKey="marketplace" title="Marketplace">
          <MarketplaceDetail
            onUpdateStatus={onUpdateStatus}
            markeplaceListData={markeplaceListData}
          />
        </Tab>
        <Tab eventKey="my_donation" title="My Donation">
          <UserDonationList 
          userDonationInventoryListData={userDonationInventoryListData}/>
        </Tab>
        <Tab eventKey="picked_up" title="Picked Up">
          <PickedUpList
            onUpdateStatus={onUpdateStatus}
            pickedUpListData={pickedUpListData}
          />
        </Tab>
        <Tab eventKey="received" title="Dropped Off">
          <DroppedoffList inventoryListData={inventoryListData} />
        </Tab>
      </Tabs>
      {(ismarkeplaceListPending ||
        ispickedUpListPending ||
        isInventoryListPending ||
        isUpdateStatusPending ||
        isUserInventoryListPending) && <AppLoader />}
    </Container>
  );
};

export default withAuth(Marketplace);
