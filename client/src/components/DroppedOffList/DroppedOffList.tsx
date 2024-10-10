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

export const DroppedoffList = () => {
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
    data: inventoryListData,
    isPending: isInventoryListPending,
    refetch: refetchInventoryList,
  } = useQuery({
    queryKey: [QueryKey.DROPPEDOFF_LIST],
    queryFn: () =>
      InventoryService.getCollectorInventoryList(
        userData?.user_id || "",
        OrganizationStatusEnum.RECEIVED
      ),
  });

  console.log(inventoryListData)

  useEffect(() => {
    refetchInventoryList();
  }, []);

  const onDetailsClick = (item: InventoryData) => {
    setDetailModal({
      showModal: true,
      category: item.category,
      user_name: item.user_name,
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

  if (isSuccessUpdateInventory) {
    refetchInventoryList();
  }

  return (
    <Container fluid>
      <Row>
        {inventoryListData && inventoryListData.inventory_list?.length ? (
          <Row>
            {inventoryListData?.inventory_list.map((item: InventoryData) => (
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
                        Organization : {item.organization_name}
                        Received date:{" "}
                        {new AppUtil().getDate(item.drop_off_date)}
                        <br />
                        Organization Address: {item.organization_address}
                      </p>
                    </Card.Text>

                    <Button onClick={() => onDetailsClick(item)}>
                      Details
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
            <Col>Donor's Name</Col>
            <Col>{detailModal?.user_name}</Col>
          </Row>
          <Row>
            <Col>Picked up date</Col>
            <Col>{detailModal?.picked_up_date}</Col>
          </Row>
          <Row>
            <Col>Picked up Address</Col>
            <Col>{detailModal?.pick_up_address}</Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
      {isInventoryListPending && isUpdateStatusPending && <AppLoader />}
    </Container>
  );
};
