import React from "react";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
import { suburbs } from "./suburbs";
import { locationHref } from "./locationSeo";
import "./locations.scss";

/* Labelled pins placed over the yellow Melbourne map.
   Positions are % of the map (top/left) — tweak these to fine-tune placement. */
const mapPins = [
  { name: "Essendon", slug: "essendon", top: 27, left: 34 },
  { name: "Doncaster", slug: "doncaster", top: 28, left: 50 },
  { name: "Box Hill", slug: "box-hill", top: 34, left: 55 },
  { name: "Ringwood", slug: "ringwood", top: 31, left: 66 },
  { name: "Camberwell", slug: "camberwell", top: 40, left: 48 },
  { name: "Glen Waverley", slug: "glen-waverley", top: 46, left: 58 },
  { name: "Brighton", slug: "brighton", top: 55, left: 44 },
  { name: "Rowville", slug: "rowville", top: 52, left: 64 },
  { name: "Berwick", slug: "berwick", top: 62, left: 72 },
  { name: "Frankston", slug: "frankston", top: 82, left: 47 },
];

/* Split the suburbs into three balanced columns (Lugg-style list). */
const perCol = Math.ceil(suburbs.length / 3);
const cols = [
  suburbs.slice(0, perCol),
  suburbs.slice(perCol, perCol * 2),
  suburbs.slice(perCol * 2),
];

const AreasWeCover = () => {
  return (
    <section className="areas-cover" id="areas">
      <div className="areas-inner">
        <div className="areas-layout">
          {/* Left: heading + copy + map */}
          <div className="areas-left">
            <span className="areas-eyebrow">Areas We Cover</span>
            <h2>Get trusted removalists across these Melbourne suburbs</h2>
            <p>
              Affordable moving help right across greater Melbourne. Big move or small,
              get the most affordable rates for verified movers in your suburb — same day,
              seven days a week.
            </p>
            <div className="areas-map">
              <img
                src="/images/melbourne-map.png"
                alt="OYO Movers removalists coverage across greater Melbourne suburbs"
              />
              {mapPins.map((p) => (
                <Link
                  key={p.slug}
                  href={`/removalists/${p.slug}`}
                  className="areas-map-pin"
                  style={{ top: `${p.top}%`, left: `${p.left}%` }}
                >
                  <span className="areas-map-pin-dot">
                    <FaMapMarkerAlt />
                  </span>
                  <span className="areas-map-pin-label">{p.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: 3-column suburb list */}
          <div className="areas-right">
            {cols.map((col, ci) => (
              <div className="areas-col" key={ci}>
                {col.map((s) => (
                  <Link key={s.slug} href={locationHref(s)} className="areas-row">
                    <FaMapMarkerAlt />
                    <span>{s.name}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AreasWeCover;
