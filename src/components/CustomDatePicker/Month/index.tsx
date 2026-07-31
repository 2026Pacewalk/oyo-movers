import React, {  useContext } from "react";

import { DatepickerCtx,  } from "../DatepickerContext";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
import "./MonthSelection.scss";
import CalButton from "../CalButton";
const MonthSelection: React.FC = () => {
    const { viewYears, selectMonth, nextYear, prevYear, visible } =
      useContext(DatepickerCtx);
  
    return (
      <div className="month-selection">
        <div className="month-header">
          <CalButton chevron="left" onClick={prevYear} />
          <CalButton className="year-button" onClick={viewYears}>
            {visible.year}
          </CalButton>
          <CalButton chevron="right" onClick={nextYear} />
        </div>
  
        <div className="month-grid">
          {monthNames.map((month, index) => (
            <CalButton key={month} onClick={() => selectMonth(index)}>
              {month.substring(0, 3)}
            </CalButton>
          ))}
        </div>
      </div>
    );
  };
  export default MonthSelection;