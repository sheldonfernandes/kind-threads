"use client";
import { Col, Container, Row } from "react-bootstrap";
import { EyeFill } from "react-bootstrap-icons";
import BootstrapTable from "react-bootstrap-table-next";

export const Organizations = () => {
  const data = [
    {
      id: "1",
      organization_name: "foundation",
      no_of_clothes: "2",
      picked_up_date: "14/09/2024",
    },
  ];
  const columns = [
    { dataField: "organization_name", text: "Organization Name", sort: true },
    { dataField: "no_of_clothes", text: "Number of clothes", sort: true },
    { dataField: "picked_up_date", text: "Picked up date", sort: true },
    {
      dataField: "action",
      text: "Action",
      sort: false,
      formatter: (cell, row) => <EyeFill />,
      align: "center",
    },
  ];

  return (
    <Container fluid className="my-2">
      <Row>
        <Col>
          <BootstrapTable
            keyField="id"
            data={data}
            columns={columns}
            bootstrap4
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Organizations;
