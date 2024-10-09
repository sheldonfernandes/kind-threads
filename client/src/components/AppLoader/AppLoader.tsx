"use client";

import React from "react";
import { Spinner, Container } from "react-bootstrap";

export const AppLoader = () => {
  return (
    <Container
      fluid
      className="position-fixed"
      style={{
        top: 0,
        left: 0,
        backgroundColor: "rgba(129,254,188,0.5)",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Spinner
        animation="grow"
        variant="success"
        style={{ width: "10rem", height: "10rem" }}
      />
    </Container>
  );
};
