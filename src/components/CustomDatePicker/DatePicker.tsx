import React, { useRef } from "react";
import { Manager, Reference, Popper } from "react-popper";
import { DatepickerCtx, useDatepickerCtx } from "./DatepickerContext";
import { CiCalendar } from "react-icons/ci";
import "./datePicker.scss";
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
import Calendar from "./Calendar";

export const inputStyle = {
  paddingTop: "0.375rem",
  paddingBottom: "0.375rem",
};

function formattedDate(date: Date): string {
  if(!date) return '';
  return `${date.getDate()} ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()}`;
}

interface DatePickerProps {
  date: any;
  onChange: (date: any) => void;
  placeholder?: string;
  minDate?: Date;
}

export const DatePicker: React.FC<DatePickerProps> = (props) => (
  <RawDatePicker date={props.date} onChange={props.onChange} placeholder={props.placeholder} 
  minDate={props.minDate}
  ></RawDatePicker>
);

export const RawDatePicker: React.FC<{
  date: Date;
  onChange: (date: Date) => void;
  placeholder?: string;
  minDate?: Date;
}> = ({ date, onChange,placeholder,minDate }) => {
  const popupNode = useRef<HTMLElement>();
  const ctxValue = useDatepickerCtx(date, onChange, popupNode);

  return (
    <DatepickerCtx.Provider value={ctxValue}>
      <Manager>
        <Reference>
          {({ ref }) => (
            <div className="datePickerOverview" ref={ref}>
              <input
                className=""
                type="text"
                style={inputStyle}
                onFocus={(e) => ctxValue.showCalendar()}
                value={date ? formattedDate(date): ''}
                placeholder={placeholder || "Select Date"}
                readOnly
              />
              <button
                type="button"
                className=""
                onClick={(e) => ctxValue.toggleCalendar()}
              >
                <CiCalendar size="20" color="#666" />
              </button>
            </div>
          )}
        </Reference>
        <Popper
          placement="bottom-start"
          innerRef={(node) => (popupNode.current = node)}
        >
          {({ ref, style, placement,  arrowProps }) =>
            ctxValue.isVisible ? (
              <Calendar
                placement={placement}
                style={style}
                ref={ref as React.Ref<HTMLDivElement>}
                minDate={minDate}
              />
            ) : null
          }
        </Popper>
      </Manager>
    </DatepickerCtx.Provider>
  );
};




