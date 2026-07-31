"use client";
import "./googleplace.scss";
import { googleApiKey } from "@/config";
import { usePlacesWidget } from "react-google-autocomplete";
import Input from "../Input";
import { useEffect, useRef } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const AddressInput = ({
  label,
  onSelectAddress,
  error,
  isFloting,
  value,
  handleFocus,
  handleBlur,
  becomeMoverFlow,
  placeholder,
  hideIcon,
  addressType,
  iconVariant = "arrow",
}: {
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
}) => {
  const { ref }: any = usePlacesWidget({
    apiKey: googleApiKey,
    inputAutocompleteValue: "new-password",
    onPlaceSelected: (place: any) => handelOnSelect(extractAddress(place)),
    options: {
      types: ["geocode"],
      componentRestrictions: { country: "au" },
      fields: ["address_components", "geometry.location", "place_id", "formatted_address"],
    },
  });
  const handelOnSelect = async (place: any) => {
    onSelectAddress(place);
  };
  const lastSyncedValue = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!ref?.current) return;
    if (value === lastSyncedValue.current) return;
    lastSyncedValue.current = value;
    ref.current.value = value || "";
  }, [value, ref]);
  const onFocus = (e: any) => {
    handleFocus?.();
  };
  const onBlur = (e: any) => {
    handleBlur?.(e);
  };

  const resolvedType =
    addressType ?? (label.toLowerCase().includes("pickup") ? "pickup" : "dropoff");

  const renderIcon = () => {
    if (hideIcon) return null;

    if (iconVariant === "marker") {
      if (resolvedType === "pickup") {
        return (
          <span
            className="address-marker address-marker--pickup"
            aria-hidden
          />
        );
      }
      return (
        <FaMapMarkerAlt
          className="address-marker address-marker--dropoff"
          aria-hidden
        />
      );
    }

    const iconName =
      resolvedType === "pickup"
        ? "up-arrow-icon"
        : becomeMoverFlow
          ? "location"
          : "down-arrow-icon";

    return (
      <img
        src={`/icon/${iconName}.svg`}
        alt=""
        className="pickupIcon"
      />
    );
  };

  return (
    <div
      className={`editablePickupField${iconVariant === "marker" ? " editablePickupField--marker" : ""}`}
    >
      <Input
        inputRef={ref as any}
        isFloating={isFloting || false}
        label={label}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder ?? (becomeMoverFlow ? "Address" : " ")}
        autoComplete="new-password"
      />
      {renderIcon()}
      {error ? <span className="errorMessage">{error}</span> : null}
    </div>
  );
};

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

  // Remove country name from the end of the address
  let formattedAddress = place.formatted_address;
  if (addressData.country) {
    // Remove ", Country" from the end of the address
    const countryPattern = new RegExp(`,\\s*${addressData.country}\\s*$`);
    formattedAddress = formattedAddress.replace(countryPattern, '');
  }

  tempAddress.addressLine1 = formattedAddress;
  tempAddress.postalCode = addressData.postal_code || "15151";
  tempAddress.city = addressData.locality;
  tempAddress.state = addressData.administrative_area_level_1;

  return tempAddress;
}
export default AddressInput;
