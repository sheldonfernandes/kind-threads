"use client";

import Category from "@/src/components/Dashboard/Category";
import Consumption from "@/src/components/Dashboard/Consumption";
import Footprint from "@/src/components/Dashboard/Footprint";
import Leaderboard from "@/src/components/Dashboard/Leaderboard";
import Stats from "@/src/components/Dashboard/Stats";
import withAuth from "@/src/components/ProtectedRoute";
import UserFeeds from "@/src/components/UserFeeds";
import { EndpointConst } from "@/src/constants/endpoints.constant";
import { useRouter } from "next/navigation";
import { Button,Image, Col, Container, Row } from "react-bootstrap";

export const Home = () => {
  const router = useRouter();

  const onDonationClick = () => {
    router.push(EndpointConst.DONATION_DETAILS_PAGE);
  };
  return (
    <Container>
      <Stats />     
      <UserFeeds/>
      <Row>
        <Col>
          <Button
            className="position-fixed rounded-circle fs-1 fw-bold"
            style={{bottom:"2rem", right:"2rem", width:"5rem", height:"5rem"}}
            variant="success"
            onClick={onDonationClick}
          >+</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
