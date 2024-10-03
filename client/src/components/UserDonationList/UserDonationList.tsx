"use client";
import { useRouter } from "next/navigation";
import { Button, Col, Container, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { EndpointConst } from '@/src/constants/endpoints.constant'
import './UserDonationList.css'
export const UserDonationList = () => {
  const router = useRouter();
  const data = [
    {
        inventory_id: "4234",
      category: "Donate",
      reason_for_category: "Gently Used",
      picked_up_date: "14/09/2024",
      organization_name: "foundation",
      organization_received_status: "Received",
    },
  ];
  const columns = [
    { dataField: "category", text: "Category", sort: true },
    { dataField: "reason_for_category", text: "Reason", sort: true },
    { dataField: "picked_up_date", text: "Picked up date", sort: true },
    { dataField: "organization_name", text: "Organization Name", sort: true },
    {
      dataField: "organization_received_status",
      text: "Organization Received Status",
      sort: true,
    },
    {
        dataField: "action",
        text: "Action",
        formatter: (cell:any, row:any, rowIndex:any) => showViewButton(cell, row, rowIndex),
      },
  ];
  const showViewButton = (_cell:any, row:any, _rowIndex:any) => {
    return (
      <Button>View</Button>
    );
  };
  const onDonationClick = () => {
    router.push(EndpointConst.DONATION_DETAILS_PAGE);
  };
  return (
    <Container fluid>
      <Row>
        <Col>
          <Button className="donationBtn my-3" variant="success" onClick={onDonationClick}>
            Donate Clothes
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <BootstrapTable keyField="id" data={data} columns={columns} />
        </Col>
      </Row>
    </Container>
  );
};

export default UserDonationList;
