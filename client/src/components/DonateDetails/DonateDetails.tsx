"use client";

import React, { useState } from "react";
import { Alert, Button, Container, Form, Modal, Row } from "react-bootstrap";
import UploadFiles from "./UploadFiles";
import { useCreateInventory } from "@/src/hooks/useCreateInventory";
import { EndpointConst } from "@/src/constants/endpoints.constant";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/Auth.store";
import { AppUtil } from "@/src/utils/App.util";
import AppLoader from "../AppLoader";
import DonationDetailsConfirmation from "../DonationDetailsConfirmation/DonationDetailsConfirmation";

export const DonateDetails = () => {
  const router = useRouter();
  const { userData } = useAuthStore();
  const [imageSource, setImageSource] = useState<string>("");
  const [pickUpAddress, setPickUpAddress] = useState<string>(
    userData?.address || ""
  );

  const { mutate, data: inventoryData, isPending, isError } = useCreateInventory();
  const handleClose = () => {
    router.push(EndpointConst.MARKETPLACE_PAGE);
  };

  const handleGetFile = (imageSource: any) => {
    setImageSource(imageSource);
  };

  const onPickUpAddressChange = (event: any) => {
    setPickUpAddress(event.target.value);
  };

  const onSubmit = () => {
    mutate({
      user_id: userData?.user_id || "",
      user_name: userData?.user_name || "",
      material_image: imageSource,
      pick_up_address: pickUpAddress,
    });
  };

  return (
    <Container className="my-3">
      {
        isError && <Alert key="danger" variant="danger" dismissible >
        Failed to submit the response! Please try after sometime
      </Alert>
      }
      <h4>Enter donate details</h4>
      <Form>
      <UploadFiles handleGetFile={handleGetFile} />
        <Form.Group className="my-3" controlId="pickupAddressTextArea">
          <Form.Label>Pick up address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={pickUpAddress}
            onChange={onPickUpAddressChange}
          />
        </Form.Group>
       

        <div className="d-grid gap-2 my-5">
          <Button variant="primary" size="lg" onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </Form>
      {inventoryData && (
        <Modal show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Verify the following details about your donation:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DonationDetailsConfirmation initialData={inventoryData} />
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer> */}
        </Modal>
        
      )}
      {isPending && <AppLoader/>} 
    </Container>
  );
};

export default DonateDetails;
