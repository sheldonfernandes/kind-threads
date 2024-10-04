"use client";

import React from "react";
import { Card, CardBody, CardTitle, Row, Col, Image } from "react-bootstrap";

const Stats = () => {
  return (
    <div className="pb-8 pt-3 pt-md-8">
      <div className="header-body">
        {/* Card stats */}
        <Row>
          <Col lg="6" xl="3">
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Row>
                  <div className="col-auto">
                    <CardTitle className="text-uppercase text-muted mb-0">
                      Carbon Footprints
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">350,897</span>
                  </div>
                  <Col>
                    <Image src="/assets/foot-print.png" alt="" />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" xl="3">
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Row>
                  <div className="col-auto">
                    <CardTitle className="text-uppercase text-muted mb-0">
                      Water Saved
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">2,356</span>
                  </div>
                  <Col xs="3"></Col>
                  <Col xs="3">
                    <Image src="/assets/droplet.png" alt="" />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" xl="3">
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Row>
                  <div className="col-auto">
                    <CardTitle className="text-uppercase text-muted mb-0">
                      Clothes Donated
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">924</span>
                  </div>
                  <Col xs="1"></Col>
                  <Col xs="3">
                    <Image src="/assets/clothes.png" alt="" />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Stats;
