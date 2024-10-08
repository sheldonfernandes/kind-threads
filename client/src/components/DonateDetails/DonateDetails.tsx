"use client";

import React, { useState } from "react";
import { Button, Container, Form, Modal, Row } from "react-bootstrap";
import UploadFiles from "./UploadFiles";
import { useCreateInventory } from "@/src/hooks/useCreateInventory";
import { EndpointConst } from "@/src/constants/endpoints.constant";
import { useRouter } from "next/navigation";

export const DonateDetails = () => {
  const router = useRouter()
  const [imageSource, setImageSource] = useState("");
  const { mutate, data: inventoryData } = useCreateInventory();
  const handleClose = () => {    
    router.push(EndpointConst.MARKETPLACE_PAGE)
  }

  const handleGetFile = (imageSource: any ) =>{
    setImageSource(imageSource)
  }
  
 

  const onSubmit = () => {
    mutate({
      user_id: "66f6c471074a115f4a725f02",
      user_name: "Will Smith",
      fabric_type: "Cotton",
      material_image: imageSource,
      pick_up_address: "test",
    });
  };
  return (
    <Container className="my-3">
      <h4>Enter donate details</h4>
      <Form>
        <Form.Group className="mb-3" controlId="fabricType">
          <Form.Label>Select Fabric</Form.Label>
          <Form.Select aria-label="Select Fabric" size="lg">
            <option value="1">Cotton</option>
            <option value="2">Nylon</option>
            <option value="3">Polyster</option>
          </Form.Select>
        </Form.Group>
        <UploadFiles 
        handleGetFile={handleGetFile}/>
        
        <div className="d-grid gap-2 mt-2">
          <Button variant="primary" size="lg" onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </Form>
      {inventoryData && <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thank you for your contribution</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your item will be picked up before {inventoryData?.picked_up_date}
          from the given picked up address
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal> }
    </Container>
  );
};

export default DonateDetails;
