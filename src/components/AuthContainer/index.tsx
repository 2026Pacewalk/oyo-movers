import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const AuthContainer = ({ children }: any) => {
  return (
    <Container fluid>
      <Row>
        <Col lg={7} className="p-0 d-none d-lg-block">
          <div className="leftSide"></div>
        </Col>
        <Col lg={5} md={12} className="p-0">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default AuthContainer;
