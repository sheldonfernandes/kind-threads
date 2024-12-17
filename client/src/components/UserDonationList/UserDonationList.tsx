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
import { useAuthStore } from "@/src/store/Auth.store";
import {
  InventoryData,
  InventoryDetailModal,
  InventoryListType,
  DonationStatusEnum,
} from "@/src/types/inventory.type";
import { useState } from "react";
import { AppUtil } from "@/src/utils/App.util";
import { GeoAltFill } from "react-bootstrap-icons";
import "./userDonationList.css";
type Iprops = {
  onUpdateStatus: (inventory_id: string, status: string) => void;
  userDonationInventoryListData: InventoryListType | undefined;
};

export const UserDonationList = (props: Iprops) => {
  const { userDonationInventoryListData, onUpdateStatus } = props;
  const router = useRouter();
  const { userData } = useAuthStore();

  const [detailModal, setDetailModal] = useState<InventoryDetailModal>({
    showModal: false,
  });

  const onDonationClick = () => {
    router.push(EndpointConst.DONATION_DETAILS_PAGE);
  };

  const onDetailsClick = (item: InventoryData) => {
    setDetailModal({
      showModal: true,
      inventory_id: item.inventory_id,
      category: item.category,
      donation_center_selected: item.donation_center_selected,
      pick_up_address: item.pick_up_address,
      picked_up_date: item.picked_up_date
        ? new AppUtil().getDate(item.picked_up_date)
        : "",
    });
  };

  const handleClose = () => setDetailModal({ showModal: false });

  const handlePickedUp = (inventory_id: string | undefined) => {
    onUpdateStatus(inventory_id || "", DonationStatusEnum.RECEIVED);
    setDetailModal({ showModal: false });
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
          <span style={{ display: "flex", alignItems: "center" }}>
            <GeoAltFill fill="red" /> {userData?.address}
          </span>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
          <Button
            className="float-end my-3"
            variant="success"
            onClick={onDonationClick}
          >
            Donate
          </Button>
        </Col>
      </Row>
      <Row>
        {userDonationInventoryListData &&
        userDonationInventoryListData.inventory_list.length ? (
          <Row>
            {userDonationInventoryListData?.inventory_list.map(
              (item: InventoryData, index: number) => (
                <Col xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
                  <Card className="my-3 mx-3">
                    <Card.Img
                      style={{ height: "18rem" }}
                      variant="top"
                      src={item.material_image}
                    />

                    <Card.Body>
                      <Card.Title
                        className="cardTitle1"
                        title={item.ai_response.short_desc}
                      >
                        {item.ai_response.short_desc}
                      </Card.Title>
                      <Card.Text>
                        <p>
                          {item.donation_status ===
                            DonationStatusEnum.PENDING ||
                          item.donation_status === DonationStatusEnum.SELF_CLAIM
                            ? "Ready to pickup"
                            : item.donation_status ===
                              DonationStatusEnum.PICKED_UP
                            ? "Item Picked Up"
                            : "Donated"}
                          <br />
                          Listed on:{" "}
                          {new AppUtil().getDate(item.picked_up_date)}
                          <br />
                          {item.pick_up_address}
                        </p>
                      </Card.Text>

                      {item.donation_status === DonationStatusEnum.PICKED_UP &&
                        item.collector_id === userData?.user_id && (
                          <Button onClick={() => onDetailsClick(item)}>
                            Drop off
                          </Button>
                        )}
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
            <Col>Donation Centre</Col>
            <Col>{detailModal?.donation_center_selected}</Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Okay
          </Button>
          <Button
            variant="primary"
            onClick={() => handlePickedUp(detailModal?.inventory_id)}
          >
            Dropped off
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserDonationList;
