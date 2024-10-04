"use client";

import Category from "@/src/components/Dashboard/Category";
import Consumption from "@/src/components/Dashboard/Consumption";
import Footprint from "@/src/components/Dashboard/Footprint";
import Leaderboard from "@/src/components/Dashboard/Leaderboard";
import Stats from "@/src/components/Dashboard/Stats";
import { Container } from "react-bootstrap";
// import InfiniteScrollPosts from "./post/page";

export const Dashboard = () => {
  return (
    <Container fluid>
      {/* <InfiniteScrollPosts /> */}
      <Stats />

      <Footprint />

      <Consumption />
      <Category />

      <Leaderboard />
    </Container>
    // </div>
  );
};

export default Dashboard;
