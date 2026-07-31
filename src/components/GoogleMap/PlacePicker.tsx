"use client";
import React, { useCallback, useMemo, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { googleApiKey } from "@/config";

type LatLng = { lat: number; lng: number };

interface PlacePickerProps {
  initialPosition?: LatLng;
  onSelectAddress: (addr: any) => void;
  height?: number | string;
}

const libraries: ("places" | "geometry")[] = ["places", "geometry"];

const containerStyle = (height: number | string) => ({
  width: "100%",
  height,
});

function extractAddressFromGeocoderResult(result: google.maps.GeocoderResult, latLng: LatLng) {
  const addressData: Record<string, string> = {};
  result.address_components.forEach((component) => {
    const type = component.types[0];
    addressData[type] = component.long_name;
  });

  const tempAddress: any = {
    ...addressData,
    latitude: latLng.lat,
    longitude: latLng.lng,
  };
  tempAddress.addressLine1 = result.formatted_address;
  tempAddress.postalCode = addressData.postal_code || "";
  tempAddress.city = addressData.locality || addressData.administrative_area_level_2 || "";
  tempAddress.state = addressData.administrative_area_level_1 || "";
  return tempAddress;
}

const PlacePicker: React.FC<PlacePickerProps> = ({ initialPosition, onSelectAddress, height = 260 }) => {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: googleApiKey, libraries });
  const [marker, setMarker] = useState<LatLng | null>(initialPosition || null);


  const defaultCenter: LatLng = useMemo(() => ({ lat: -33.8688, lng: 151.2093 }), []); // Sydney default

  const handleMapClick = useCallback(async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    const latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setMarker(latLng);
    try {
      const geocoder = new google.maps.Geocoder();
      const { results } = await geocoder.geocode({ location: latLng });
      if (results && results[0]) {
        const address = extractAddressFromGeocoderResult(results[0], latLng);
        onSelectAddress(address);
      } else {
        onSelectAddress({ latitude: latLng.lat, longitude: latLng.lng });
      }
    } catch (err) {
      onSelectAddress({ latitude: latLng.lat, longitude: latLng.lng });
    }
  }, [onSelectAddress]);



  if (!isLoaded) {
    return <div style={{ width: "100%", height, display: "flex", alignItems: "center", justifyContent: "center" }}>Loading map…</div>;
  }

  return (
    <div>
      <GoogleMap
        center={marker || defaultCenter}
        zoom={marker ? 15 : 11}
        mapContainerStyle={containerStyle(height)}
        onClick={handleMapClick}
        options={{ streetViewControl: false, mapTypeControl: false }}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
      <div style={{ fontSize: 12, color: "#6c757d", marginTop: 6 }}>Tap on map to select address</div>
    </div>
  );
};

export default PlacePicker;


