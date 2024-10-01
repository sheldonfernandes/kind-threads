"use client";
import { AppUtil } from "@/src/utils/App.util";
import { useState } from "react";
import { Alert, Button, Container, Form, Stack } from "react-bootstrap";

export const LoginComponent = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [showAlert, setShowAlert] = useState(false);

  const onEmailChange = (event: any) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordChange = (event: any) => {
    setPassword(event.currentTarget.value);
  };

  const onLogin = () => {
    if (email && new AppUtil().validateEmail(email)) {
    } else {
      setErrorMessage("Invalid Email Address");
      setShowAlert(true);
    }
  };

  const onCloseAlert = () => setShowAlert(false);

  return (
    <Container>
      {showAlert && (
        <Alert key="danger" variant="danger" dismissible onClose={onCloseAlert}>
          {errorMessage}
        </Alert>
      )}
      <Stack gap={2} className="col-md-5 mx-auto">
        <Form className="my-10 mx-2">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-bold">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={onEmailChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="fw-bold">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={onPasswordChange}
            />
          </Form.Group>
          <Button onClick={onLogin} variant="primary">
            Login
          </Button>
        </Form>
      </Stack>
    </Container>
  );
};

export default LoginComponent;
