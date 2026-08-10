"use client";
import "./googleplace.scss";
import { googleApiKey } from "@/config";
import { usePlacesWidget } from "react-google-autocomplete";
import Input from "../Input";
import { useEffect, useRef } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

type AddressInputProps = {
  label: string;
  onSelectAddress: any;
  error?: string;
  isFloting?: boolean;
  value?: string;
  handelClear?: any;
  handleFocus?: any;
  handleBlur?: any;
  setIsOutOfServiceArea?: any;
  becomeMoverFlow?: boolean;
  areaZone?: any;
  placeholder?: string;
  hideIcon?: boolean;
  addressType?: "pickup" | "dropoff";
  iconVariant?: "arrow" | "marker";
};

/* Shared visual shell (icon + input + error) so both variants look identical. */
const AddressField = ({
  inputRef,
  props,
}: {
  inputRef: any;
  props: AddressInputProps;
}) => {
  const {
    label,
    error,
    isFloting,
    handleFocus,
    handleBlur,
    becomeMoverFlow,
    placeholder,
    hideIcon,
    addressType,
    iconVariant = "arrow",
  } = props;

  const resolvedType =
    addressType ?? (label.toLowerCase().includes("pickup") ? "pickup" : "dropoff");

  const renderIcon = () => {
    if (hideIcon) return null;
    if (iconVariant === "marker") {
      if (resolvedType === "pickup") {
        return <span className="address-marker address-marker--pickup" aria-hidden />;
      }
      return <FaMapMarkerAlt className="address-marker address-marker--dropoff" aria-hidden />;
    }
    const iconName =
      resolvedType === "pickup"
        ? "up-arrow-icon"
        : becomeMoverFlow
          ? "location"
          : "down-arrow-icon";
    return <img src={`/icon/${iconName}.svg`} alt="" className="pickupIcon" />;
  };

  return (
    <div
      className={`editablePickupField${iconVariant === "marker" ? " editablePickupField--marker" : ""}`}
    >
      <Input
        inputRef={inputRef as any}
        isFloating={isFloting || false}
        label={label}
        onFocus={() => handleFocus?.()}
        onBlur={(e: any) => handleBlur?.(e)}
        placeholder={placeholder ?? (becomeMoverFlow ? "Address" : " ")}
        autoComplete="new-password"
      />
      {renderIcon()}
      {error ? <span className="errorMessage">{error}</span> : null}
    </div>
  );
};

/* Google Places-powered variant (used when an API key is configured). */
const GoogleAddressInput = (props: AddressInputProps) => {
  const { value, onSelectAddress } = props;
  const { ref }: any = usePlacesWidget({
    apiKey: googleApiKey,
    inputAutocompleteValue: "new-password",
    onPlaceSelected: (place: any) => onSelectAddress(extractAddress(place)),
    options: {
      types: ["geocode"],
      componentRestrictions: { country: "au" },
      fields: ["address_components", "geometry.location", "place_id", "formatted_address"],
    },
  });

  const lastSyncedValue = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (!ref?.current) return;
    if (value === lastSyncedValue.current) return;
    lastSyncedValue.current = value;
    ref.current.value = value || "";
  }, [value, ref]);

  return <AddressField inputRef={ref} props={props} />;
};

/* Plain fallback (no autocomplete) — renders when no Google key is set so the
   page still works instead of crashing. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to
   enable address autocomplete. */
const PlainAddressInput = (props: AddressInputProps) => {
  const { value } = props;
  const ref = useRef<HTMLInputElement | null>(null);
  const lastSyncedValue = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (!ref?.current) return;
    if (value === lastSyncedValue.current) return;
    lastSyncedValue.current = value;
    ref.current.value = value || "";
  }, [value]);

  return <AddressField inputRef={ref} props={props} />;
};

const AddressInput = (props: AddressInputProps) => {
  return googleApiKey ? <GoogleAddressInput {...props} /> : <PlainAddressInput {...props} />;
};

export default AddressInput;

function extractAddress(place: any) {
  const { lat: letTemp, lng: latTemp } = place?.geometry?.location;
  const lat = letTemp() || "";
  const lng = latTemp() || "";
  const address = place.address_components;
  const addressData: any = {};
  for (let i = 0; i < address.length; i++) {
    const addressType = address[i].types[0];
    addressData[addressType] = address[i].long_name;
  }
  const tempAddress = { ...addressData, latitude: lat, longitude: lng };

  let formattedAddress = place.formatted_address;
  if (addressData.country) {
    const countryPattern = new RegExp(`,\\s*${addressData.country}\\s*$`);
    formattedAddress = formattedAddress.replace(countryPattern, "");
  }

  tempAddress.addressLine1 = formattedAddress;
  tempAddress.postalCode = addressData.postal_code || "15151";
  tempAddress.city = addressData.locality;
  tempAddress.state = addressData.administrative_area_level_1;

  return tempAddress;
}
