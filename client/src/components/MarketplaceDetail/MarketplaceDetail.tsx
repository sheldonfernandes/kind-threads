import {
  InventoryData,
  InventoryDetailModal,
  InventoryListType,
  DonationStatusEnum,
} from "@/src/types/inventory.type";
import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
} from "react-bootstrap";
import { AppUtil } from "@/src/utils/App.util";

type Iprops = {
  onUpdateStatus: (inventory_id: string, status: string) => void;
  markeplaceListData: InventoryListType | undefined;
};
export const MarketplaceDetail = (props: Iprops) => {
  const { markeplaceListData, onUpdateStatus } = props;

  const [detailModal, setDetailModal] = useState<InventoryDetailModal>({
    showModal: false,
  });

  const onDetailsClick = (item: InventoryData) => {
    setDetailModal({
      showModal: true,
      category: item.category,
      donation_center_selected: item.donation_center_selected,
      pick_up_address: item.pick_up_address,
      donation_status: item.donation_status,
      inventory_id: item.inventory_id,
      picked_up_date: item.picked_up_date
        ? new AppUtil().getDate(item.picked_up_date)
        : "",
    });
  };

  const handleClose = () => setDetailModal({ showModal: false });

  const handlePickedUp = (
    inventory_id: string | undefined,
    donation_status: string | undefined
  ) => {
    onUpdateStatus(
      inventory_id || "",
      donation_status && donation_status === DonationStatusEnum.SELF_CLAIM
        ? DonationStatusEnum.SELF_CLAIM_PICKEDUP
        : DonationStatusEnum.PICKED_UP
    );
    setDetailModal({ showModal: false });
  };
  return (
    <Container fluid>
      <Row>
        {markeplaceListData && markeplaceListData.inventory_list.length ? (
          <Row>
            {markeplaceListData?.inventory_list.map((item: InventoryData) => (
              <Col xs={12} sm={6} md={4} lg={4} xl={4}>
                <Card className="my-3 mx-3">
                  <Card.Img
                    style={{ height: "15rem" }}
                    variant="top"
                    src={item.material_image}
                  />

                  <Card.Body>
                    <Card.Title>{item.category}</Card.Title>
                    <Card.Text>
                      <p>
                        Status: {item.donation_status}
                        <br />
                        Pickup date:{" "}
                        {new AppUtil().getDate(item.picked_up_date)}
                        <br />
                        Pickup Address: {item.pick_up_address}
                      </p>
                    </Card.Text>

                    <Button onClick={() => onDetailsClick(item)}>
                      Pick up
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
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
            onClick={() =>
              handlePickedUp(
                detailModal?.inventory_id,
                detailModal?.donation_status
              )
            }
          >
            Picked Up
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
