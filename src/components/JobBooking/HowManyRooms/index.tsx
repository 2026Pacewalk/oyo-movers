import React from "react";
import { getApi } from "@/lib/api";
import AppInitializer from "../JobInitializer";
import TypeOfSpace from "../TypeOfSpace";

const TypeOfSpaceService = async () => {

  const services = await getApi("/config/service-types/active");
  return (
    <AppInitializer services={services}>
      <TypeOfSpace />
    </AppInitializer>
  );
};

export default React.memo(TypeOfSpaceService);
