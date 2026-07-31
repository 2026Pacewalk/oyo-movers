import React, { FC } from "react";

interface DatePickerProps {
  label: string;
  id?: string;
  name?: string;
  value: string | undefined;
  isRequired?: boolean;
  touched?: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const DatePicker: FC<DatePickerProps> = ({
  label,
  id,
  name,
  value,
  isRequired,
  touched,
  error,
  onChange,
  onBlur,
}) => {
  return (
    <div className="oyoInput mb-3">
      <label htmlFor={id} className="form-label">
        {label} {isRequired && <span style={{ color: "red" }}>*</span>}
      </label>
      <input
        type="date"
        className="form-control"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        min={new Date().toISOString().split("T")[0]} //
      />
      {touched && error && <span className="errorMessage" >{error}</span>}
    </div>
  );
};

export default DatePicker;
