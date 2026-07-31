"use client";
import "./map.scss";
import { googleApiKey } from "@/config";
import { GoogleMap, useLoadScript, DirectionsRenderer, Marker } from "@react-google-maps/api";
import { useEffect, useState, useMemo, useCallback, memo } from "react";
import { useJobBooking } from "../JobBooking/JobBookingHook";
const center = {
  lat: 0,
  lng: 0,
};
const libraries: any = ["places", "geometry"];
const showMarkerForm = ["Labour Only", "Haul Away"];
const mapContainerStyle = {
  width: "100%",
  height: "360px",
};

interface MapProps {
  location: { lat: number; lng: number };
  stopover: true;
}
const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleApiKey,
    libraries,
  });
  const { activeStep, jobBooking, setDistance, setDuration, setDurationKm, moverServices } = useJobBooking();
  const [directions, setDirections] = useState<any>(null);

  const [stopperPosition, setStopperPosition] = useState<MapProps[]>([]);

  const mapOptions = useMemo(() => ({
    disableDefaultUI: true,
    zoomControl: false,
    streetViewControl: false,
  }), []);

  // Memoize start and end points to prevent unnecessary re-renders
  const startPoint = useMemo(() => ({
    lat: jobBooking?.pickUpLocation?.address?.latitude || "",
    lng: jobBooking?.pickUpLocation?.address?.longitude || "",
  }), [jobBooking?.pickUpLocation?.address?.latitude, jobBooking?.pickUpLocation?.address?.longitude]);

  const endPoint = useMemo(() => ({
    lat: jobBooking?.dropOffLocation?.address?.latitude || "",
    lng: jobBooking?.dropOffLocation?.address?.longitude || "",
  }), [jobBooking?.dropOffLocation?.address?.latitude, jobBooking?.dropOffLocation?.address?.longitude]);
  const calculateDistanceTime = useCallback((response: any) => {
    if (!response) return null; // Ensure response is available

    const route = response.routes[0];
    const legs = route.legs;

    const totalDistance = legs.reduce((acc: any, leg: any) => acc + leg.distance.value, 0);
    const totalDurationMinutes = legs.reduce((acc: any, leg: any) => acc + leg.duration.value, 0);

    const hours = Math.floor(totalDurationMinutes / 60);

    const minutes = (totalDurationMinutes % 60) / 2;
    let durationString = "";
    if (hours > 60) {
      durationString += `${Math.floor(hours / 60)} hour${Math.floor(hours / 60) > 1 ? "s" : ""} `;
    } else {
      durationString += `${Math.floor(hours)} minute${hours > 1 ? "s" : ""}`;
    }
    if (hours > 60) {
      durationString += `${minutes} minute${minutes > 1 ? "s" : ""}`;
    }

    setDistance(`${Math.ceil(totalDistance / 1000)} Kms`);
    setDuration(hours.toString());
    setDurationKm(durationString);
  }, [setDistance, setDuration, setDurationKm]);

  const directionsCallback = useCallback((response: any) => {
    if (response !== null && response.status === "OK") {
      setDirections(response);
      calculateDistanceTime(response);
    } else {
    }
  }, [calculateDistanceTime]);

  const directionsRequest: any = useMemo(() => ({
    origin: startPoint,
    destination: endPoint,
    waypoints: stopperPosition,
    travelMode: "DRIVING", // You can change the travel mode here (DRIVING, BICYCLING, TRANSIT, or WALKING)
  }), [startPoint, endPoint, stopperPosition]);
  useEffect(() => {
    if (jobBooking?.stopOvers && jobBooking.stopOvers.length > 0) {
      const stopDirections: any = jobBooking.stopOvers.map((item) => ({
        location: { lat: item?.address?.latitude, lng: item?.address?.longitude },
        stopover: true,
      }));
      setStopperPosition(stopDirections);
    } else {
      setStopperPosition([]);
    }
    if (!jobBooking?.pickUpLocation?.address?.latitude || !jobBooking?.pickUpLocation?.address?.longitude) {
      setDirections(null);
    }
    // Only depend on address coordinates, not other fields like liftBooking, flightOfStairs, etc.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    jobBooking?.stopOvers?.length,
    jobBooking?.pickUpLocation?.address?.latitude,
    jobBooking?.pickUpLocation?.address?.longitude,
    jobBooking?.dropOffLocation?.address?.latitude,
    jobBooking?.dropOffLocation?.address?.longitude
  ]);

  useEffect(() => {
    if (isLoaded && jobBooking) {
      const directionsService = new window.google.maps.DirectionsService();
      if (jobBooking?.pickUpLocation?.address?.latitude && 
          jobBooking?.pickUpLocation?.address?.longitude &&
          jobBooking?.dropOffLocation?.address?.latitude && 
          jobBooking?.dropOffLocation?.address?.longitude) {
        directionsService.route(directionsRequest, directionsCallback);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directionsRequest, isLoaded, directionsCallback]);

  if (activeStep === 1 && !isLoaded)
    return (
      <div
        style={{
          width: "100%",
          height: "250px",
        }}
      >
        Loading....
      </div>
    );

  // Fetch directions using the Directions Service

  return (
    activeStep === 1 && (
      <div className="mapContainer">
        <GoogleMap
          center={jobBooking?.pickUpLocation?.address?.latitude ? startPoint : center} // Center the map on the first point of the path
          zoom={4}
          mapContainerStyle={mapContainerStyle}
          options={mapOptions}
        >
          {showMarkerForm.includes(moverServices) && jobBooking?.pickUpLocation?.address?.latitude && (
            <Marker position={startPoint} />
          )}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>
    )
  );
};

export default memo(Map);
