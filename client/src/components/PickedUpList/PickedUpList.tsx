import { useAuthStore } from "@/src/store/Auth.store";
import {
  InventoryData,
  InventoryDetailModal,
  InventoryListType,
  OrganizationStatusEnum,
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
import AppLoader from "../AppLoader";
import { AppUtil } from "@/src/utils/App.util";
type Iprops = {
  onUpdateStatus: (inventory_id: string,status:string) => void;
  pickedUpListData: InventoryListType | undefined;
};

export const PickedUpList = (props: Iprops) => {
  const {pickedUpListData,onUpdateStatus} = props;
  const [detailModal, setDetailModal] = useState<InventoryDetailModal>({
    showModal: false,
  });

  const onDetailsClick = (item: InventoryData) => {
    setDetailModal({
      showModal: true,
      category: item.category,
      organization_name: item.organization_name,
      organization_address: item.organization_address,
      pick_up_address: item.pick_up_address,
      inventory_id: item.inventory_id,
      picked_up_date: item.picked_up_date
        ? new AppUtil().getDate(item.picked_up_date)
        : "",
      drop_off_date: item.drop_off_date
        ? new AppUtil().getDate(item.drop_off_date)
        : "",
    });
  };

  const handleClose = () => setDetailModal({ showModal: false });

  const handleDroppedOff = (inventory_id: string | undefined) => {
    onUpdateStatus( inventory_id || "", OrganizationStatusEnum.RECEIVED);
    setDetailModal({ showModal: false });
  };
  return (
    <Container fluid>
      <Row>
        {pickedUpListData && pickedUpListData.inventory_list?.length ? (
          <Row>
            {pickedUpListData?.inventory_list.map((item: InventoryData) => (
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
                        Item Picked up
                        <br />
                        Pickup date:{" "}
                        {new AppUtil().getDate(item.picked_up_date)}
                        <br />
                        Pickup Address: {item.pick_up_address}
                      </p>
                    </Card.Text>

                    <Button onClick={() => onDetailsClick(item)}>
                      Drop Off
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
            <Col>Organization Name</Col>
            <Col>{detailModal?.organization_name}</Col>
          </Row>
          <Row>
            <Col>Drop off date</Col>
            <Col>{detailModal?.drop_off_date}</Col>
          </Row>
          <Row>
            <Col>Drop off Address</Col>
            <Col>{detailModal?.organization_address}</Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Okay
          </Button>
          <Button
            variant="primary"
            onClick={() => handleDroppedOff(detailModal?.inventory_id)}
          >
            Dropped off
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};