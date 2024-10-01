"use client";

import React from "react";
import { Container, Form } from "react-bootstrap";
import Upload from "./Upload";

export default function DonateDetails() {
  return (
    <Container fluid>
      <Form>
        <Form.Group className="mb-3" controlId="fabricType">
          <Form.Label>Select Fabric</Form.Label>
          <Form.Select aria-label="Select Fabric" size="lg">
            <option value="1">Cotton</option>
            <option value="2">Nylon</option>
            <option value="3">Polyster</option>
          </Form.Select>
        </Form.Group>
        <Upload />
      </Form>
    </Container>
  );
}
