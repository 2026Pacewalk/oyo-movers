import React, { useContext } from "react";
import DateSelection from "./Day/Index";
import MonthSelection from "./Month";
import YearSelection from "./Year";
import { DatepickerCtx } from "./DatepickerContext";

interface CalendarProps {
    style: React.CSSProperties;
    placement: string;
    minDate?: Date;
  }

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
    (props, ref) => {
      const { view } = useContext(DatepickerCtx);
  
      let selectionComponent = null;
      switch (view) {
        case "date":
          selectionComponent = <DateSelection minDate={props?.minDate} />;
          break;
        case "month":
          selectionComponent = <MonthSelection />;
          break;
        case "year":
          selectionComponent = <YearSelection />;
          break;
      }
  
      return (
        <div
          className="custom-calendar"
          ref={ref}
          data-placement={props.placement}
          style={props.style}
        >
          {selectionComponent}
        </div>
      );
    }
  );
  Calendar.displayName = "Calendar";
  export default Calendar;