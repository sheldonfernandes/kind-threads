"use client";
import { useRouter } from "next/navigation";

import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
} from "react-bootstrap";
import { EndpointConst } from "@/src/constants/endpoints.constant";
import { QueryKey } from "@/src/constants/query-key.constant";
import { InventoryService } from "@/src/services/inventory.service";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/src/store/Auth.store";
import {
  InventoryData,
  InventoryDetailModal,
  InventoryListType,
  OrganizationStatusEnum,
} from "@/src/types/inventory.type";
import { useEffect, useState } from "react";
import { AppUtil } from "@/src/utils/App.util";
import AppLoader from "../AppLoader";


type Iprops = {
  userDonationInventoryListData: InventoryListType | undefined;
};


export const UserDonationList = (props: Iprops) => {
  const {userDonationInventoryListData} = props;
  const router = useRouter();
  const [detailModal, setDetailModal] = useState<InventoryDetailModal>({
    showModal: false,
  });

  const onDonationClick = () => {
    router.push(EndpointConst.DONATION_DETAILS_PAGE);
  };

  const onDetailsClick = (item: InventoryData) => {
    setDetailModal({
      showModal: true,
      category: item.category,
      organization_name: item.organization_name,
      organization_address:item.organization_address,
      pick_up_address: item.pick_up_address,
      picked_up_date: item.picked_up_date
        ? new AppUtil().getDate(item.picked_up_date)
        : "",
    });
  };

  const handleClose = () => setDetailModal({ showModal: false });

  const handlePickedUp = () => {};

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
          <Row>
            {userDonationInventoryListData?.inventory_list.map(
              (item: InventoryData) => (
                <Col xs={12} sm={6} md={4} lg={3} xl={3}>
                  <Card className="my-3 mx-3">
                    <Card.Img
                      style={{ height: "18rem" }}
                      variant="top"
                      src={item.material_image}
                    />

                    <Card.Body>
                      <Card.Title>{item.category}</Card.Title>
                      <Card.Text>
                        <p>
                          Status: {item.organization_received_status===OrganizationStatusEnum.PENDING?'Pending':(item.organization_received_status===OrganizationStatusEnum.PICKED_UP?'Item Picked Up':'Received')}
                          <br />
                          Pickup date:{" "}
                          {new AppUtil().getDate(item.picked_up_date)}
                          <br />
                          Pickup Address: {item.pick_up_address}
                        </p>
                      </Card.Text>

                      {item.organization_received_status===OrganizationStatusEnum.PENDING && <Button onClick={() => onDetailsClick(item)}>
                        Pick up
                      </Button> }
                    </Card.Body>
                  </Card>
                </Col>
              )
            )}
          </Row>
        ) : (
          <Alert key="info" variant="info">
            No Records
          </Alert>
        )}
      </Row>
      <Modal show={detailModal.showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Item Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>Pick up date</Col>
            <Col>{detailModal?.picked_up_date}</Col>
          </Row>
          <Row>
            <Col>Pick up Address</Col>
            <Col>{detailModal?.pick_up_address}</Col>
          </Row>
          <Row>
            <Col>Organization Name</Col>
            <Col>{detailModal?.organization_name}</Col>
          </Row>
          <Row>
              <Col>Organization Address</Col>
              <Col>{detailModal?.organization_address}</Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Okay
          </Button>
          <Button variant="primary" onClick={handlePickedUp}>
            Picked Up
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserDonationList;
