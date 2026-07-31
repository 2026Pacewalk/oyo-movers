"use client";
import React, { useState } from "react";

const QuestionDropDownWrapper = ({ children, title }: any) => {
  const [showItems, setShowItems] = useState(false);

  return (
    <div
      className={`container ${showItems ? "activeTab" : ""}`}
      onClick={() => setShowItems(!showItems)}
    >
      <div className="question">{title}</div>

      {showItems ? children : null}
    </div>
  );
};

export default QuestionDropDownWrapper;
