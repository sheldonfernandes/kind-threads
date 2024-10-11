"use client";

import React from "react";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Image,
} from "react-bootstrap";

const Stats = () => {
  return (
    <div className="my-3">
      <Row>
        <Col sm={12} md={4} lg={4} xl={4}>
          <Card>
            <CardBody>
              <Row>
                <Col>
                  <CardTitle className="text-uppercase text-muted mb-0">
                    Carbon Footprints
                  </CardTitle>
                  <span className="h2 font-weight-bold mb-0">350,897</span>
                </Col>
                <Col>
                  <Image
                    style={{ height: "10rem" }}
                    src="/assets/foot-print.png"
                    alt="Carbon Footprint"
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col sm={12} md={4} lg={4} xl={4}>
          <Card>
            <CardBody>
              <Row>
                <Col>
                  <CardTitle className="text-uppercase text-muted mb-0">
                    Water Saved
                  </CardTitle>
                  <span className="h2 font-weight-bold mb-0">350,897</span>
                </Col>
                <Col>
                  <Image
                    style={{ height: "10rem" }}
                    src="/assets/droplet.png"
                    alt="Water Saved"
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col sm={12} md={4} lg={4} xl={4}>
          <Card>
            <CardBody>
              <Row>
                <Col>
                  <CardTitle className="text-uppercase text-muted mb-0">
                    Clothes donated
                  </CardTitle>
                  <span className="h2 font-weight-bold mb-0">350,897</span>
                </Col>
                <Col>
                  <Image
                    style={{ height: "10rem" }}
                    src="/assets/clothes.png"
                    alt="Clothes Donated"
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Stats;
