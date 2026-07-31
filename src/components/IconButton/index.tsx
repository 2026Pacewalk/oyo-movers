import React, { FC } from "react";
import { IconButtonProps } from "./IconButton.types";
import { Button } from "..";
import "./iconButton.scss";

const IconButton: FC<IconButtonProps> = ({
  title,
  icon,
  className = "",
  iconPosition = "right",
  onClick,
  disabled,
  isLoading,
  type = "button",
}) => {
  return (
    <Button
      className={`iconButton ${className}`}
      isLoading={isLoading}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      <>
        {iconPosition === "left" && <span className="icon">{icon}</span>}
        {title && <span className="text">{title}</span>}
        {iconPosition === "right" && <span className="icon">{icon}</span>}
      </>
    </Button>
  );
};

export default IconButton;
