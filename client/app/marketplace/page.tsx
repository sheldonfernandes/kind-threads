"use client";
import InventoryItem from "@/src/components/InventoryItem";
import UserDonationList from "@/src/components/UserDonationList/UserDonationList";
import { QueryKey } from "@/src/constants/query-key.constant";
import { InventoryService } from "@/src/services/inventory.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Alert, Container, Tab, Tabs } from "react-bootstrap";
export const Marketplace = () => {
  const [key, setKey] = useState("marketplace");

  const { data: userDonationInventoryListData } = useQuery({
    queryKey: [QueryKey.USER_DONATION_INVENTORY_LIST],
    queryFn: () => InventoryService.getUserDonationInventoryList("1"),
  });

  const inventoryPendingList = [
    {
      inventory_id: "4234",
      category: "Donate",
      reason_for_category: "Gently used item",
      picked_up_date: "14/09/2024",
      organization_name: "foundation",
      organization_received_status: "Received",
      dropped_off_date: "19/09/2024",
    },
    {
      inventory_id: "4234",
      category: "Recycle",
      reason_for_category: "Can be recycled",
      picked_up_date: "14/09/2024",
      organization_name: "foundation",
      organization_received_status: "Received",
      dropped_off_date: "19/09/2024",
    },
    {
      inventory_id: "4234",
      category: "Upcycle",
      reason_for_category: "reinvent",
      picked_up_date: "14/09/2024",
      organization_name: "foundation",
      organization_received_status: "Received",
      dropped_off_date: "19/09/2024",
    },
  ];
  return (
    <Container>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(key) => key && setKey(key)}
        className="mb-3"
      >
        <Tab eventKey="marketplace" title="Marketplace">
          <InventoryItem />
        </Tab>
        <Tab eventKey="my_donation" title="My Donation">
          {userDonationInventoryListData?.user_donation_list &&
          userDonationInventoryListData.user_donation_list.length ? (
            <UserDonationList />
          ) : (
            <Alert key="info" variant="info">
              No Records
            </Alert>
          )}
        </Tab>
        <Tab eventKey="picked_up" title="Picked Up">
          <InventoryItem />
        </Tab>
        <Tab eventKey="received" title="Dropped Off">
          <InventoryItem />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Marketplace;
