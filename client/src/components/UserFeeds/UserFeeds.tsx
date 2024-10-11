import { Card, Col, Row, Image } from "react-bootstrap";

export const UserFeeds = () => {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={12} className="d-flex align-items-center">
            <Image
              src="/assets/green-avatar.png"
              style={{ width: "4rem" }}
              rounded
              roundedCircle
            />{" "}
            <div className="ms-3">
              <Card.Title className="fs-3">User</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                11 October 2024 15:49 AM
              </Card.Subtitle>
            </div>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col sm={4} md={4} lg={4} className="fs-5 fw-bold">
            Carbon Footprint
          </Col>
          <Col sm={4} md={4} lg={4} className="fs-5 fw-bold">
            Water Saved
          </Col>
          <Col sm={4} md={4} lg={4} className="fs-5 fw-bold">
            Clothes Donated
          </Col>
        </Row>
        <Row>
          <Col sm={4} md={4} lg={4}>
            1
          </Col>
          <Col sm={4} md={4} lg={4}>
            2
          </Col>
          <Col sm={4} md={4} lg={4}>
            3
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
export default UserFeeds;
