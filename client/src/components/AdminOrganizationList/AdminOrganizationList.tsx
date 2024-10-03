"use client";

import { Button, Card, Container, Row } from "react-bootstrap";
export const AdminOrganizationList = () => {

  const adminOrgList = [
    {
      organization_id: "4234",
      organization_name: "foundation",
      number_of_clothes: "10",
      picked_up_date: "14/09/2024",
    },
    {
      organization_id: "4234",
      organization_name: "Recycle Now",
      number_of_clothes: "2",
      picked_up_date: "14/09/2024",
    },
    {
      organization_id: "4234",
      organization_name: "Upcycle creative",
      number_of_clothes: "9",
      picked_up_date: "14/09/2024",
    },
  ];
  return (
    <Container fluid>
      <h1><center>List of Organization(s)</center></h1>
      <Row>
        {adminOrgList.map((item) => (
          <Card className="my-3 mx-3" style={{ width: "18rem" }}>           
            <Card.Body>
              <Card.Title>{item.organization_name}</Card.Title>
              <Card.Text>
                Number of item(s) : {item.number_of_clothes}<br/>
                Pick up date: {item.picked_up_date}
              </Card.Text>
              <Button variant="primary">View</Button>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
};

export default AdminOrganizationList;
