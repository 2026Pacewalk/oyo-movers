import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CalButtonProps {
  chevron?: "right" | "left";
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: React.ReactNode; // ✅ Add children to the type definition
}

const CalButton: React.FC<CalButtonProps> = ({
  chevron,
  className = "",
  style,
  onClick,
  children,
}) => {
  let content = children;

  if (chevron === "left") {
    content = <FaChevronLeft size={20} className="stroke-current" />;
  } else if (chevron === "right") {
    content = <FaChevronRight size={20} className="stroke-current" />;
  }

  return (
    <button type="button" className={`cal-button ${className}`} style={style} onClick={onClick}>
      {content}
    </button>
  );
};

export default CalButton;
