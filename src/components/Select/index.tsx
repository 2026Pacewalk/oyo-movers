import React, { FC, useState } from "react";
import {  DropdownButton,  Form,  } from "react-bootstrap";
import "./select.scss";
interface option {
  label: string;
  value: string;
}
interface SelectProps {
  option: option[];
  label?: string;
  multiple?: boolean;
  id: string;
  name: string;
  value: string | Date | number;
  placeholder:string;
  error?: string;
  className?: string;

  onChange: (value: string) => void;
}

const Select: FC<SelectProps> = ({
  option,
  label,
  onChange,
  value,
  id,
  name,
  placeholder,
  error,
  multiple = false,
  className,
}: any) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  
  // Get the selected option label for display
  const getSelectedLabel = () => {
    if (!value) return placeholder || "Select...";
    const selectedOption = option?.find((opt: option) => opt.value === value);
    return selectedOption ? selectedOption.label : value;
  };

  const handleOptionSelect = (value: string) => {
    if (!multiple) {
      setSelectedOptions([value]);
    } else {
      if (selectedOptions.includes(value)) {
        setSelectedOptions(
          selectedOptions.filter((option) => option !== value)
        );
      } else {
        setSelectedOptions([...selectedOptions, value]);
      }
    }
  };
  return (
    <div className={`mainSelect ${className || ''}`}>
      {multiple ? (
        <DropdownButton
          title={
            selectedOptions.length === 0
              ? "Select..."
              : selectedOptions.join(", ")
          }
          variant="secondary"
        >
          {option.map((option: option) => (
            <div key={option.value}>
              <Form.Check
                type="checkbox"
                id={`checkbox-${option.value}`}
                label={option.label}
                checked={selectedOptions.includes(option.value)}
                onChange={() => handleOptionSelect(option.value)}
              />
            </div>
          ))}
        </DropdownButton>
      ) : (
        <>
          {label && <label className="form-label">{label}</label>}
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => {
              onChange(e.target.value);
            }}
            id={id}
            value={value}
            name={name}
            title={getSelectedLabel()} // Show full text on hover
          >
             {placeholder && <option hidden>{placeholder}</option>}
            {option?.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
          {error ? <span className="errorMessage">{error}</span> : null}
        </>
      )}
    </div>
  );
};

export default Select;
