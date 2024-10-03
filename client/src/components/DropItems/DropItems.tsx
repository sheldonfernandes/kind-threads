"use client";

import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

import styles from "./styles.module.css";
import { Phone, HouseAdd } from "react-bootstrap-icons";
import { FileMosaic, FullScreen, ImagePreview } from "@files-ui/react";

const sampleFileProps = {
  id: "fileId",
  size: 28 * 1024 * 1024,
  type: "image/jpeg",
  name: "Thor arrives wakanda.jpg",
  imageUrl: "https://cdn.wallpapersafari.com/0/95/1zms6H.jpg",
};

export default function DropItems() {
  const [imageSrc, setImageSrc] = React.useState(undefined);
  const [date, setDate] = React.useState(undefined);

  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };

  return (
    <Container fluid className="mt-2">
      <Row>
        <Col>
          <Card>
            <Card.Body className={`${styles.dropItemCard} `}>
              <h6 className="text-white text-center">ORG-ID-123</h6>
              <h6 className="text-white text-center">
                <strong>Foundation</strong>
              </h6>

              <div className="text-center">
                <span className="text-white !mb-3">
                  <Phone className={styles.icon} />
                  +1 123456789
                </span>
              </div>

              <div className="text-center">
                <span className="text-white !mb-3">
                  <HouseAdd className={styles.icon} />
                  New York, United States
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <h6 className="text-center mt-2">Items to donate</h6>
      <Row className="mt-2">
        <Col>
          <FileMosaic {...sampleFileProps} preview onSee={handleSee} />
        </Col>

        <Col>
          <FileMosaic {...sampleFileProps} preview onSee={handleSee} />
        </Col>
      </Row>

      <Form>
        <Form.Group className="my-3" controlId="formBasicDate">
          <Form.Label className="fw-bold">Pickup date</Form.Label>

          <Form.Control
            type="date"
            name="datepic"
            placeholder="DateRange"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>
      </Form>

      <div className="d-grid gap-2 mt-2">
        <Button variant="primary" size="lg">
          Drop off
        </Button>
      </div>

      <FullScreen
        open={imageSrc !== undefined}
        onClose={() => setImageSrc(undefined)}
      >
        <ImagePreview src={imageSrc} />
      </FullScreen>
    </Container>
  );
}
