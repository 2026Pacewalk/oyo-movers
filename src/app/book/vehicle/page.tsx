"use client";

import "../../app-home/appHome.scss";
import "../book.scss";
import "./vehicle.scss";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaCheck, FaRegUser } from "react-icons/fa";

const vehicles = [
  {
    key: "mini",
    name: "Mini Van",
    img: "/figma/home/van.png",
    dims: "1.5m x 1.2m x 1.2m",
    movers: "1 Mover",
    best: "Few boxes, small items",
    price: "$59",
  },
  {
    key: "medium",
    name: "Medium Truck",
    img: "/figma/home/truck.png",
    dims: "3.0m x 1.8m x 1.9m",
    movers: "2 Movers",
    best: "1–2 bedroom home",
    price: "$99",
    popular: true,
  },
  {
    key: "large",
    name: "Large Truck",
    img: "/figma/home/truck.png",
    dims: "4.3m x 2.0m x 2.1m",
    movers: "2 Movers",
    best: "3+ bedroom home",
    price: "$149",
  },
];

export default function BookVehicle() {
  const [selected, setSelected] = useState("medium");

  return (
    <div className="fig-home bk-page veh-page">
      <div className="fh-screen">
        <header className="bk-subhead">
          <Link href="/book" className="bk-back" aria-label="Back"><FaArrowLeft /></Link>
          <span className="bk-subhead-title">Select Vehicle</span>
          <span className="bk-subhead-spacer" />
        </header>

        <main className="fh-body bk-body">
          <div className="veh-list">
            {vehicles.map((v) => (
              <button
                key={v.key}
                type="button"
                className={`veh-card ${selected === v.key ? "selected" : ""}`}
                onClick={() => setSelected(v.key)}
              >
                {v.popular && <span className="veh-popular">Most Popular</span>}
                <div className="veh-img"><img src={v.img} alt={v.name} /></div>
                <div className="veh-info">
                  <div className="veh-top">
                    <span className="veh-name">{v.name}</span>
                    <span className="veh-price">{v.price}</span>
                  </div>
                  <span className="veh-dims">{v.dims}</span>
                  <div className="veh-meta">
                    <span className="veh-movers"><FaRegUser /> {v.movers}</span>
                    <span className="veh-best">Best for: {v.best}</span>
                  </div>
                </div>
                <span className="veh-check"><FaCheck /></span>
              </button>
            ))}
          </div>

          <Link href="/book/estimate" className="bk-continue">Continue <FaArrowRight /></Link>
        </main>
      </div>
    </div>
  );
}
