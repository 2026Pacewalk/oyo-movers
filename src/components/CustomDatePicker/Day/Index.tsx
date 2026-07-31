import React, { useContext } from "react";

import { DatepickerCtx } from "../DatepickerContext";
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";
const daysOfWeekNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
import "./DateSelection.scss";


function beginningDayOfWeek(m: number, y: number): number {
    return new Date(y, m, 1).getDay() - 1;
  }
  function daysInMonth(month: number, year: number) {
    switch (month) {
      case 0:
      case 2:
      case 4:
      case 6:
      case 7:
      case 9:
      case 11:
        return 31;
      case 1:
        return isLeapYear(year) ? 29 : 28;
      default:
        return 30;
    }
  }
  function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }
  // const minDate = moment().add(2, "days").toDate()
const DateSelection = ({minDate }:any) => {
    const {
      nextMonth,
      prevMonth,
      viewMonths,
      viewYears,
      selectDate,
      visible: { month, year },
      isSelectedDate,
    } = useContext(DatepickerCtx);
  
    const dates = [];
  
    for (let i = 0; i < beginningDayOfWeek(month, year); i++) {
      dates.push(<div key={`emptybefore${i}`} className="empty-cell"></div>);
    }
  
    for (let i = 1; i <= daysInMonth(month, year); i++) {
      const currentDate = new Date(year, month, i);
        const isDisabled = minDate && currentDate < minDate; // ✅ Disable dates before minDate
        
      dates.push(
        <button
          type="button"
          key={`day${i}`}
          className={`date-cell ${isSelectedDate(i) ? "selected-date" : ""} ${isDisabled ? "disabled" : ""}`}
          disabled={isDisabled}
          onClick={() => !isDisabled && selectDate(i)}
        >
          {i}
        </button>
      );
    }
  //   const dates = [];

  // for (let i = 0; i < beginningDayOfWeek(month, year); i++) {
  //   dates.push(<div key={`emptybefore${i}`} />);
  // }

  // for (let i = 1; i <= daysInMonth(month, year); i++) {
  //   const currentDate = new Date(year, month, i);
  //   const isDisabled = minDate && currentDate < minDate; // ✅ Disable dates before minDate

  //   dates.push(
  //     // <button
  //     //   key={`day${i}`}
  //     //   className={`date-button ${isSelectedDate(i) ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}
  //     //   onClick={() => !isDisabled && selectDate(i)} // Prevent selection of disabled dates
  //     //   disabled={isDisabled} // Disable button
  //     // >
  //     //   {i}
  //     // </button>

  //   <button
  //     key={`day${i}`}
  //     className={`date-cell ${isSelectedDate(i) ? "selected-date" : ""} ${isDisabled ? "disabled" : ""}`}
  //     onClick={() => !isDisabled && selectDate(i)}
  //   >
  //     {i}
  //   </button>
  //   );
  // }
  
    return (
      <div className="calendarContainer">
        <div className="monthlyTab">

        <button type="button" className="nav-button" onClick={prevMonth}>
          <FaChevronLeft size={18} />
        </button>
  
        <button type="button" className="month-button" onClick={viewMonths}>
          {monthNames[month]}
        </button>
  
        <button type="button" className="year-button" onClick={viewYears}>
          {year}
        </button>
  
        <button type="button" className="nav-button" onClick={nextMonth}>
          <FaChevronRight size={18} />
        </button>
        </div>
        
        <div className="weeklyTab">
        {daysOfWeekNames.map((day) => (
          <div key={day} className="weekday">
            {day[0]}
          </div>
        ))}
        </div>
    
        <div className="datesTab">
        {dates}
        </div>
      </div>
    );
  };
  
  export default DateSelection;