import React from "react";
import "./notification.scss";
import { Container } from "react-bootstrap";

const Notification = () => {
  return (
    <Container>
      <div className="notificationWrapper">
        <h2>Notification</h2>
        <div>
          <div className="notificationWrapper__inner ">
            <div className="notificationWrapper__inner__card">
              <div className="d-flex align-items-center justify-content-between notificationCard">
                <h4>Lorum Ipsum dummy</h4>
                <h5>24 Nov , 2024 at 9.30 pm</h5>
              </div>
              <h6 className="my-2">Notification for new User</h6>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard dummy
                text.
              </p>
            </div>
          </div>
          <div className="notificationWrapper__inner ">
            <div className="notificationWrapper__inner__card">
              <div className="d-flex align-items-center justify-content-between notificationCard">
                <h4>Lorum Ipsum dummy</h4>
                <h5>24 Nov , 2024 at 9.30 pm</h5>
              </div>
              <h6 className="my-2">Notification for new User</h6>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard dummy
                text.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Notification;
