"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import HowItsWork from "./HowItsWork";
import ReviewService from "./Testimonial";
import AboutService from "./AboutService";
import OurClients from "./OurClient";
import WebAppWrapper from "@/components/WebAppWrapper";
import Services from "./services/Services";
import HomeFAQ from "./faqs";
import AverageCost from "./AverageCost";
import Link from "next/link";
import "./style.scss"
import LandingServicesSlider from "./LandingServicesSlider";
import CallToAction from "./CalltoAction";
import ServicingArea from "./ServicingArea";
import OnDemand from "./OnDemand";
import ServicesLatest from "./services-latest/Services-latest";
import BusinessBanner from "./Business-banner/banner";
import SectionDivider from "./SectionDivider";
import AreasWeCover from "@/components/Locations/AreasWeCover";
import AppHero from "./AppHero";

const LandingPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#services-section") return;

    let attempts = 0;
    const maxAttempts = 20;
    const tryScroll = () => {
      const element = document.getElementById("services-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
      if (attempts++ < maxAttempts) {
        setTimeout(tryScroll, 100);
      }
    };
    tryScroll();
  }, []);

  return (
    <WebAppWrapper>
     {/* App-home style hero (Pickup + category grid + On-Demand banner) */}
     <div data-aos="fade-up"><AppHero /></div>
     <ServicesLatest />
     <div data-aos="fade-up"><LandingServicesSlider /></div>
      <div data-aos="fade-up"><HowItsWork /></div>
      <SectionDivider />
      <div data-aos="fade-up"><OnDemand /></div>
      <div data-aos="fade-up"><ReviewService /></div>
      <SectionDivider />
      <div data-aos="fade-up"><OurClients /></div>
      <AreasWeCover />
      {/* <div data-aos="fade-up"><HomeFAQ/></div> */}
      {/* <div data-aos="fade-up"><ServicingArea/></div> */}
      {/* <div data-aos="fade-up"><CallToAction/></div> */}
      <div data-aos="fade-up"><BusinessBanner /></div>
    </WebAppWrapper>
  );
};

export default LandingPage;
