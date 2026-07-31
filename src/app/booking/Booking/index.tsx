import { Col, Row } from "react-bootstrap";
import { JobBooking } from "@/components";
import JobDetails from "@/components/JobBooking/JobDetails";
import "./BookingStyle.scss";

export default function Booking() {
  return (
    <Row>
      <Col md={12} xxl={6} xl={6} lg={6}>
        <div className="rightContainer">
          <JobBooking />
        </div>
      </Col>
      <Col
        md={12}
        xxl={6}
        xl={6}
        lg={6}
        className="leftContainer"
        id="bookingDetailsRightPannel"
      >
        <JobDetails />
      </Col>
    </Row>
  );
}
