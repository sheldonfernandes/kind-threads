"use client";

import { EndpointConst } from "@/src/constants/endpoints.constant";
import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

export default function Dashboard({ children }: React.PropsWithChildren) {
  return (
    <>
      {/* <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Kind Threads</Navbar.Brand>
          <Nav classNameName="me-auto">
            <Nav.Link href="/donation">Donation</Nav.Link>
          </Nav>
        </Container>
      </Navbar> */}
      <header>
        <div className="px-3 py-2 bg-success bg-gradient text-white">
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <a
                href={EndpointConst.DASHBOARD_PAGE}
                className="fw-bold d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
              >
                Kind Threads
              </a>

              <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                <li>
                  <a
                    href={EndpointConst.DASHBOARD_PAGE}
                    className="nav-link text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href={EndpointConst.DONATION_PAGE}
                    className="nav-link text-white"
                  >
                    Donation
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link text-white">
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
