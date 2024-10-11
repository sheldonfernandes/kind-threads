"use client";

import { EndpointConst } from "@/src/constants/endpoints.constant";
import { useAuthStore } from "@/src/store/Auth.store";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "react-bootstrap";

export default function AppHeader({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const {setAuthenticated,isAuthenticated} = useAuthStore();

  const onHomeClick = () => {
    router.push(EndpointConst.DASHBOARD_PAGE);
  }; 
  const onMarketplaceClick = () => {
    router.push(EndpointConst.MARKETPLACE_PAGE);
  };
  const onLogoutClick = () => {
    setAuthenticated(false)
    router.push(EndpointConst.DASHBOARD_PAGE);
  }
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
                  <Button
                    onClick={onHomeClick}
                    className="btn-success nav-link text-white"
                  >
                    Home
                  </Button>
                </li>
                <li>
                  <Button
                    onClick={onMarketplaceClick}
                    className="btn-success nav-link text-white"
                  >
                    Marketplace
                  </Button>
                </li>
               {isAuthenticated && <li>
                  <Button
                    onClick={onLogoutClick}
                    className="btn-success nav-link text-white"
                  >
                    Logout
                  </Button>
                </li>}
               
              </ul>
            </div>
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
