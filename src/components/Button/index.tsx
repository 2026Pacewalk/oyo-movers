import React, { FC } from "react";
import "./button.scss";
import { ButtonProps } from "./Button.types";
import { Button as RBButton } from "react-bootstrap";

const Button: FC<ButtonProps> = ({ children, className, onClick, disabled, style, variant, isLoading, ...rest }) => {
  return (
    <RBButton className={className} disabled={disabled} onClick={onClick} style={style} variant={variant} {...rest}>
      {isLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}{" "}
      {children}
    </RBButton>
  );
};

export default Button;
