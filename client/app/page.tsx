"use client";

import Category from "@/src/components/Dashboard/Category";
import Consumption from "@/src/components/Dashboard/Consumption";
import Footprint from "@/src/components/Dashboard/Footprint";
import Leaderboard from "@/src/components/Dashboard/Leaderboard";
import Stats from "@/src/components/Dashboard/Stats";
import withAuth from "@/src/components/ProtectedRoute";
import UserFeeds from "@/src/components/UserFeeds";
import { Container } from "react-bootstrap";

export const Dashboard = () => {
  return (
    <Container>
      <Stats />
      <UserFeeds/>
    </Container>
  );
};

export default Dashboard;
