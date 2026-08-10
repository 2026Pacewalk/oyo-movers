import React from "react";
import Link from "next/link";
import { FaEnvelope, FaPhoneVolume } from "react-icons/fa6";
import Footer from "@/components/WebAppWrapper/Footer";
import "@/styles/legal.scss";

export default function PlatformTermsPage() {
  return (
    <div className="legal-page">
      <section id="platform-terms">
        <div className="pt-hero">
          <div className="pt-hero-inner">
            <nav className="pt-crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Legal</span>
              <span>/</span>
              <span>Platform Terms</span>
            </nav>
            <span className="pt-badge">Legal</span>
            <h1 className="pt-title">Platform Terms of Use</h1>
            <div className="divider"></div>
            <p className="pt-hero-sub">
              The terms that govern your access to and use of the OYO Movers platform.
            </p>
          </div>
        </div>
        <div className="container-1">
          <div className="row">

            {/* Table of Contents */}
            <div className="col-md-4 col-lg-4 col-xl-4 col-xxl-3 ">
              <div className="table-of-contents">
                <span>Table Of Content</span>
                <ul>
                  <li>
                    <Link href="#introduction" className="links">
                      Introduction
                    </Link>
                  </li>
                  <li>
                    <Link href="#definition" className="links">
                      1. Definition
                    </Link>
                  </li>
                  <li>
                    <Link href="#description" className="links">
                      2. Description of Platform 
                    </Link>
                  </li>
                  <li>
                    <Link href="#creatingaccount" className="links">
                      3. Creating Account
                    </Link>
                  </li>
                  <li>
                    <Link href="#usereligibility" className="links">
                      4. User Eligibility
                    </Link>
                  </li>
                  <li>
                    <Link href="#prohibitedconduct" className="links">
                      5. Prohibited Conduct
                    </Link>
                  </li>
                  <li>
                    <Link href="#bookingprocess" className="links">
                      6. Booking Process
                    </Link>
                  </li>
                  <li>
                    <Link href="#ratingreview" className="links">
                      7. Rating & Review System
                    </Link>
                  </li>
                  <li>
                    <Link href="#tpl" className="links">
                      8. Third Party Links
                    </Link>
                  </li>
                  <li>
                    <Link href="#limitations" className="links">
                      9. Limitation of Liability
                    </Link>
                  </li>
                  <li>
                    <Link href="#electroniccommunications" className="links">
                      10. Consent
                    </Link>
                  </li>
                  <li>
                    <Link href="#suspension" className="links">
                      11. Suspension
                    </Link>
                  </li>
                  <li>
                    <Link href="#copyright" className="links">
                      12. Copyright Claiming
                    </Link>
                  </li>
                  <li>
                    <Link href="#indemnification" className="links">
                      13. Indemnification
                    </Link>
                  </li>
                  <li>
                    <Link href="#notice" className="links">
                      14. Notice Regarding Apple
                    </Link>
                  </li>
                  <li>
                    <Link href="#modification" className="links">
                      15. Modifications of Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="#governance" className="links">
                      16. Governance
                    </Link>
                  </li>
                  <li>
                    <Link href="#contactus" className="links">
                      17. Contact Information
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-md-8 col-lg-8 col-xl-8 col-xxl-9">
              <div className="content-section">
                <div id="last-updated">
                  <h6 className="underline font-weight-normal mb-4">
                    <span style={{ fontWeight: "bold", color: "black" }}>Last Updated:</span> 25.02.2026
                  </h6>
                </div>

                <div id="introduction">
                  <p className="text-justify">
                    <strong>Welcome to OYO! (On-Demand Moving Platform)</strong>
                  </p>
                  <p className="text-justify">
                    These Terms of use govern your access to and use of our
                    services, including this site, mobile applications, other
                    features or services offered on Oyo platform. Please read
                    these Terms carefully and If you do not agree with any part
                    of these terms, do not use the Platform.
                  </p><br/>

                  <p className="text-justify">
                    BY ACCESSING OR USING THE OYO PLATFORM YOU AGREE TO THESE
                    TERMS AND OUR POLICIES
                  </p><br/>

                  <p className="text-justify normal-heading mb-2 font-weight-bold">
                    These Terms must be read together with our:
                  </p>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2">
                      <span>•&nbsp;</span>
                      <a href="/customer-terms" style={{ color: "#007bff" }}>
                        Customer Terms and Conditions
                      </a>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>•&nbsp;</span>
                      <a href="/privacy-policy" style={{ color: "#007bff" }}>
                        Privacy Policy
                      </a>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>•&nbsp;</span>
                      <a href="/cancel-policy" style={{ color: "#007bff" }}>
                        Cancellation Policy
                      </a>
                    </p>
                  </div>
                </div>

                <div id="definition">
                  <h5 className="text-uppercase mt-3">1. DEFINITION</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2">
                      <span>1.1 </span>
                      <span>
                        <span className="font-weight-bold">
                          “We”, “Us”, “Our”, “Oyo”, “oyomovers” and “Oyo Movers”
                        </span>{" "}
                        mean Oyo Group Pty Ltd (ABN 30 646 236 179).
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>1.2 </span>
                      <span>
                        {" "}
                        <span className="font-weight-bold">
                          Service Provider:-
                        </span>
                        means Independent Contractors, Movers, Helpers or Moving
                        Professionals using the Platform to provide services.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>1.3 </span>
                      <span>
                        {" "}
                        <span className="font-weight-bold">
                          Users,You , Your or Customer:-
                        </span>
                        means anyone using the platform to request or book
                        services.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>1.4 </span>
                      <span>
                        {" "}
                        <span className="font-weight-bold">Goods -</span>means
                        furniture, household items, office items, junk, or other
                        items being moved, delivered, or removed.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>1.5 </span>
                      <span>
                        {" "}
                        <span className="font-weight-bold">Service -</span>means
                        means any moving, delivery, junk removal or related
                        services requested or arranged through OYO Platform.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="description">
                  <h5 className="text-uppercase mt-3">
                    2. DESCRIPTION OF PLATFORM USE
                  </h5>
                  <div className="points ">
                    <p className="text-justify mb-2">
                        OYO provides a technology platform that facilitates
                        connections between Customers and independent Service
                        Providers for on-demand moving, delivery, and junk
                        removal services.
                    </p>
                    <p className="text-justify d-flex mb-2">
                      Through the Platform, Users can request services such as
                      moving items, houses, offices, or disposing of unwanted
                      items. Requests are sent to our network of Service
                      Providers.
                    </p>
                    <p className="text-justify d-flex   mb-2">
                      <span>2.1&nbsp;</span>
                      <span>
                        OYO may facilitate or collect payments through the
                        Platform on behalf of Service Providers, and payment
                        processing may be handled through third-party providers
                        such as Stripe, subject to the applicable Customer Terms
                        and Movers / Helpers Terms.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>2.2&nbsp;</span>
                      <span>
                        Service Providers available through the Platform are
                        independent contractors / businesses and are responsible
                        for the services they provide, subject to the applicable
                        Customer Terms and Movers / Helpers Terms.
                      </span>
                    </p>

                    <p className="text-justify d-flex mb-2">
                      <span>2.3&nbsp;</span>
                      <span>
                        OYO charges Service Providers a fee for payments
                        processed through the Platform; Customers are not
                        charged by OYO directly for this fee.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>2.4&nbsp;</span>
                      <span>
                        Personal information is handled according to our Privacy
                        Policy, available on our website.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="creatingaccount">
                  <h5 className="text-uppercase mt-3">3. CREATING ACCOUNT</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2">
                      <span>3.1&nbsp;</span>
                      <span>
                        When you create an account you provide certain personal
                        information (Name, Address, Mobile number, etc).
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>3.2&nbsp;</span>
                      <span>
                        You must keep your password secure. You are responsible
                        for activity under your account.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>3.3&nbsp;</span>
                      <span>
                        You must notify us immediately if you suspect any
                        unauthorised use or security breach.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>3.4&nbsp;</span>
                      <span>
                        You represent and warrant to us that all information
                        that you provide in connection with your account is
                        accurate, truthful, current and complete.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>3.5&nbsp;</span>
                      <span>
                        OYO reserves the right to deny, suspend or restrict any
                        account at our discretion.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="usereligibility">
                  <h5 className="text-uppercase mt-3">4. USER ELIGIBILITY</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2">
                      <span>4.1&nbsp;</span>
                      <span>
                        You must be 18+ and have legal capacity to enter into a
                        binding contract.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>4.2&nbsp;</span>
                      <span>
                        If you are accessing and using an account on someone
                        else’s behalf, you confirm that you have authority to
                        bind that person or entity.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>4.3&nbsp;</span>
                      <span>
                        By using the Services, you represent and warrant that
                        you meet these eligibility requirements.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="prohibitedconduct">
                  <h5 className="text-uppercase mt-3">5. PROHIBITED CONDUCT</h5>
                  <div className="points ">
                    <p className="text-justify mb-2">
                      You must use the platform lawfully and respectfully. You
                      may not:
                    </p>
                    <ul>
                      <p style={{ color: "#666" }}>
                        <span className="font-weight-bold">a)</span>{" "}
                        <span>
                          Use the services for any illegal or unauthorised
                          purposes.
                        </span>
                      </p>
                      <p style={{ color: "#666" }}>
                        <span className="font-weight-bold">b)</span>{" "}
                        <span>
                          Violate any regulations, law, or third-party rights.
                        </span>
                      </p>
                      <p style={{ color: "#666" }}>
                        <span className="font-weight-bold">c)</span>{" "}
                        <span>
                          Using the Site or any Content in any way that competes
                          with our business.
                        </span>
                      </p>
                      <p style={{ color: "#666" }}>
                        <span className="font-weight-bold">d)</span>{" "}
                        <span>
                          Threaten, harass, or defame any person or user of the
                          services.
                        </span>
                      </p>
                      <p style={{ color: "#666" }}>
                        <span className="font-weight-bold">e)</span>{" "}
                        <span>
                          Access the Platform other than through official
                          interfaces.
                        </span>
                      </p>
                      <p style={{ color: "#666" }}>
                        <span className="font-weight-bold">f)</span>{" "}
                        <span>
                          Copy or distribute Platform content unlawfully.
                        </span>
                      </p>
                      <p style={{ color: "#666" }}>
                        <span className="font-weight-bold">g)</span>{" "}
                        <span>Submit false or misleading information.</span>
                      </p>
                      <p style={{ color: "#666" }}>
                        <span className="font-weight-bold">h)</span>{" "}
                        <span>
                          Attempt to gain unauthorised access to the Services or
                          other accounts.
                        </span>
                      </p>
                      <p style={{ color: "#666" }}>
                        <span className="font-weight-bold">i)</span>{" "}
                        <span>Assist others in prohibited acts</span>
                      </p>
                      <p style={{ color: "#666" }}>
                        <span className="font-weight-bold">j)</span>{" "}
                        <span>
                          Use contact details or information obtained through
                          the Platform to bypass the Platform for services
                          arranged through OYO.
                        </span>
                      </p>
                    </ul>
                  </div>
                </div>

                <div id="bookingprocess">
                  <h5 className="text-uppercase mt-3">6. BOOKING PROCESS</h5>
                  <div className="points ">
                    <ul>
                      <p style={{ color: "#666" }}>
                        <span className="font-weight-bold">a)</span>{" "}
                        <span>Providing pickup & delivery addresses</span>
                      </p>
                      <p style={{ color: "#666" }}>
                        <span className="font-weight-bold">b)</span>{" "}
                        <span>
                          Choose the number of movers and vehicle size
                        </span>
                      </p>
                      <p style={{ color: "#666" }}>
                        <span className="font-weight-bold">c)</span>{" "}
                        <span>Select date and time</span>
                      </p>
                      <p style={{ color: "#666" }}>
                        <span
                          className="font-weight-bold"
                          style={{ color: "#666" }}
                        >
                          d)
                        </span>{" "}
                        <span>
                          Upload photos and provide a description of your move.
                        </span>
                      </p>
                      <p style={{ color: "#666" }}>
                        <span className="font-weight-bold">e)</span>{" "}
                        <span>
                          Enter payment details (Processed by{" "}
                          <a
                            href="https://stripe.com/au"
                            target="_blank"
                            className="text-primary underline"
                          >
                            Stripe
                          </a>
                          )
                        </span>
                      </p>
                      <p style={{ color: "#666" }}>
                        <span className="font-weight-bold">f)</span>{" "}
                        <span>
                          Once confirmed, a service provider is allocated to
                          your job.
                        </span>
                      </p>
                      <p style={{ color: "#666" }}>
                        <span className="font-weight-bold">g)</span>{" "}
                        <span>
                          We also exchange your and mover details for
                          coordination,
                        </span>
                      </p>
                      <p style={{ color: "#666" }}>
                        <span
                          className="font-weight-bold"
                          style={{ color: "#666" }}
                        >
                          h)
                        </span>{" "}
                        <span>
                          If the allocated Mover cannot perform the job (because
                          of any reason), we try to assign an alternative
                          Service provider or in some scenarios re-schedule the
                          booking. Customer can cancel the service at no cost if
                          no alternative is available.
                        </span>
                      </p>
                    </ul>
                  </div>
                </div>

                <div id="ratingreview">
                  <h5 className="text-uppercase mt-3">
                    7. RATING & REVIEW SYSTEM
                  </h5>
                  <div className="points ">
                    <p className="text-justify mb-2">
                      Oyo Platform has two-Way feedback / rating system. After
                      each completed move, both Customer and Mover can rate each
                      other from 1 to 5 stars.
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>7.1&nbsp;</span>
                      <span>
                        {" "}
                        <span>Mover Ratings:-</span> A Mover’s overall rating is
                        based on the{" "}
                        <span className="font-weight-bold">
                          average of their recent jobs.
                        </span>{" "}
                        Low ratings may trigger support review, additional
                        training, or removal from the OYO platform.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>7.2&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Customer Ratings:-
                        </span>
                        Based on professionalism and cooperation. Customers with
                        consistently poor ratings may limit bookings.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>7.3&nbsp;</span>
                      <span>
                        {" "}
                        <span className="font-weight-bold">
                          Feedback & Reporting:-
                        </span>
                        Safety or misconduct issues are escalated to OYO
                        support.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>7.4&nbsp;</span>
                      <span>
                        {" "}
                        <span className="font-weight-bold">Transparency:-</span>
                        Only the{" "}
                        <span className="font-weight-bold">
                          average rating
                        </span>{" "}
                        is displayed; individual ratings may remain hidden.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>7.5&nbsp;</span>
                      <span>
                        {" "}
                        <span className="font-weight-bold">
                          Perks & Rewards:-
                        </span>
                        Consistently high ratings can unlock perks, such as:-
                        priority job allocation for Movers and loyalty rewards
                        or discounts for Customers.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="tpl">
                  <h5 className="text-uppercase mt-3">8. THIRD PARTY LINKS</h5>
                  <div className="points ">
                    <p className="text-justify mb-2">
                      The Platform may include or provide links to third-party
                      websites (e.g.- Stripe, google, Apple). OYO has no control
                      over these sites and is not responsible for their content,
                      security, or terms of use.
                    </p>
                  </div>
                </div>

                <div id="limitations">
                  <h5 className="text-uppercase mt-3">
                    9. LIMITATION OF LIABILITY
                  </h5>
                  <div className="points ">
                    <p className="text-justify mb-2">
                      To the fullest extent permitted by law, including the
                      Australian Consumer Law, OYO is not liable for any
                      indirect, incidental, special, consequential, exemplary or
                      punitive loss or damage, including loss of profits, loss
                      of revenue, loss of opportunity, or reputational damage,
                      arising out of or in connection with your use of the
                      Platform or Services. Nothing in these Terms excludes,
                      restricts or modifies any consumer guarantee, right or
                      remedy conferred by the Australian Consumer Law or any
                      other applicable law that cannot be excluded, restricted
                      or modified.<br /> To the extent OYO’s liability cannot be
                      excluded, OYO’s liability is limited to the maximum extent
                      permitted by law.
                    </p>
                  </div>
                </div>

                <div id="electroniccommunications">
                  <h5 className="text-uppercase mt-3">
                    10. CONSENT TO ELECTRONIC COMMUNICATIONS
                  </h5>
                  <div className="points padd ">
                    <p className="text-justify mb-2">
                      By using the Oyo Platform, you agree that we may
                      communicate with you electronically regarding your use of
                      the Oyo Platform and that any notices, agreements,
                      disclosures, or other communications that we send to you
                      electronically will satisfy any legal communication
                      requirements, including that the communications be in
                      writing. To withdraw your consent from receiving
                      electronic notice, please notify us at{" "}
                      <a
                        href="mailto:support@oyomovers.com.au"
                        className="font-weight-bold"
                      >
                        support@oyomovers.com.au
                      </a>
                    </p>
                  </div>
                </div>

                <div id="suspension">
                  <h5 className="text-uppercase mt-3">
                    11. SUSPENSION AND TERMINATION
                  </h5>
                  <div className="points padd ">
                    <p className="text-justify d-flex mb-2">
                      <span>11.1&nbsp;</span>
                      <span>
                        You may terminate your Account and these terms at any
                        time by deleting the App and stop using OYO Services.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>11.2&nbsp;</span>
                      <span>
                        Oyo may suspend or terminate your account or restrict
                        your access to the Platform (including the Apps), if we
                        need to investigate unusual activity, potential breaches
                        of these Terms, security, legal, safety, compliance, or
                        regulatory issues, or otherwise at OYO’s discretion,
                        with or without notice
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>11.3&nbsp;</span>
                      <span>
                        Suspension or termination may include restricting access
                        to or use of the Platform or Apps (Customer App or
                        Movers App). All provisions of these Terms (including
                        the license grant) will survive any termination or
                        suspension.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>11.4&nbsp;</span>
                      <span>
                        Termination of these Terms will not affect any rights or
                        liabilities that either Party has accrued under them.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>11.5&nbsp;</span>
                      <span>
                        This Clause will survive the termination or expiry of
                        these Terms.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="copyright">
                  <h5 className="text-uppercase mt-3">
                    12. COPYRIGHT CLAIMING
                  </h5>
                  <div className="points padd ">
                    <p className="text-justify mb-2">
                      If you believe that anything on the OYO Platform infringes
                      any copyright that you own or control, you may notify OYO
                      by contacting:&nbsp;
                      <a
                        href="mailto:support@oyomovers.com.au"
                        className="font-weight-bold"
                      >
                        support@oyomovers.com.au
                      </a>
                    </p>
                  </div>
                </div>

                <div id="indemnification">
                  <h5 className="text-uppercase mt-3">13. INDEMNIFICATION</h5>
                  <div className="points padd ">
                    <p className="text-justify mb-2">
                      You agree to indemnify, defend, and hold harmless OYO and
                      its affiliates, officers, directors, employees, and agents
                      from and against any claims, liabilities, damages, losses,
                      judgments, settlements, penalties, fines, costs, and
                      expenses (including reasonable legal fees) arising out of
                      or related to your conduct in connection with the
                      Platform, your breach of these Terms, or your breach of
                      any applicable law.
                    </p>
                  </div>
                </div>

                <div id="notice">
                  <h5 className="text-uppercase mt-3">
                    14. NOTICE REGARDING APPLE, INC. AND OTHER THIRD-PARTY
                    BENEFICIARIES.
                  </h5>
                  <div className="points padd ">
                    <p className="text-justify mb-2">
                      You acknowledge and agree that Apple, Inc. ("Apple") and
                      its subsidiaries are third-party beneficiaries of this
                      Agreement, and further that:
                    </p>
                    <ul>
                      <p className="text-justify d-flex mb-2">
                        <span>
                          <span className="font-weight-bold">a)</span>&nbsp;
                        </span>
                        <span>
                          upon your acceptance of the terms and conditions of
                          this Agreement, Apple will have the right to enforce
                          this Agreement against you as a third-party.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>
                          <span className="font-weight-bold">b)</span>&nbsp;
                        </span>
                        <span>
                          this Agreement is between you and Oyo only, not Apple.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>
                          <span className="font-weight-bold">c)</span>&nbsp;
                        </span>
                        <span>
                          Oyo is solely responsible for the Software and its
                          content.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>
                          <span className="font-weight-bold">d)</span>&nbsp;
                        </span>
                        <span>
                          Apple has no obligation to provide maintenance and
                          support.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>
                          <span className="font-weight-bold">e)</span>&nbsp;
                        </span>
                        <span>
                          To the maximum extent permitted by applicable law,
                          Apple will have no warranty obligation with respect to
                          the Software; and Oyo will be responsible for any
                          claims, losses, liabilities, damages, costs or
                          expenses attributable to any failure of the Software
                          to conform to any applicable warranty.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>
                          <span className="font-weight-bold">f)</span>&nbsp;
                        </span>
                        <span>
                          In the event of any third-party claim that the
                          Software or your possession and use of that Software
                          infringes that third party's intellectual property
                          rights, Apple will not be responsible for the
                          investigation, defence, settlement and discharge of
                          any such intellectual property infringement claims.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>
                          <span className="font-weight-bold">g)</span>&nbsp;
                        </span>
                        <span>
                          Apple is not responsible for addressing any claims
                          regarding:-
                        </span>
                      </p>
                    </ul>
                    <div className="pl-md-4" style={{ marginLeft: "16px" }}>
                      <p className="mb-0">
                        <span className="font-weight-bold">i.</span> Product
                        liability claims related to the Software.
                      </p>
                      <p>
                        <span className="font-weight-bold">ii.</span> Claims
                        that the Software fails to perform as expected.
                      </p>
                      <p>
                        <span className="font-weight-bold">iii.</span> Any
                        damage, loss, or misuse arising from your use of the
                        Software.
                      </p>
                      <p>
                        <span className="font-weight-bold">iv.</span> Resolving
                        disputes between Users and OYO.
                      </p>
                    </div>
                  </div>
                </div>

                <div id="modification">
                  <h5 className="text-uppercase mt-3">
                    15. MODIFICATIONS OF TERMS
                  </h5>
                  <div className="points padd ">
                    <p className="text-justify d-flex mb-2">
                      <span>15.1&nbsp;</span>
                      <span>
                        We reserve the right to update these Terms at any time,
                        in our discretion
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>15.2&nbsp;</span>
                      <span>
                        If we make changes, we may notify you by updating the
                        date at the top of these Terms and/or by giving notice
                        through the Platform, by email, or by other reasonable
                        means.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>15.3&nbsp;</span>
                      <span>
                        We encourage you to review these Terms periodically to
                        stay informed about our practices. By continuing to use
                        the OYO Movers Platform after the updated Terms take
                        effect, you agree to be bound by the revised Terms.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="governance">
                  <h5 className="text-uppercase mt-3">
                    16. GOVERNANCE AND JURISDICTION
                  </h5>
                  <div className="points padd ">
                    <p className="text-justify mb-2">
                      These Terms are governed by the laws of Victoria,
                      Australia, and you submit to the non-exclusive
                      jurisdiction of the courts of that State.
                    </p>
                  </div>
                </div>

                <div id="contactus">
                  <h5 className="text-uppercase mt-3">
                    17. CONTACT INFORMATION
                  </h5>
                  <div className="points padd ">
                    <p className="text-justify mb-2">
                      If you have any questions or concerns, please contact us
                      at:
                    </p>
                    <p className="">
                      Oyo Group Pty Ltd. (ACN- 646236179)
                      <br />
                      <span className="font-weight-bold">
                        <span style={{ marginRight: "5px" }}>
                          <FaEnvelope />
                        </span>
                        Email:
                      </span>{" "}
                      <a
                        href="mailto:support@oyomovers.com.au"
                      
                        style={{ color: "#007bff" }}
                      >
                        support@oyomovers.com.au
                      </a>
                      <br />
                      <span className="font-weight-bold">
                        <span style={{ marginRight: "5px" }}>
                          <FaPhoneVolume />
                        </span>
                        Phone:
                      </span>{" "}
                      <a
                        href="tel:1300 01 31 31"
                        style={{ textDecoration: "none", color: "#000" }}
                      >
                        1300 01 31 31
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
