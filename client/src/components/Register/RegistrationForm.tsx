"use client";

import React from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";

export default function RegistrationForm() {
  return (
    <section className="p-3 p-md-4 p-xl-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={9} lg={7} xl={6} xxl={5}>
            <Card border="light">
              <Card.Body className="p-3 p-md-4 p-xl-5">
                <Row>
                  <Col xs={12}>
                    <div className="mb-5">
                      <h2 className="h4 text-center">Registration</h2>
                      <h3 className="fs-6 fw-normal text-secondary text-center m-0">
                        Enter your details to register
                      </h3>
                    </div>
                  </Col>
                </Row>
                <Form>
                  <Row className="gy-3 overflow-hidden">
                    <Col xs={12}>
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          id="firstName"
                          placeholder="First Name"
                          required
                        />
                        <label className="form-label">First Name</label>
                      </div>
                    </Col>
                    <Col xs={12}>
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          name="lastName"
                          id="lastName"
                          placeholder="First Name"
                          required
                        />
                        <label className="form-label">Last Name</label>
                      </div>
                    </Col>
                    <Col xs={12}>
                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="name@example.com"
                          required
                        />
                        <label className="form-label">Email</label>
                      </div>
                    </Col>
                    <Col xs={12}>
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          id="password"
                          value=""
                          placeholder="Password"
                          required
                        />
                        <label className="form-label">Password</label>
                      </div>
                    </Col>
                    <Col xs={12}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          name="iAgree"
                          id="iAgree"
                          required
                        />
                        <label className="form-check-label text-secondary">
                          I agree to the{" "}
                          <a
                            href="#!"
                            className="link-primary text-decoration-none"
                          >
                            terms and conditions
                          </a>
                        </label>
                      </div>
                    </Col>
                    <Col xs={12}>
                      <div className="d-grid">
                        <button
                          className="btn bsb-btn-xl btn-primary"
                          type="submit"
                        >
                          Sign up
                        </button>
                      </div>
                    </Col>
                  </Row>
                </Form>
                <div className="row">
                  <div className="col-12">
                    <div className="mt-2 mb-4 border-secondary-subtle"></div>
                    <p className="m-0 text-secondary text-center">
                      Already have an account?{" "}
                      <a
                        href="#!"
                        className="link-primary text-decoration-none"
                      >
                        Sign in
                      </a>
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
