import MoverStepTab from "@/components/BecomeMover/MoverStepTab";
import WorkDetails from "@/components/BecomeMover/WorkDetails";
import React from "react";

const BecomeMover = ({ searchParams }: any) => {
  return (
    <div>
      {searchParams.name ? (
        <MoverStepTab
          token={searchParams.token}
          name={searchParams.name}
          helper={true}
        />
      ) : (
        <WorkDetails helper={true} />
      )}
    </div>
  );
};

export default BecomeMover;
