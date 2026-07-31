import SignupForm from "./Form";
import React from "react";
import "./signup.scss";
import { Col, Container, Row } from "react-bootstrap";

const SignUp = () => {
  return (
    <Container>
      <Row>
        <Col lg={5} className="p-0 ">
          <div className="signupContainer">
              <SignupForm />
          </div>
        </Col>
        <Col lg={7} md={12} className="p-0"></Col>
      </Row>
    </Container>
  );
};

export default SignUp;
