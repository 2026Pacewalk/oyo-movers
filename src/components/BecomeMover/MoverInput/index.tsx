"use client";
import { MoverInputProps } from "./MoverInput.types";
import React, { FC, useState } from "react";
import "./moverInput.scss";
import { FloatingLabel, Form } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import Image from "../../Image";

const MoverInput: FC<MoverInputProps> = ({
  label,
  id,
  name,
  placeholder,
  type,
  disabled,
  error,
  className,
  inputRef,
  touched,
  isFloating,
  as,
  handelClear,
  value,
  pattern,
  maxLength,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // Normalize value for controlled inputs
  const displayValue: any = value === undefined || value === null ? "" : value;
  return (
    <div className="moverInputWrapper">

   
    <div className={`moverCustomInput ${className}`}>
      {isFloating ? (
        <FloatingLabel controlId={name} label={label} className="editField">
          <Form.Control
            name={name}
            type={type || "text"}
            ref={inputRef}
            as={as}
            placeholder={placeholder}
            disabled={disabled}
            value={displayValue}
            maxLength={maxLength}
            autoComplete={"new-password"}
            {...rest}
          />
          {handelClear && value && (
            <span onClick={handelClear}>
              <FaEdit />
            </span>
          )}
        </FloatingLabel>
      ) : type === "password" ? (
        <div className="passwordWrapper">
          <input
            {...rest}
            type={showPassword ? "text" : "password"}
            id={id}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            autoComplete={"new-password"}
            value={displayValue}
          />
          <span className="eye-icon" onClick={togglePasswordVisibility}>
            {showPassword ? <Image src="/eye.svg" alt="eye" /> : <Image src="/closeeye.svg" alt="closeeye" />}
          </span>
        </div>
      ) : (
        <input {...rest} type={type || "text"} id={id} ref={inputRef} name={name} placeholder={placeholder} disabled={disabled} maxLength={maxLength} value={displayValue} />
      )}
      {(type === "radio" || type === "checkbox") && <label htmlFor={id}>{label}</label>}
      {maxLength && (
        <div className="character-counter">
          <span className={value && value.length > maxLength * 0.8 ? 'warning' : ''}>
            {value ? value.length : 0}/{maxLength}
          </span>
        </div>
      )}
     
    </div>
    {error ? <span className="errorMessage">{error}</span> : null}
    </div>
  );
};

export default MoverInput;
