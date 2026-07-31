"use client";

import React from "react";

type OpfTextFieldProps = {
  name: string;
  placeholder: string;
  icon: React.ReactNode;
  type?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
  touched?: boolean;
};

const OpfTextField: React.FC<OpfTextFieldProps> = ({
  name,
  placeholder,
  icon,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
}) => (
  <div className="opf-field">
    <div className={`opf-field__control ${value?.trim() ? "has-value" : ""}`}>
      <span className="opf-field__icon">{icon}</span>
      <input
        className="opf-field__input"
        id={name}
        name={name}
        type={type}
        placeholder=" "
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label className="opf-field__label" htmlFor={name}>
        {placeholder}
      </label>
    </div>
    {touched && error ? <span className="opf-field__error">{error}</span> : null}
  </div>
);

export default OpfTextField;
