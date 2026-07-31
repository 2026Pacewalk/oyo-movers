import { getApi } from "@/lib/api";
import AppInitializer from "../JobInitializer";
import DateForPikup from "../DateForPikup";

const Timeslots = async () => {
  const timeslots = await getApi("config/time-slots/active");
  console.log("111111",timeslots);
  return (
    <AppInitializer timeslots={timeslots}>
      <DateForPikup timeslots={timeslots} />
    </AppInitializer>
  );
};

export default Timeslots;
