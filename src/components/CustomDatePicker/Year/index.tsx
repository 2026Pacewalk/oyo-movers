import React, { useContext } from "react";

import { DatepickerCtx } from "../DatepickerContext";

import "./YearSelection.scss";
import CalButton from "../CalButton";

const YearSelection: React.FC = () => {
  const { selectYear, prevDecade, nextDecade, visible } =
    useContext(DatepickerCtx);

  const minYear = visible.year - 6;
  const maxYear = visible.year + 6;
  const years = Array.from(
    { length: maxYear - minYear },
    (_, i) => minYear + i
  );

  return (
    <div className="year-selection">
      <div className="year-header">
        <CalButton chevron="left" onClick={prevDecade} />
        <CalButton 
        className="decade-range"
        >{`${minYear} - ${
          maxYear - 1
        }`}</CalButton>
        <CalButton chevron="right" onClick={nextDecade} />
      </div>

      <div className="year-grid">
        {years.map((year) => (
          <CalButton key={year} onClick={() => selectYear(year)}>
            {year}
          </CalButton>
        ))}
      </div>
    </div>
  );
};
export default YearSelection;
