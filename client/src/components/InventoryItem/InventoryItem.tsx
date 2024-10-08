"use client";

import { Button, Card, Col, Container, Row } from "react-bootstrap";
type IProps = {
  img?: string;
  title?: string;
  description?: string;
  btn?: {
    text: string;
    onClick: () => void;
  };
};
export const InventoryItem = (props: IProps) => {
  const { img, title, description, btn } = props;

  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={6} md={4} lg={4}>
          <Card className="my-3 mx-3">
            {img && <Card.Img variant="top" src={img} />}
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>{description}</Card.Text>
              {btn && <Button>{btn.text}</Button>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default InventoryItem;
