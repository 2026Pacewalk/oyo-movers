"use client";
import { InputProps } from "./Input.types";
import React, { FC, useState } from "react";
import "./input.scss";
import { FloatingLabel, Form } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import Image from "../Image";

const Input: FC<InputProps> = ({
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
  return (
    <div className={`customInput ${className}`}>
      {isFloating ? (
        <FloatingLabel controlId={name} label={label} className={`editField ${type === "password" ? "has-password-icon" : ""}`}>
          <Form.Control
            name={name}
            type={type === "password" ? (showPassword ? "text" : "password") : type}
            ref={inputRef}
            as={as}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            maxLength={maxLength}
            autoComplete={"new-password"}
            {...rest}
          />
          {type === "password" && (
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <Image src="/eye.svg" alt="eye" /> : <Image src="/closeeye.svg" alt="closeeye" />}
            </span>
          )}
          {handelClear && value && type !== "password" && (
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
          />
          <span className="eye-icon" onClick={togglePasswordVisibility}>
            {showPassword ? <Image src="/eye.svg" alt="eye" /> : <Image src="/closeeye.svg" alt="closeeye" />}
          </span>
        </div>
      ) : (
        <input {...rest} type={type} id={id} ref={inputRef} name={name} placeholder={placeholder} disabled={disabled} maxLength={maxLength} />
      )}
      {(type === "radio" || type === "checkbox") && <label htmlFor={id}>{label}</label>}
      {maxLength && (
        <div className="character-counter">
          <span className={value && value.length > maxLength * 0.8 ? 'warning' : ''}>
            {value ? value.length : 0}/{maxLength}
          </span>
        </div>
      )}
      {error ? <span className="errorMessage">{error}</span> : null}
    </div>
  );
};

export default Input;
