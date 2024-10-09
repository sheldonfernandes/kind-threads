"use client";
import { useRouter } from "next/navigation";

import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { EndpointConst } from "@/src/constants/endpoints.constant";
import { QueryKey } from "@/src/constants/query-key.constant";
import { InventoryService } from "@/src/services/inventory.service";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/src/store/Auth.store";
export const UserDonationList = () => {
  const router = useRouter();
  const { userData } = useAuthStore();
  const { data: userDonationInventoryListData } = useQuery({
    queryKey: [QueryKey.USER_DONATION_INVENTORY_LIST],
    queryFn: () => InventoryService.getUserDonationInventoryList(userData?.user_id),
  });

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
        {userDonationInventoryListData &&
        userDonationInventoryListData.inventory_list.length ? (
          userDonationInventoryListData?.inventory_list.map((item) => (
            <Card className="my-3 mx-3" style={{ width: "18rem" }}>
              <Card.Img variant="top" src="https://picsum.photos/536/354" />
              <Card.Body>
                <Card.Title>{item.category}</Card.Title>
                <Card.Text>
                  Hi
                  <br />
                  Hello received your material on yellow
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
          <Alert key="info" variant="info">
            No Records
          </Alert>
        )}
      </Row>
    </Container>
  );
};

export default UserDonationList;
