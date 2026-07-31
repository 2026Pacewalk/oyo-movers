import { Col, Container, Row } from "react-bootstrap";
import AccountTabs from "./AccountTabs";
import "./accountSetting.scss"

const AccountSettings = async () => {
  return (
    <div className="accountSetting">
      <Container className="mt-4">
        <Row>
          <h4>Account Settings</h4>
          <Col md={6} className="mt-4">
            <AccountTabs />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AccountSettings;
