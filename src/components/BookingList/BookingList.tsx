"use client";
import "./bookingList.scss";
import { Container, Tab, Tabs } from "react-bootstrap";
import JobBooking from "./JobBooking";

const BookingList = ({ jobs, searchParams }: any) => {

  return (
    <div className="bookingListMain">
      <Container>
        <div className="bookingListTabs">
          <Tabs
            id="controlled-tab-example"
            className="mt-4 mb-5 bookingListTabs"
          >
            <Tab eventKey="pending" title="Drafts">
              <JobBooking jobs={jobs?.draftJobs} filter={jobs?.draftJobs} />
            </Tab>
            <Tab eventKey="new" title="Confirmed Bookings">
              <JobBooking jobs={jobs?.otherJobs} filter={["new", 'accepted', 'reachedAtPickup', 'started', 'stop', 'finished', 'escalated']} />
            </Tab>
            <Tab eventKey="profile" title="Completed">
              <JobBooking jobs={jobs?.completeJobs} filter={["completed"]} searchParams={searchParams} />
            </Tab>
          </Tabs>
        </div>
      </Container>
    </div>
  );
};

export default BookingList;
