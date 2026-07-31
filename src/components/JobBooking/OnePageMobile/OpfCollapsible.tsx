"use client";

import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

type OpfCollapsibleProps = {
  icon: React.ReactNode;
  label: React.ReactNode;
  isPlaceholder?: boolean;
  open: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
  error?: string;
};

const OpfCollapsible: React.FC<OpfCollapsibleProps> = ({
  icon,
  label,
  isPlaceholder,
  open,
  onToggle,
  children,
  error,
}) => (
  <div className="opf-field opf-field--collapsible">
    <div className="opf-collapsible">
      <button
        type="button"
        className={`opf-collapsible__head ${isPlaceholder ? "placeholder" : ""}`}
        onClick={onToggle}
      >
        <span className="opf-field__icon">{icon}</span>
        <span className="opf-collapsible__label">{label}</span>
        {open ? <FaChevronUp className="opf-chevron" /> : <FaChevronDown className="opf-chevron" />}
      </button>
      {open && children && <div className="opf-collapsible__body">{children}</div>}
    </div>
    {error ? <span className="opf-field__error">{error}</span> : null}
  </div>
);

export default OpfCollapsible;
