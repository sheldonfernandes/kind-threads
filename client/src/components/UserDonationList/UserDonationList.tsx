"use client";
import { useRouter } from "next/navigation";

import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { EndpointConst } from "@/src/constants/endpoints.constant";
export const UserDonationList = () => {
  const router = useRouter();

  const userInventoryList = [
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
  const onDonationClick = () => {
    router.push(EndpointConst.DONATION_DETAILS_PAGE);
  };
  return (
    <Container fluid>
      <Row>
        <Col>
          <Button
            className="float-end my-3"
            variant="success"
            onClick={onDonationClick}
          >
            Donate Clothes
          </Button>
        </Col>
      </Row>
      <Row>
        {userInventoryList.map((item) => (
          <Card className="my-3 mx-3" style={{ width: "18rem" }}>
            <Card.Img variant="top" src="https://picsum.photos/536/354" />
            <Card.Body>
              <Card.Title>{item.category}</Card.Title>
              <Card.Text>
                {item.reason_for_category}
                <br />
                {item.organization_name} received your material on{" "}
                {item.dropped_off_date}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
};

export default UserDonationList;
