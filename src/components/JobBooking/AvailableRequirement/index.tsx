import { getApi } from "@/lib/api";
import AppInitializer from "../JobInitializer";
import RequirementCard from "./RequirementCard";

const AvailableRequirements = async () => {
  const requirements = await getApi("config/team-pricing/active");
  return (
    <AppInitializer availableRequirements={requirements}>
      {Array.isArray(requirements) && requirements.map((requirement: any) => (
        <RequirementCard key={requirement._id} requirement={requirement} />
      ))}

    </AppInitializer>
  );
};

export default AvailableRequirements;
