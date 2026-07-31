import React from "react";
import { getApi } from "@/lib/api";
import AppInitializer from "../JobInitializer";
import ServiceCard from "./ServiceCard";

const OyoServices = async () => {
  const services = await getApi("/config/service-types/active");
  return (
    <AppInitializer services={services}>
      {Array.isArray(services) && services?.map((service: any) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </AppInitializer>
  );
};

export default React.memo(OyoServices);
