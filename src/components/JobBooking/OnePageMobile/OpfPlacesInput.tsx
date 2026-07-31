"use client";

import AddressInput from "@/components/GooglePlaceAutoCompelete";
import { useOpfPacDropdownPosition } from "./useOpfPacDropdownPosition";

type OpfPlacesInputProps = {
  placeholder: string;
  markerClass?: "pickup" | "stop" | "dropoff";
  value: string;
  onSelect: (address: any) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
};

const OpfPlacesInput = ({
  placeholder,
  markerClass: _markerClass,
  value,
  onSelect,
  onBlur,
  error,
}: OpfPlacesInputProps) => {
  const containerRef = useOpfPacDropdownPosition();

  return (
    <div ref={containerRef} className="opf-places-widget">
      <AddressInput
        label={placeholder}
        placeholder=" "
        onSelectAddress={onSelect}
        value={value}
        handleBlur={onBlur}
        isFloting={true}
        hideIcon
        error={error}
      />
    </div>
  );
};

export default OpfPlacesInput;
