import ReBook from "@/components/ReBook";
import { getApi } from "@/lib/api";
import { getQuotationById } from "@/lib/serverAction/bookingAction";
import { redirect } from "next/navigation";
import { Container } from "react-bootstrap";

const page = async ({ searchParams }: any) => {
  if (!searchParams.id) {
    // Perform a server-side redirect if searchParams.id is missing
    return redirect('/');
  }
  const data = await getQuotationById(searchParams.id);
  const timeslots = await getApi("config/time-slots/active");
  const paymentCards = await getApi("me/cards");

  return (
    <Container className="py-3 reBookContainer">
      <ReBook reBookJob={data} timeslots={timeslots} paymentCards={paymentCards} />
    </Container>
  );
};

export default page;
