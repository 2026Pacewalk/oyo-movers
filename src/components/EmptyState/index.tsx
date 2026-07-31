import React from "react";
import "./emptyState.scss";
import Image from "../Image";

const EmptyState = () => {
  return (
    <div className="empatyStateWrapper">
      <Image src="/images/empty-data.svg" alt="No data " className="emptyStateImage" />
      <h4 className="my-3">No Data Found</h4>
      <p>There is not data please update data First</p>
    </div>
  );
};

export default EmptyState;
