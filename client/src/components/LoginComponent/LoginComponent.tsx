"use client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/Auth.store";
import { AppUtil } from "@/src/utils/App.util";
import { useState } from "react";
import { Alert, Button, Container, Form, Stack } from "react-bootstrap";
import { EndpointConst } from "@/src/constants/endpoints.constant";
import { useAuthUser } from "@/src/hooks/useAuthUser";

export const LoginComponent = () => {
  const router = useRouter();
  const {setAuthenticated,setUserData} = useAuthStore();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [showAlert, setShowAlert] = useState(false);
  const {mutate, data: loginData} = useAuthUser();
 
  const onEmailChange = (event: any) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordChange = (event: any) => {
    setPassword(event.currentTarget.value);
  };

  const onLogin = () => {
    if (email && new AppUtil().validateEmail(email) && password) { 
      mutate({
        email:email,
        password:Buffer.from(password).toString('base64')
      })
    } else {
      setErrorMessage("Invalid Email Address or password");
      setShowAlert(true);
    }
  }; 

  const onCloseAlert = () => {
    setShowAlert(false);
    setErrorMessage(undefined)
  }

  if(loginData && loginData.success && loginData.user_data){
    setAuthenticated(true);
    setUserData(loginData.user_data)
    router.push(EndpointConst.MARKETPLACE_PAGE);
  }

  return (
    <Container>
      {showAlert || (loginData && !loginData.success && loginData.errorMessage) && (
        <Alert key="danger" variant="danger" dismissible onClose={onCloseAlert}>
          {(loginData && !loginData.success && loginData.errorMessage) ? loginData.errorMessage : errorMessage}
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
