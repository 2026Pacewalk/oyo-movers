// 'use client'

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// const Price = () => {
//   const router = useRouter();

//   useEffect(() => {
//     // Redirect to booking page instead of showing pricing page
//     router.replace("/booking");
//   }, [router]);

//   return null;
// };

// export default Price;

import { getApi } from "@/lib/api";
import AppInitializer from "@/components/JobBooking/JobInitializer";
import WebAppWrapper from "@/components/WebAppWrapper";
import PricesContent from "./PricesContent";
import "./prices.scss";

const Price = async () => {
  const vehicalData = await getApi("config/team-pricing/active");
  const vehicleList = Array.isArray(vehicalData) ? vehicalData : [];

  return (
    <WebAppWrapper>
      <AppInitializer availableRequirements={vehicleList}>
        <PricesContent vehicalData={vehicleList} />
      </AppInitializer>
    </WebAppWrapper>
  );
};

export default Price;

