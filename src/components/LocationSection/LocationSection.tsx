// LocationSection.tsx (client component)
"use client";
import React from "react";
import AppInitializer from "@/components/JobBooking/JobInitializer";
import Locations from "../LandingPage/services/Location";


export default function LocationSection() {
    return (
        <AppInitializer>
            <Locations />
        </AppInitializer>
    );
}
