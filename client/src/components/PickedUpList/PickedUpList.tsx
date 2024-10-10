import { useAuthStore } from "@/src/store/Auth.store";
import {
  InventoryData,
  InventoryDetailModal,
  OrganizationStatusEnum,
} from "@/src/types/inventory.type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { QueryKey } from "@/src/constants/query-key.constant";
import { useQuery } from "@tanstack/react-query";
import { InventoryService } from "@/src/services/inventory.service";
import { useUpdateInventory } from "@/src/hooks/useUpdateInventory";

export const PickedUpList = () => {
  const { userData } = useAuthStore();
  const {
    mutate,
    isPending: isUpdateStatusPending,
    isSuccess: isSuccessUpdateInventory,
  } = useUpdateInventory();
  const [detailModal, setDetailModal] = useState<InventoryDetailModal>({
    showModal: false,
  });
  const {
    data: pickedUpListData,
    isPending: ispickedUpListPending,
    refetch: refetchPickedUpList,
  } = useQuery({
    queryKey: [QueryKey.PICKEDUP_LIST],
    queryFn: () =>
      InventoryService.getPickedUpList(
        userData?.user_id || "",
        OrganizationStatusEnum.PICKED_UP
      ),
  });

  console.log(pickedUpListData);

  useEffect(() => {
    refetchPickedUpList();
  }, []);

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
    mutate({
      inventory_id: inventory_id || "",
      collector_id: userData?.user_id || "",
      collector_name: userData?.user_name || "",
      organization_received_status: OrganizationStatusEnum.RECEIVED,
    });
    setDetailModal({ showModal: false });
  };

  if (isSuccessUpdateInventory) {
    refetchPickedUpList();
  }

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
      {ispickedUpListPending && isUpdateStatusPending && <AppLoader />}
    </Container>
  );
};
