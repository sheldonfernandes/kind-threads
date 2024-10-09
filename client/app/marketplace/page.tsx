"use client";
import InventoryItem from "@/src/components/InventoryItem";
import MarketplaceDetail from "@/src/components/MarketplaceDetail";
import withAuth from "@/src/components/ProtectedRoute";
import UserDonationList from "@/src/components/UserDonationList/UserDonationList";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
export const Marketplace = () => {
  const [key, setKey] = useState("marketplace");
  const router = useRouter();
 
  return (
    <Container>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(key) => key && setKey(key)}
        className="mb-3"
      >
        <Tab eventKey="marketplace" title="Marketplace">
          <MarketplaceDetail />
        </Tab>
        <Tab eventKey="my_donation" title="My Donation">
        <UserDonationList />
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

export default withAuth(Marketplace);
