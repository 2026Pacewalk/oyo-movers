import BookingList from "@/components/BookingList/BookingList";
import EmptyState from "@/components/EmptyState";
import { getApi } from "@/lib/api";
import { getCustomerJobs } from "@/lib/serverAction/bookingAction";

const Booking = async ({ searchParams }: any) => {

  async function getDraftJobs() {

    const res = await getApi(`quotations`);
    const newRes = res?.quotations?.filter((item: any) => item.status === "pending");
    return newRes;
  }

  const [jobs, draftJobsData] = await Promise.all([
    getCustomerJobs(),
    getDraftJobs()
  ]);
  let completeJobs = []
  let draftJobs = []
  let otherJobs = []
  
  if (jobs?.length) {
    completeJobs = jobs?.filter((item: any) => item.status === "completed");
    otherJobs = jobs?.filter((item: any) => !["completed", "pending", "canceled"].includes(item.status));
  }
  console.log("draftJobsData", completeJobs[0]);
  if (draftJobsData?.length) {
    draftJobs = draftJobsData;
  }


  return <div>{!jobs?.length && !draftJobsData?.length ? <EmptyState /> : <BookingList jobs={{ completeJobs, draftJobs, otherJobs }} searchParams={searchParams} />}</div>;
};

export default Booking;
