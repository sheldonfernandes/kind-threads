"use client";

import React, { useState } from "react";
import { Button, Container, Form, Modal, Row } from "react-bootstrap";
import UploadFiles from "./UploadFiles";
import { useCreateInventory } from "@/src/hooks/useCreateInventory";
import { EndpointConst } from "@/src/constants/endpoints.constant";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/Auth.store";
import { AppUtil } from "@/src/utils/App.util";
import AppLoader from "../AppLoader";

export const DonateDetails = () => {
  const router = useRouter();
  const { userData } = useAuthStore();
  const [imageSource, setImageSource] = useState<string>("");
  const [fabricType, setFabricType] = useState<string>("Acrylic Fabric");
  const [pickUpAddress, setPickUpAddress] = useState<string>(
    userData?.address || ""
  );

  const { mutate, data: inventoryData, isPending } = useCreateInventory();
  const handleClose = () => {
    router.push(EndpointConst.MARKETPLACE_PAGE);
  };

  const handleGetFile = (imageSource: any) => {
    setImageSource(imageSource);
  };

  const onFabricChange = (event: any) => {
    setFabricType(event.currentTarget.value);
  };

  const onPickUpAddressChange = (event: any) => {
    setPickUpAddress(event.target.value);
  };

  const onSubmit = () => {
    mutate({
      user_id: userData?.user_id || "",
      user_name: userData?.user_name || "",
      fabric_type: fabricType,
      material_image: imageSource,
      pick_up_address: pickUpAddress,
    });
  };
  return (
    <Container className="my-3">
      <h4>Enter donate details</h4>
      <Form>
        <Form.Group className="my-3" controlId="fabricType">
          <Form.Label>Select Fabric</Form.Label>
          <Form.Select
            aria-label="Select Fabric"
            size="lg"
            onChange={onFabricChange}
          >
            <option value="Acrylic Fabric">Acrylic Fabric</option>
            <option value="Cotton">Cotton</option>
            <option value="Linen">Linen</option>
            <option value="Nylon">Nylon</option>
            <option value="Silk">Silk</option>
            <option value="Cotton">Cotton</option>
            <option value="Wool">Wool</option>
            <option value="Polyster">Polyster</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="my-3" controlId="pickupAddressTextArea">
          <Form.Label>Pick up address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={pickUpAddress}
            onChange={onPickUpAddressChange}
          />
        </Form.Group>
        <UploadFiles handleGetFile={handleGetFile} />

        <div className="d-grid gap-2 my-5">
          <Button variant="primary" size="lg" onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </Form>
      {inventoryData && (
        <Modal show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Thank you for your contribution</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Your item will be picked up before{" "}
            {new AppUtil().getDate(inventoryData?.picked_up_date)} from the
            given picked up address
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Okay
            </Button>
          </Modal.Footer>
        </Modal>
        
      )}
      {isPending && <AppLoader/>} 
    </Container>
  );
};

export default DonateDetails;
