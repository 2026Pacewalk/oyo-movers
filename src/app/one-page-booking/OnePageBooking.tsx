import { getApi } from "@/lib/api";
import OnePageMobileBooking from "@/components/JobBooking/OnePageMobile";

export default async function OnePageBooking() {
  const [timeslots, availableRequirements, services] = await Promise.all([
    getApi("config/time-slots/active").catch(() => null),
    getApi("config/team-pricing/active").catch(() => []),
    getApi("/config/service-types/active").catch(() => []),
  ]);

  return (
    <OnePageMobileBooking
      timeslots={timeslots}
      availableRequirements={availableRequirements}
      services={services}
    />
  );
}
