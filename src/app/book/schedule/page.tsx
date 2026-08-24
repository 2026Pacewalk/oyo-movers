"use client";

import "../../app-home/appHome.scss";
import "../book.scss";
import "./schedule.scss";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaBolt } from "react-icons/fa";

const slots = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM",
  "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM",
];

function next7Days() {
  const out: { day: string; date: number; full: string }[] = [];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const base = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    out.push({ day: days[d.getDay()], date: d.getDate(), full: d.toDateString() });
  }
  return out;
}

export default function BookSchedule() {
  const days = next7Days();
  const [asap, setAsap] = useState(true);
  const [activeDay, setActiveDay] = useState(0);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);

  return (
    <div className="fig-home bk-page sch-page">
      <div className="fh-screen">
        <header className="bk-subhead">
          <Link href="/book" className="bk-back" aria-label="Back"><FaArrowLeft /></Link>
          <span className="bk-subhead-title">Date &amp; Time</span>
          <span className="bk-subhead-spacer" />
        </header>

        <main className="fh-body bk-body">
          {/* ASAP toggle */}
          <button
            type="button"
            className={`sch-asap ${asap ? "active" : ""}`}
            onClick={() => setAsap(true)}
          >
            <span className="sch-asap-ic"><FaBolt /></span>
            <span className="sch-asap-text">
              <strong>Same Day / ASAP</strong>
              <small>Get movers to your doorstep in minutes</small>
            </span>
            <span className="sch-asap-radio" />
          </button>

          <div className="sch-or"><span>or schedule for later</span></div>

          {/* Day picker */}
          <div className="sch-days">
            {days.map((d, i) => (
              <button
                key={d.full}
                type="button"
                className={`sch-day ${!asap && activeDay === i ? "active" : ""}`}
                onClick={() => { setAsap(false); setActiveDay(i); }}
              >
                <span className="sch-day-name">{d.day}</span>
                <span className="sch-day-num">{d.date}</span>
              </button>
            ))}
          </div>

          {/* Time slots */}
          <h3 className="sch-label">Select a time slot</h3>
          <div className="sch-slots">
            {slots.map((s, i) => (
              <button
                key={s}
                type="button"
                className={`sch-slot ${!asap && activeSlot === i ? "active" : ""}`}
                onClick={() => { setAsap(false); setActiveSlot(i); }}
                disabled={asap}
              >
                {s}
              </button>
            ))}
          </div>

          <Link href="/book/vehicle" className="bk-continue">Continue <FaArrowRight /></Link>
        </main>
      </div>
    </div>
  );
}
