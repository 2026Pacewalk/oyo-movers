"use client";
import React, { useMemo, useState, useRef, useEffect } from "react";
import "./vehicleSelect.scss";

type Option = { label: string; value: string };

interface VehicleSelectProps {
  label?: string;
  id: string;
  name: string;
  value: string;
  option: Option[];
  placeholder?: string;
  error?: string;
  onChange: (value: string) => void;
}

const VehicleSelect: React.FC<VehicleSelectProps> = ({
  label,
  id,
  name,
  value,
  option,
  placeholder,
  error,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedOption = useMemo(() => option.find(o => o.value === value), [option, value]);

  const formatParts = (text: string) => {
    const str = String(text);
    const name = str.split("(")[0]?.trim() || str.trim();
    const parenMatch = str.match(/\([^)]*\)/);
    const paren = parenMatch ? parenMatch[0] : "";
    const minimumMatch = str.match(/Minimum[^.]*\.?/i);
    const minimum = minimumMatch ? minimumMatch[0].trim() : "";
    return { p1: name, p2: paren, p3: minimum };
  };

  const title = useMemo(() => {
    if (!selectedOption) return placeholder || "Choose Vehicle";
    const { p1, p2, p3 } = formatParts(selectedOption.label);
    return (
      <span>
        <span style={{ fontWeight: 600 }}>{p1}</span>
        {p2 && <span style={{ marginLeft: 6 }}>{p2}</span>}
        {p3 && <span style={{ marginLeft: 6, color: "#888" }}>{p3}</span>}
      </span>
    );
  }, [selectedOption, placeholder]);

  return (
    <div ref={wrapperRef} className="vehicle-select">
      {label && <label className="form-label" htmlFor={id}>{label}</label>}
      <button
        type="button"
        id={id}
        name={name}
        className="vs-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{title}</span>
        <i className="vs-caret" aria-hidden />
      </button>
      {open && (
        <div className="vs-menu" role="listbox">
          {option.map((opt) => {
            const { p1, p2, p3 } = formatParts(opt.label);
            const active = opt.value === value;
            return (
              <button
                type="button"
                key={opt.value}
                className={`vs-item${active ? " active" : ""}`}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                <span style={{ fontWeight: 600 }}>{p1}</span>
                {p2 && <span style={{ marginLeft: 6 }}>{p2}</span>}
                {p3 && <span style={{ marginLeft: 6, color: "#888" }}>{p3}</span>}
              </button>
            );
          })}
        </div>
      )}
      {error ? <span className="errorMessage">{error}</span> : null}
    </div>
  );
};

export default VehicleSelect;


