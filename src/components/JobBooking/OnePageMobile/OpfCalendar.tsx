"use client";

import React, { useEffect, useState, useCallback } from "react";
import DateSelection from "@/components/CustomDatePicker/Day/Index";
import { DatepickerCtx } from "@/components/CustomDatePicker/DatepickerContext";

type ViewState = "date" | "month" | "year";

type OpfCalendarProps = {
  value: Date | null;
  onChange: (date: Date) => void;
  minDate?: Date;
};

function useOpfDatepickerCtx(
  value: Date | null,
  onChange: (d: Date) => void,
  initialAnchor?: Date
) {
  const getAnchor = () => value ?? initialAnchor ?? new Date();

  const [monthYear, setMonthYear] = useState(() => {
    const anchor = getAnchor();
    return { month: anchor.getMonth(), year: anchor.getFullYear() };
  });
  const [view, setView] = useState<ViewState>("date");

  // Only sync visible month when the user selects/changes a date — not on every render.
  useEffect(() => {
    if (value) {
      setMonthYear({ month: value.getMonth(), year: value.getFullYear() });
    }
  }, [value?.getTime()]);

  const selectDate = useCallback(
    (d: number) => {
      onChange(new Date(monthYear.year, monthYear.month, d));
    },
    [monthYear.month, monthYear.year, onChange]
  );

  const isSelectedDate = useCallback(
    (d: number) =>
      Boolean(
        value &&
          d === value.getDate() &&
          monthYear.month === value.getMonth() &&
          monthYear.year === value.getFullYear()
      ),
    [value, monthYear.month, monthYear.year]
  );

  const anchor = getAnchor();

  return {
    date: anchor,
    visible: monthYear,
    view,
    nextMonth: () =>
      setMonthYear((state) =>
        state.month >= 11 ? { month: 0, year: state.year + 1 } : { month: state.month + 1, year: state.year }
      ),
    prevMonth: () =>
      setMonthYear((state) =>
        state.month <= 0 ? { month: 11, year: state.year - 1 } : { month: state.month - 1, year: state.year }
      ),
    nextYear: () => setMonthYear((state) => ({ ...state, year: state.year + 1 })),
    prevYear: () => setMonthYear((state) => ({ ...state, year: state.year - 1 })),
    nextDecade: () => setMonthYear((state) => ({ ...state, year: state.year + 12 })),
    prevDecade: () => setMonthYear((state) => ({ ...state, year: state.year - 12 })),
    selectMonth: (m: number) => {
      setMonthYear((state) => ({ ...state, month: m }));
      setView("date");
    },
    selectYear: (y: number) => {
      setMonthYear((state) => ({ ...state, year: y }));
      setView("month");
    },
    selectDate,
    viewMonths: () => setView("month"),
    viewYears: () => setView("year"),
    isVisible: true,
    showCalendar: () => {},
    toggleCalendar: () => {},
    isSelectedDate,
  };
}

const OpfCalendar: React.FC<OpfCalendarProps> = ({ value, onChange, minDate }) => {
  const ctx = useOpfDatepickerCtx(value, onChange, minDate);

  return (
    <DatepickerCtx.Provider value={ctx}>
      <div className="opf-calendar-inline">
        <DateSelection minDate={minDate} />
      </div>
    </DatepickerCtx.Provider>
  );
};

export default OpfCalendar;
