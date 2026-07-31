import "./jobBooking.scss";
import MoverServices from "./MoverServices";
import Location from "./Location";
import TypeOfSpaceService from "./HowManyRooms";
import SelectVehicle from "./SelectVehicle";
import MoreDetails from "./MoreDetails";
import HowFurnished from "./HowFurnished";
import SignupForm from "@/app/signup/Form";
import HelperRequiredTime from "./HelperRequiredTime";
import HowManyHelper from "./HowManyHelper";
import TimeslotsWapper from "./Timeslots";
import PaymentWapper from "./Payment";

const JobBooking = () => {
  return (
    <div className="jobBookingContainer ">
      <MoverServices />
      <Location />
      <TypeOfSpaceService />
      <HowFurnished />
      <HowManyHelper />
      <HelperRequiredTime />
      <TimeslotsWapper />
      <MoreDetails />
      <SelectVehicle />
      <SignupForm isBookingFlow />
      <PaymentWapper />
    </div>
  );
};

export default JobBooking;
