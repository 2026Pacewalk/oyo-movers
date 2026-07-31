import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/WebAppWrapper/Footer";
import "./movers-term.scss";
import { FaEnvelope, FaPhoneVolume } from "react-icons/fa6";

export default function MoversTermPage() {
  return (
    <div>
      <Header />
      <section id="movers-terms" className="py-4">
        <div className="container-1">
          <div className="row">
            <div className="col-md-12 pb-4">
              <h2>Movers / Helpers Terms of Use</h2>
              <div className="divider mb-3 mx-0"></div>
            </div>

            <div className="col-md-4">
              <div className="table-of-contents">
                <span>Table Of Content</span>
                <ul>
                  <li>
                    <Link href="#introduction" className="links">
                      Introduction
                    </Link>
                  </li>
                  <li>
                    <Link href="#acceptance" className="links">
                      1. Acceptance of Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="#accounts" className="links">
                      2. Accounts
                    </Link>
                  </li>
                  <li>
                    <Link href="#communication" className="links">
                      3. Communication
                    </Link>
                  </li>
                  <li>
                    <Link href="#responsibilities" className="links">
                      4. Responsibilities
                    </Link>
                  </li>
                  <li>
                    <Link href="#insurance" className="links">
                      5. Insurance
                    </Link>
                  </li>
                  <li>
                    <Link href="#moverrole" className="links">
                      6. Mover Role and Obligations
                    </Link>
                  </li>
                  <li>
                    <Link href="#oyorole" className="links">
                      7. Oyo Role and Obligations
                    </Link>
                  </li>
                  <li>
                    <Link href="#projects" className="links">
                      8. Projects (Job Leads)
                    </Link>
                  </li>
                  <li>
                    <Link href="#payments" className="links">
                      9. Payments and Fees
                    </Link>
                  </li>
                  <li>
                    <Link href="#paymentagent" className="links">
                      10. Payment Agent
                    </Link>
                  </li>
                  <li>
                    <Link href="#payouts" className="links">
                      11. Payouts
                    </Link>
                  </li>
                  <li>
                    <Link href="#disputes" className="links">
                      12. Disputes
                    </Link>
                  </li>
                  <li>
                    <Link href="#refunds" className="links">
                      13. Refunds & Cancellations
                    </Link>
                  </li>
                  <li>
                    <Link href="#breakdown" className="links">
                      14. Truck Breakdown & Accidents
                    </Link>
                  </li>
                  <li>
                    <Link href="#promotions" className="links">
                      15. Promotions & Discounts
                    </Link>
                  </li>
                  <li>
                    <Link href="#ourliability" className="links">
                      16. Our Liability
                    </Link>
                  </li>
                  <li>
                    <Link href="#yourliability" className="links">
                      17. Your Liability and Indemnity
                    </Link>
                  </li>
                  <li>
                    <Link href="#tax" className="links">
                      18. Tax, GST and RCTI
                    </Link>
                  </li>
                  <li>
                    <Link href="#fraud" className="links">
                      19. Fraud
                    </Link>
                  </li>
                  <li>
                    <Link href="#suspension" className="links">
                      20. Warnings & Suspension
                    </Link>
                  </li>
                  <li>
                    <Link href="#modification" className="links">
                      21. Modification to Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="#governance" className="links">
                      22. Governance and Jurisdiction
                    </Link>
                  </li>
                  <li>
                    <Link href="#contactus" className="links">
                      Contact Information
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-8">
              <div className="content-section">
                <div id="introduction" className="term-hang term-hang--no-num">
                  <h6 className="underline font-weight-normal mb-4">
                    <span style={{ fontWeight: "bold", color: "black" }}>Last Updated:</span> 25.02.2026
                  </h6>
                  <h5 className="text-uppercase mt-3 term-hang-heading">
                    <span className="term-hang-title">INTRODUCTION</span>
                  </h5>
                  <p className="text-justify mb-2 term-hang-body">
                    <span className="term-hang-body-text">
                      Oyo is an on-demand moving platform that connects customers
                      seeking moving services (&ldquo;Customers&rdquo;) with service
                      providers (&ldquo;Movers&rdquo; or &ldquo;Helpers&rdquo;)
                      offering moving and related services.
                    </span>
                  </p>
                  <p className="text-justify mb-2 term-hang-body">
                    <span className="term-hang-body-text">
                      This agreement is entered into between Oyo Group Pty Ltd
                      (ABN 30 646 236 179) (&ldquo;Oyo Movers&rdquo;,
                      &ldquo;Oyo&rdquo;, &ldquo;We&rdquo;, &ldquo;Us&rdquo; or
                      &ldquo;Our&rdquo;) and Service Providers (&ldquo;Mover&rdquo;,
                      &ldquo;Helper&rdquo;, &ldquo;Independent Contractor&rdquo;,
                      &ldquo;You&rdquo; or &ldquo;Your&rdquo;).
                    </span>
                  </p>
                  <p className="text-justify mb-2 term-hang-body">
                    <span className="term-hang-body-text">
                      Oyo provides lead generation and intermediary services via a
                      digital platform, enabling independent service providers to
                      receive, accept, and fulfill on-demand Job requests
                      (&ldquo;Bookings&rdquo; or &ldquo;Projects&rdquo;) for
                      transportation and moving services. Oyo licenses the Mover App
                      to facilitate these services.
                    </span>
                  </p>

                  <p className="text-justify normal-heading mb-2 font-weight-bold term-hang-subheading">
                    These Terms must be read together with:-
                  </p>
                  <div className="points term-hang-points">
                    <p className="text-justify d-flex mb-2">
                      <span>&bull;&nbsp;</span>
                      <a href="/platform-terms" style={{ color: "#007bff" }}>
                        Platform Terms and Conditions
                      </a>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>&bull;&nbsp;</span>
                      <a href="/customer-terms" style={{ color: "#007bff" }}>
                        Customer Terms and Conditions
                      </a>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>&bull;&nbsp;</span>
                      <a href="/privacy-policy" style={{ color: "#007bff" }}>
                        Privacy Policy
                      </a>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>&bull;&nbsp;</span>
                      <a href="/rcti-terms" style={{ color: "#007bff" }}>
                        RCTI Terms
                      </a>
                    </p>
                  </div>

                  <p className="text-justify font-weight-bold text-uppercase mb-2 term-hang-subheading">
                    USE OF OUR PLATFORM CONSTITUTES YOUR ACCEPTANCE OF THESE
                    TERMS. NOTHING IN THESE TERMS LIMITS YOUR RIGHTS UNDER
                    AUSTRALIAN CONSUMER LAW.
                  </p>
                </div>

                <div id="acceptance" className="term-hang">
                  <h5 className="text-uppercase mt-3 term-hang-heading">
                    <span className="term-hang-num">1.&nbsp;</span>
                    <span className="term-hang-title">ACCEPTANCE OF TERMS</span>
                  </h5>
                  <div className="points term-hang-points">
                    <p className="text-justify d-flex mb-2">
                      <span>1.1&nbsp;</span>
                      <span>
                        By clicking &ldquo;Accept and Continue&rdquo; during
                        registration on the Movers App or by using the platform,
                        you accept these Terms.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>1.2&nbsp;</span>
                      <span>
                        If downloaded via App Store or Google Play, you also
                        agree to their usage rules.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="accounts" className="term-hang">
                  <h5 className="text-uppercase mt-3 term-hang-heading">
                    <span className="term-hang-num">2.&nbsp;</span>
                    <span className="term-hang-title">ACCOUNTS</span>
                  </h5>
                  <div className="points term-hang-points">
                    <p className="text-justify d-flex mb-2">
                      <span>2.1&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Registration:-</span>{" "}
                        You must register to access and use the App and its
                        features.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>2.2&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Accurate Information:-
                        </span>{" "}
                        When registering, you must provide complete and accurate
                        details (name, contact info, vehicle, and documents). We
                        may also require background checks and vehicle checks
                        through approved third-party providers.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>2.3&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Approval:-</span>{" "}
                        Account requests are reviewed and approved at Oyo&rsquo;s
                        discretion. If we determine you are not suitable, we may
                        decline to provide you with an Account.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>2.4&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Stripe Account:-</span>{" "}
                        All payments are processed via Stripe. You must create
                        your Stripe account during the onboarding process.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>2.5&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Verification:-</span>{" "}
                        By submitting these documents, you consent to verification
                        of your identity and documents with the issuing authority.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>2.6&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Account Security:-
                        </span>{" "}
                        You are responsible for maintaining the confidentiality of
                        your login details and all activities conducted through your
                        Account. You must notify us immediately of any unauthorised
                        use or security breach.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="communication" className="term-hang">
                  <h5 className="text-uppercase mt-3 term-hang-heading">
                    <span className="term-hang-num">3.&nbsp;</span>
                    <span className="term-hang-title">COMMUNICATION</span>
                  </h5>
                  <div className="points term-hang-points">
                    <p className="text-justify d-flex mb-2">
                      <span>3.1&nbsp;</span>
                      <span>
                        We may contact you via in-app notifications, text message,
                        phone call or email.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>3.2&nbsp;</span>
                      <span>
                        When you accept a job, your contact details are shared
                        with the Customer.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>3.3&nbsp;</span>
                      <span>
                        Your live location may be shared with customers during a
                        job.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>3.4&nbsp;</span>
                      <span>
                        We may track your background location even if the app is
                        closed or not actively in use. Background location is
                        tracked only when your driver profile is online, to assign
                        new jobs and let customers track their delivery.
                      </span>
                    </p>
                    <p className="text-justify font-weight-bold mb-2">
                      <span className="font-weight-bold">NOTE:-</span>{" "}
                      <span className="font-weight-bold">
                        Customers and Service Providers must not use shared
                        contact details to arrange services outside the Platform.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="responsibilities" className="term-hang">
                  <h5 className="text-uppercase mt-3 term-hang-heading">
                    <span className="term-hang-num">4.&nbsp;</span>
                    <span className="term-hang-title">RESPONSIBILITIES</span>
                  </h5>
                  <div className="points term-hang-points">
                    <p className="text-justify d-flex mb-2">
                      <span>4.1&nbsp;</span>
                      <span>
                        You must provide accurate information and promptly notify
                        Oyo of any changes to your contact details, licensing, visa
                        status or insurance.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>4.2&nbsp;</span>
                      <span>
                        You must provide delivery services safely, lawfully, and on
                        time.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>4.3&nbsp;</span>
                      <span>
                        Make sure you finish the job completely. Our system will
                        not release payouts for unfinished jobs or for jobs with
                        pending payments / issues.{" "}
                        <i
                          className="text-secondary font-sm"
                          style={{ fontWeight: "400", fontSize: "16px" }}
                        >
                          (Subject to Clause 11- Payouts)
                        </i>
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>4.4&nbsp;</span>
                      <span>
                        You are responsible for any taxes payable on your earnings.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>4.5&nbsp;</span>
                      <span>
                        Ensure you and your representatives are of good character
                        and suitably skilled.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>4.6&nbsp;</span>
                      <span>
                        Treat Customers and others with respect, without
                        discrimination or harassment.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>4.7&nbsp;</span>
                      <span>
                        Maintain confidentiality of Customer and Oyo information,
                        unless disclosure is required by law.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>4.8&nbsp;</span>
                      <span>
                        Comply with these terms, platform policies and all
                        applicable laws and regulations.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="insurance" className="term-hang">
                  <h5 className="text-uppercase mt-3 term-hang-heading">
                    <span className="term-hang-num">5.&nbsp;</span>
                    <span className="term-hang-title">INSURANCE</span>
                  </h5>
                  <p className="text-justify mb-2 term-hang-body">
                    <span className="term-hang-body-text">
                      At your own expense, you must maintain up-to-date
                      insurance that meets or exceeds OYO&rsquo;s minimum
                      requirements. This includes:
                    </span>
                  </p>
                  <div className="points term-hang-points">
                    <p className="text-justify d-flex mb-2">
                      <span style={{ marginLeft: "13px" }}>a)&nbsp;</span>
                      <span>
                        Vehicle insurance for at least Third-Party Property cover
                        for commercial use.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ marginLeft: "13px" }}>b)&nbsp;</span>
                      <span>
                        Workers&rsquo; compensation insurance, and/or occupational
                        accident and illness insurance (not applicable to Sole
                        Traders).
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ marginLeft: "13px" }}>c)&nbsp;</span>
                      <span>
                        Product and Public liability insurance covering goods in
                        transit.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span></span>
                      <span>
                        OYO may share your insurance details with customers or
                        authorities where required.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="moverrole" className="term-hang">
                  <h5 className="text-uppercase mt-3 term-hang-heading">
                    <span className="term-hang-num">6.&nbsp;</span>
                    <span className="term-hang-title">
                      MOVER ROLE AND OBLIGATIONS
                    </span>
                  </h5>
                  <div className="points term-hang-points">
                    <p className="text-justify d-flex mb-2">
                      <span>6.1&nbsp;</span>
                      <span>
                        As an independent service provider, you may receive
                        notifications of booking requests from Customers. You have
                        the sole discretion to accept or reject any job based on
                        your availability, location, and capability.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>6.2&nbsp;</span>
                      <span>
                        By accepting a Booking, you agree to complete the Services in
                        accordance with these Terms, applicable laws, and Platform
                        instructions.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>6.3&nbsp;</span>
                      <span>
                        By using the Oyo Platform to perform Delivery Services, you
                        agree that you will:
                      </span>
                    </p>
                    <div className="points" style={{ marginLeft: "13px" }}>
                      <p className="text-justify d-flex mb-2">
                        <span>a)&nbsp;</span>
                        <span>
                          Keep your device and location services switched on so Oyo
                          and customers can track their delivery.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>b)&nbsp;</span>
                        <span>
                          Take reasonable care to ensure that items are not lost or
                          damaged and avoid doing anything that may cause or
                          contribute to such loss or damage.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>c)&nbsp;</span>
                        <span>
                          Not provide the same or similar delivery services for
                          other platforms or businesses while performing a job
                          through Oyo.
                        </span>
                      </p>
                    </div>
                    <p className="text-justify d-flex mb-2 font-weight-bold">
                      <span>6.4&nbsp;</span>
                      <span className="font-weight-bold">
                        You acknowledge that:
                      </span>
                    </p>
                    <div className="points" style={{ marginLeft: "13px" }}>
                      <p className="text-justify d-flex mb-2">
                        <span>a)&nbsp;</span>
                        <span>
                          You are an independent contractor, not an employee of
                          Oyo, and Oyo does not control the manner or means by which
                          you provide Delivery Services.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>b)&nbsp;</span>
                        <span>
                          Oyo provides the Platform solely as a technology-enabled
                          intermediary to connect you with Customers and process
                          payments.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>c)&nbsp;</span>
                        <span>
                          You are at least 18 years old and legally able to work in
                          Australia.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>d)&nbsp;</span>
                        <span>
                          You must provide valid licenses, insurances, work rights,
                          or relevant documentation and may be asked for additional
                          verification.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>e)&nbsp;</span>
                        <span>
                          You are responsible for your vehicle, equipment, licenses,
                          safety, as well as for any damages, losses, injuries,
                          accidents and claims arising from your actions in
                          connection with the services you provide.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>f)&nbsp;</span>
                        <span>
                          You must not use the Platform for any unlawful, improper
                          or unauthorised purpose.
                        </span>
                      </p>
                    </div>
                    <p className="text-justify d-flex mb-2 font-weight-bold">
                      <span>6.5&nbsp;</span>
                      <span className="font-weight-bold">
                        Vehicle &amp; Equipment Standards:
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span></span>
                      <span>The Service Provider must:</span>
                    </p>
                    <div className="points" style={{ marginLeft: "13px" }}>
                      <p className="text-justify d-flex mb-2">
                        <span>a)&nbsp;</span>
                        <span>
                          Use a registered, roadworthy, clean vehicle suitable for
                          moving services.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>b)&nbsp;</span>
                        <span>
                          Display Oyo Movers branding only where approved or provided
                          by Oyo Movers.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>c)&nbsp;</span>
                        <span>
                          Ensure all moving equipment (including blankets, straps,
                          trolleys, ramps, and similar gear) is safe, functional, and
                          properly maintained.
                        </span>
                      </p>
                    </div>
                    <p className="text-justify d-flex mb-2">
                      <span></span>
                      <span>
                        Oyo Movers may request evidence or photos demonstrating
                        compliance with these standards at any time.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="oyorole" className="term-hang">
                  <h5 className="text-uppercase mt-3 term-hang-heading">
                    <span className="term-hang-num">7.&nbsp;</span>
                    <span className="term-hang-title">
                      OYO ROLE AND OBLIGATIONS
                    </span>
                  </h5>
                  <div className="points term-hang-points">
                    <p className="text-justify d-flex mb-2">
                      <span>7.1&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Platform Access:-</span>{" "}
                        Oyo provides a web and mobile platform through which
                        Customers can request moving projects. You can accept and
                        reject jobs.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>7.2&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Engagement System:-
                        </span>{" "}
                        Oyo facilitates connections between you and Customers.
                        Once you accept a project, Oyo will share your relevant
                        details with the Customer.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>7.3&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Recordkeeping:-</span>{" "}
                        OYO keeps general records of projects solely for payment
                        processing, reporting, and administrative purposes.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>7.4&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Billing &amp; Payments:-
                        </span>{" "}
                        Oyo provides an online billing and payment system to
                        process Customer payments on your behalf. Payments are
                        managed via Stripe.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>7.5&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Customer Support:-
                        </span>{" "}
                        OYO handles customer inquiries, complaints, and refund
                        requests, and communicates with you as necessary to resolve
                        such matters.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="projects" className="term-hang">
                  <h5 className="text-uppercase mt-3 term-hang-heading">
                    <span className="term-hang-num">8.&nbsp;</span>
                    <span className="term-hang-title">PROJECTS (Job Leads)</span>
                  </h5>
                  <div className="points term-hang-points">
                    <p className="text-justify d-flex mb-2">
                      <span>8.1&nbsp;</span>
                      <span>
                        Projects become available in the Movers App based on your
                        indicated availability and location.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>8.2&nbsp;</span>
                      <span>
                        Multiple service providers may see the same project.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>8.3&nbsp;</span>
                      <span>
                        The first and nearest Delivery Professional to respond will
                        be assigned the Project.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>8.4&nbsp;</span>
                      <span>
                        App may track your location and activity, including
                        arrival, start, and completion times. This data is also used
                        for payment processing.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>8.5&nbsp;</span>
                      <span>
                        Oyo decides when and how your services are shown to
                        Customers, considering factors such as your location,
                        service area, and ratings.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>8.6&nbsp;</span>
                      <span>
                        We are not responsible for any loss of jobs or income
                        resulting from these decisions.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="payments" className="term-hang">
                  <h5 className="text-uppercase mt-3 term-hang-heading">
                    <span className="term-hang-num">9.&nbsp;</span>
                    <span className="term-hang-title">PAYMENTS AND FEES</span>
                  </h5>
                  <div className="points term-hang-points">
                    <p className="text-justify d-flex mb-2 font-weight-bold">
                      <span>9.1&nbsp;</span>
                      <span className="font-weight-bold">Customer Payments:-</span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ marginLeft: "13px" }}>a)&nbsp;</span>
                      <span>
                        All deposits are collected by Oyo at the time of booking
                        confirmation and the remaining balance payable to the
                        Service Provider upon or before job completion.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ marginLeft: "13px" }}>b)&nbsp;</span>
                      <span>
                        Charges are determined by factors such as service duration,
                        number of movers, vehicle size or other applicable booking
                        details.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ marginLeft: "13px" }}>c)&nbsp;</span>
                      <span>
                        You may negotiate additional charges directly with the
                        Customer (e.g., tolls, parking fees etc.).
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ marginLeft: "13px" }}>d)&nbsp;</span>
                      <span>
                        You may agree with the Customer on reasonable additional
                        charges related to the job (such as tolls or parking fees),
                        provided these are communicated transparently to the
                        Customer.
                      </span>
                    </p>

                    <p className="text-justify d-flex mb-2 font-weight-bold">
                      <span>9.2&nbsp;</span>
                      <span className="font-weight-bold">
                        Payment Processing:-
                      </span>{" "}
                      <span>
                        All payments are processed through Stripe. By using the Oyo
                        platform, you agree to comply with Stripe&rsquo;s Payment
                        Services Agreement.
                      </span>
                    </p>

                    <p className="text-justify d-flex mb-2 font-weight-bold">
                      <span>9.3&nbsp;</span>
                      <span className="font-weight-bold">Service Fee:-</span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ marginLeft: "13px" }}>a)&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Platform Fee:-</span> As
                        a Service Provider, you acknowledge that Oyo Movers charges
                        a platform service fee for access to the Platform, customer
                        bookings, and payment processing services.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ marginLeft: "13px" }}>b)&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Calculation:-</span> The
                        service fee is calculated as a percentage of the total job
                        amount paid by the Customer and no commission is charged on
                        voluntary customer tips.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ marginLeft: "13px" }}>c)&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Deduction &amp; Payout:-
                        </span>{" "}
                        By accepting a job through the Platform, you authorise Oyo
                        Movers to deduct the applicable service fee before releasing
                        payout funds to you. A payout summary showing the fee deducted
                        and the remaining balance transferred will be available within
                        the Platform.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span></span>
                      <span>
                        OYO may update the service fee from time to time, with any
                        changes applying to future bookings only.
                      </span>
                    </p>

                    <p className="text-justify d-flex mb-2 font-weight-bold">
                      <span>9.4&nbsp;</span>
                      <span className="font-weight-bold">No Circumvention:-</span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span></span>
                      <span>
                        You must not bypass the Platform or attempt to avoid payment
                        of applicable platform service fees for services arranged
                        through the Platform.
                      </span>
                    </p>

                    <p className="text-justify d-flex mb-2 font-weight-bold">
                      <span>9.5&nbsp;</span>
                      <span className="font-weight-bold">
                        Affiliate and Referral Bookings:-
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span></span>
                      <span>
                        Some jobs on the OYO Movers platform may come through approved
                        referral partners, building managers, or affiliate programs.
                        The following applies to these bookings:
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ marginLeft: "13px" }}>a)&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Building Manager / Referral Compliance:-
                        </span>{" "}
                        Where a job is referred by a building manager or referral
                        partner, OYO Movers may provide confirmation or copies of the
                        assigned Service Provider&rsquo;s valid insurance documentation
                        upon request for compliance purposes. Movers must ensure their
                        insurance details provided to OYO Movers remain valid and up
                        to date.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ marginLeft: "13px" }}>b)&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Mover Payments:-</span>{" "}
                        Mover payouts remain the same regardless of whether a job was
                        sourced directly through OYO Movers or referred by an affiliate
                        partner.
                      </span>
                    </p>
                    <p className="text-justify font-weight-bold mb-2">
                      <span className="font-weight-bold">PLEASE NOTE:-</span>{" "}
                      <span className="font-weight-bold">
                        OYO Movers invests in marketing, partnerships, and customer
                        acquisition to create ongoing job opportunities for Movers.
                        Completing bookings through the platform helps ensure fair and
                        equal access to future work for all service providers.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="paymentagent" className="term-hang">
                  <h5 className="text-uppercase mt-3 term-hang-heading">
                    <span className="term-hang-num">10.&nbsp;</span>
                    <span className="term-hang-title">PAYMENT AGENT</span>
                  </h5>
                  <div className="points term-hang-points">
                    <p className="text-justify d-flex mb-2">
                      <span>10.1&nbsp;</span>
                      <span>
                        You appoint Oyo (or its nominated entity) as your limited
                        payment collection agent for accepting payments from customers
                        for services you provide through the Oyo Platform.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>10.2&nbsp;</span>
                      <span>
                        Payment made by a customer to Oyo shall be deemed payment
                        made directly to you.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>10.3&nbsp;</span>
                      <span>
                        Oyo will deduct its service fees, commissions, taxes (e.g.
                        GST if applicable), and any other authorized charges before
                        remitting the balance to you.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>10.4&nbsp;</span>
                      <span>
                        Oyo&rsquo;s obligation to remit funds to you is subject to
                        actual receipt of payment from the customer and Oyo is not
                        liable for any failure by the customer to make payment.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>10.5&nbsp;</span>
                      <span>
                        Your appointment of Oyo as your limited payment collection
                        agent does not change your status as an independent
                        contractor. Oyo does not act as your employer and does not
                        treat any payments as wages.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="payouts" className="term-hang">
                  <h5 className="text-uppercase mt-3 term-hang-heading">
                    <span className="term-hang-num">11.&nbsp;</span>
                    <span className="term-hang-title">PAYOUTS</span>
                  </h5>
                  <div className="points term-hang-points">
                    <p className="text-justify d-flex mb-2">
                      <span>11.1&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Definition:-</span> A
                        &ldquo;Payout&rdquo; means the net amount Oyo transfers to
                        you for completed Jobs, after deducting applicable service
                        fees, adjustments, refunds, or other authorized charges.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2 font-weight-bold">
                      <span>11.2&nbsp;</span>
                      <span className="font-weight-bold">Eligibility:-</span>{" "}
                      <span>
                        Our system only processes payouts once a Job is fully
                        completed, meaning:-
                      </span>
                    </p>
                    <div className="points" style={{ marginLeft: "13px" }}>
                      <p className="text-justify d-flex mb-2">
                        <span>a)&nbsp;</span>
                        <span>
                          All customer payments have been received. (No Pending
                          Payment)
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>b)&nbsp;</span>
                        <span>
                          No disputes or issues remain unresolved. (No issue with
                          Job)
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>c)&nbsp;</span>
                        <span>
                          The Finish Job Form has been completed and submitted.
                        </span>
                      </p>
                    </div>
                    <p className="text-justify d-flex mb-2">
                      <span>11.3&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Processing:-</span>{" "}
                        Payouts are generally processed to your nominated bank or
                        payment account (e.g., Stripe) within 1-2 business days of
                        Job completion.{" "}
                        <i
                          className="text-secondary font-sm"
                          style={{ fontWeight: "400", fontSize: "16px" }}
                        >
                          (Subject to Clause 11.2)
                        </i>
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>11.4&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Final Invoice:-</span>{" "}
                        Each Payout will be accompanied by a tax invoice/statement
                        showing the Job details, gross payment received, Oyo&rsquo;s
                        service fee, and the final amount payable to you.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>11.5&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Customer Non-Payment:-
                        </span>{" "}
                        The Service Provider is responsible for ensuring full payment
                        is collected on or before job completion (at least 30 minutes
                        prior). In the event that full payment is not successfully
                        collected, the Service Provider will only be entitled to
                        receive the amount actually recovered from the Customer, less
                        any applicable OYO service fees.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>11.6&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Adjustments:-</span>{" "}
                        Payouts will be adjusted to reflect any customer refunds.
                        Adjustments will be shown in the final tax invoice. Any
                        disputes regarding payout adjustments must be reported to Oyo
                        within 7 days.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="disputes" className="term-hang">
                  <h5 className="text-uppercase mt-3 term-hang-heading">
                    <span className="term-hang-num">12.&nbsp;</span>
                    <span className="term-hang-title">DISPUTES</span>
                  </h5>
                  <p className="text-justify mb-2 term-hang-body">
                    <span className="term-hang-body-text">
                      The Oyo Platform acts only as a neutral means of connecting
                      independent contractors with Customers. If a dispute arises,
                      you should first attempt to resolve the matter directly with
                      the Customer. If unresolved, you must contact Oyo Support
                      within 2 days of the dispute arising.
                    </span>
                  </p>
                  <div className="points term-hang-points">

                    <p className="text-justify d-flex mb-2 font-weight-bold">
                      <span>12.1&nbsp;</span>
                      <span className="font-weight-bold">
                        Steps to Prevent Disputes:-
                      </span>
                    </p>
                    <div className="points" style={{ marginLeft: "13px" }}>
                      <p className="text-justify d-flex mb-2">
                        <span>a)&nbsp;</span>
                        <span>
                          Provide clear service descriptions before you start the
                          job.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>b)&nbsp;</span>
                        <span>
                          Communicate proactively with customers about any additional
                          fees.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>c)&nbsp;</span>
                        <span>
                          Keep proof of delivery by completing the Job Finish Form.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>d)&nbsp;</span>
                        <span>
                          <span className="font-weight-bold">Non-Payments:-</span>{" "}
                          It is the Service Provider&rsquo;s responsibility to collect
                          pre-payments and final payments upon job completion. If a
                          payment dispute arises for any reason, OYO will make
                          reasonable efforts to recover the outstanding amount from the
                          Customer. If full payment cannot be collected because of
                          settlements or any other reason, the Service Provider will
                          receive only the amount actually received, less OYO&rsquo;s
                          service fee.
                        </span>
                      </p>
                    </div>

                    <p className="text-justify d-flex mb-2">
                      <span>12.2&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Payment Disputes:-
                        </span>{" "}
                        A payment dispute occurs when a customer questions a charge,
                        claiming it was unauthorized, incorrect, or for a service not
                        received, even if the job was completed.
                      </span>
                    </p>

                    <p className="text-justify d-flex mb-2 font-weight-bold">
                      <span>12.3&nbsp;</span>
                      <span className="font-weight-bold">
                        Procedure when a customer disputes a charge:-
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ marginLeft: "13px" }}>a)&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Notification:-</span> Oyo
                        will notify you immediately when a dispute is filed and may
                        temporarily hold or reverse the disputed amount from your
                        account until the dispute is resolved (chargeback).
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ marginLeft: "13px" }}>b)&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Your responsibility:-
                        </span>{" "}
                        Provide evidence supporting any additional charges and respond
                        within Oyo&rsquo;s deadline (usually 3 working days).
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ marginLeft: "13px" }}>c)&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Outcome:-</span> If the
                        dispute is resolved in your favour, the funds are returned to
                        you and if its resolved in customer&rsquo;s Favour, the amount
                        is deducted.
                      </span>
                    </p>

                    <p className="text-justify d-flex mb-2">
                      <span>12.4&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Multiple Delivery Professionals:-
                        </span>{" "}
                        When a Project involves Multiple Delivery Professionals and
                        the full payment is not collected, OYO will attempt to recover
                        the outstanding amount. Payment to the Delivery Professionals
                        will be distributed only from amounts actually received and
                        divided equally or according to the agreed price percentage,
                        after deducting applicable Oyo service fees.
                      </span>
                    </p>

                    <p className="text-justify d-flex mb-2">
                      <span>12.5&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Costs:-</span> OYO may
                        choose to cover dispute related costs. If the dispute arises
                        due to service provider actions, any costs paid by Oyo for
                        settlement of the dispute will be recoverable from the service
                        provider.
                      </span>
                    </p>

                    <p className="text-justify d-flex mb-2">
                      <span>12.6&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Insurance:-</span> Oyo
                        reserves the right to share your insurance details with the
                        Customer if reasonably required to address a dispute.
                      </span>
                    </p>

                    <p className="text-justify d-flex mb-2">
                      <span>12.7&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Claims:-</span> If a claim
                        is made by a customer through Oyo or its insurance provider,
                        Oyo may charge you any deductible or out-of-pocket expenses
                        incurred in resolving the claim.
                      </span>
                    </p>

                    <p className="text-justify d-flex mb-2">
                      <span>12.8&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Final Decision:-</span>{" "}
                        Oyo will make a decision on disputes based on the details and
                        evidence provided by all parties. Any decision made by Oyo is
                        final and binding.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="refunds" className="term-hang">
                  <h5 className="text-uppercase mt-3 term-hang-heading">
                    <span className="term-hang-num">13.&nbsp;</span>
                    <span className="term-hang-title">
                      REFUNDS &amp; CANCELLATIONS
                    </span>
                  </h5>
                  <div className="points term-hang-points">
                    <p className="text-justify d-flex mb-2">
                      <span>13.1&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Refunds:-</span> This
                        clause governs how Oyo may refund all or part of the Moving
                        Fee, including any customer deposit, in accordance with our
                        cancellation policy.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>13.2&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Cancellation Rights:-
                        </span>{" "}
                        Rights and obligations arising from the cancellation of a
                        Removal Contract (including refunds of amounts paid) are
                        governed by the terms of that contract, except where
                        inconsistent with this Agreement.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>13.3&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Deduction Authorization:-
                        </span>{" "}
                        You authorize Oyo Movers to deduct any refunds, adjustments,
                        or Platform Fees directly from your nominated payment method
                        (e.g., Stripe account).
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>13.4&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Pre-payments:-</span>{" "}
                        Customers may prepay part of the estimated job total. The
                        remaining balance will be collected after service completion.
                        If the final cost is less than the prepayment or estimate, the
                        difference will be refunded to the customer.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>13.5&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Expenses:-</span> Each
                        party (you and Oyo) is responsible for your own expenses
                        unless otherwise stated in this Agreement.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>13.6&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Last-Minute Cancellations / Customer Not Available:-
                        </span>{" "}
                        If a job is cancelled at the last minute, or the Customer is
                        not available at pickup, the Mover may receive 50% of the
                        1-hour cancellation fee collected by OYO. This payment only
                        applies when OYO has received the cancellation fee and the
                        cancellation or no-show is confirmed by OYO.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="breakdown" className="term-hang">
                  <h5 className="text-uppercase mt-3 term-hang-heading">
                    <span className="term-hang-num">14.&nbsp;</span>
                    <span className="term-hang-title">
                      TRUCK BREAKDOWN &amp; ACCIDENTS
                    </span>
                  </h5>
                  <div className="points term-hang-points">
                    <p className="text-justify d-flex mb-2 font-weight-bold">
                      <span>14.1&nbsp;</span>
                      <span className="font-weight-bold">
                        Truck Breakdown – Before Job
                      </span>
                    </p>
                    <div className="points" style={{ marginLeft: "13px" }}>
                      <p className="text-justify d-flex mb-2">
                        <span>a)&nbsp;</span>
                        <span>
                          Cancel any jobs that may be affected during truck repair.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>b)&nbsp;</span>
                        <span>
                          Open the app and Press Truck Breakdown Button in Safety
                          Shield.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>c)&nbsp;</span>
                        <span>
                          Once truck is fixed, update Breakdown Status in app to
                          resume receiving new jobs.
                        </span>
                      </p>
                    </div>

                    <p className="text-justify d-flex mb-2 font-weight-bold">
                      <span>14.2&nbsp;</span>
                      <span className="font-weight-bold">
                        Truck Breakdown – During Job
                      </span>
                    </p>
                    <div className="points" style={{ marginLeft: "13px" }}>
                      <p className="text-justify d-flex mb-2">
                        <span>a)&nbsp;</span>
                        <span>
                          Report breakdowns via the Safety Toolkit – Truck Breakdown
                          option in the Mover app when it&rsquo;s safe to do so. (This
                          will also Pause the job timer.)
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>b)&nbsp;</span>
                        <span>Notify the Customer and Oyo Support.</span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>c)&nbsp;</span>
                        <span>
                          Contact your mechanic or a mobile mechanic to fix the truck.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>d)&nbsp;</span>
                        <span>
                          If truck cannot be repaired on site, contact Driver
                          Support.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>e)&nbsp;</span>
                        <span>
                          Oyo will try to arrange a replacement truck to transfer
                          contents and complete the job.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>f)&nbsp;</span>
                        <span>
                          Where required, the original mover team must assist with the
                          safe handover of the customer belongings to the replacement
                          team.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>g)&nbsp;</span>
                        <span>
                          <span className="font-weight-bold">Payment:-</span> You may
                          claim payment only for the time you actively worked. Any
                          unloading, reloading or transfer or completion work performed
                          by replacement team may be deducted from your payout.
                        </span>
                      </p>
                    </div>

                    <p className="text-justify d-flex mb-2 font-weight-bold">
                      <span>14.3&nbsp;</span>
                      <span className="font-weight-bold">
                        Accidents – During Job
                      </span>
                    </p>
                    <div className="points" style={{ marginLeft: "13px" }}>
                      <p className="text-justify d-flex mb-2">
                        <span>a)&nbsp;</span>
                        <span>
                          Ensure the safety of all parties and contact police or
                          paramedics if required.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>b)&nbsp;</span>
                        <span>
                          When possible, report the incident to Driver Support, provide
                          full details of the event.
                        </span>
                      </p>
                    </div>

                    <p className="text-justify d-flex mb-2 font-weight-bold">
                      <span className="font-weight-bold">NOTE:-</span>{" "}
                      <span>
                        Oyo acts only as a mediator during breakdowns or accidents
                        and is not liable for damages, losses, or delays resulting from
                        these incidents.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="promotions" className="term-hang">
                  <h5 className="text-uppercase mt-3 term-hang-heading">
                    <span className="term-hang-num">15.&nbsp;</span>
                    <span className="term-hang-title">
                      PROMOTIONS &amp; DISCOUNTS
                    </span>
                  </h5>
                  <div className="points term-hang-points">
                    <p className="text-justify d-flex mb-2">
                      <span>15.1&nbsp;</span>
                      <span>
                        Oyo may offer promotional codes or discounts to customers
                        through the Oyo Platform to encourage bookings. These discounts
                        reduce the total price charged to the customer.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>15.2&nbsp;</span>
                      <span>
                        Any promotion or discount applied by a customer will be
                        processed automatically by the Oyo Platform. Movers also have
                        option to add discount codes during billing.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>15.3&nbsp;</span>
                      <span>
                        Your payout is based on the actual charge received after
                        discounts applied. Movers will not receive additional
                        compensation for the discounted portion of a charged amount.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>15.4&nbsp;</span>
                      <span>
                        Oyo retains sole discretion to determine the timing and
                        location of promotions, the value and type of discounts offered,
                        and which customers are eligible.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>15.5&nbsp;</span>
                      <span>
                        Oyo is not responsible for any lost earnings or income due to
                        promotions or discounts offered through the Platform.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="ourliability" className="term-hang">
                  <h5 className="text-uppercase mt-3 term-hang-heading">
                    <span className="term-hang-num">16.&nbsp;</span>
                    <span className="term-hang-title">OUR LIABILITY</span>
                  </h5>
                  <p className="text-justify mb-2 term-hang-body">
                    <span className="term-hang-body-text">
                      Oyo Movers disclaims all liability for any loss or damage
                      (including actual, special, direct, indirect, incidental, and
                      consequential) of any kind or nature, whether known or
                      unknown, suspected or unsuspected, disclosed or undisclosed.
                      This includes, without limitation, any loss or damage arising
                      from inaccurate information provided, the suitability or
                      fitness of goods or services, or in any way connected with:
                    </span>
                  </p>
                  <div className="points term-hang-points">
                    <div className="points" style={{ marginLeft: "13px" }}>
                      <p className="text-justify d-flex mb-2">
                        <span>a)&nbsp;</span>
                        <span>
                          The availability or unavailability of the Platform or
                          Services, or any suspension of your access.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>b)&nbsp;</span>
                        <span>
                          Any transaction or dispute between Customers and Movers,
                          including performance, non-performance, payments, or liability
                          under a Removal Contract.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>c)&nbsp;</span>
                        <span>
                          Any dealings between Customers and third parties; or
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>d)&nbsp;</span>
                        <span>
                          Any damage to property or personal injury caused or incurred
                          by any User.
                        </span>
                      </p>
                    </div>
                    <p className="text-justify d-flex mb-2">
                      <span></span>
                      <span>
                        To the fullest extent permitted by law (including the
                        Australian Consumer Law), Oyo is not liable for indirect,
                        incidental, or consequential loss, including loss of profits,
                        savings, or business opportunities.
                      </span>
                    </p>

                    <p className="text-justify d-flex mb-2">
                      <span></span>
                      <span>
                        <span className="font-weight-bold">Liability Cap:-</span>{" "}
                        Oyo&rsquo;s total liability to any User of any Service is
                        limited to the greater of:
                      </span>
                    </p>
                    <div className="points" style={{ marginLeft: "13px" }}>
                      <p className="text-justify d-flex mb-2">
                        <span>a)&nbsp;</span>
                        <span>
                          the total amount of payments made by that User to Oyo during
                          the three (3) months prior to the incident giving rise to
                          liability, or
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>b)&nbsp;</span>
                        <span>max $50, whichever is greater.</span>
                      </p>
                    </div>

                    <p className="text-justify d-flex mb-2">
                      <span></span>
                      <span>
                        Oyo will not be liable for any delay or failure to perform
                        obligations under these Terms where such delay or failure is
                        caused by events outside our reasonable control, including (but
                        not limited to) natural disasters, government actions, war,
                        fire, flood, explosion, or civil unrest.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="yourliability" className="term-hang">
                  <h5 className="text-uppercase mt-3 term-hang-heading">
                    <span className="term-hang-num">17.&nbsp;</span>
                    <span className="term-hang-title">
                      YOUR LIABILITY AND INDEMNITY
                    </span>
                  </h5>
                  <p className="text-justify mb-2 term-hang-body">
                    <span className="term-hang-body-text">
                      To the maximum extent permitted by law, you agree to indemnify
                      and hold harmless Oyo Movers, its officers, directors,
                      employees, agents, and any Users from all actions, claims,
                      proceedings, costs, damages, losses, and expenses (including
                      legal fees) arising out of, or in any way connected with:
                    </span>
                  </p>
                  <div className="points term-hang-points">
                    <div className="points" style={{ marginLeft: "13px" }}>
                      <p className="text-justify d-flex mb-2">
                        <span>a)&nbsp;</span>
                        <span>
                          Your use or misuse of the Platform or Services.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>b)&nbsp;</span>
                        <span>Breaching this Agreement.</span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>c)&nbsp;</span>
                        <span>
                          Cancellation, leaving jobs unfinished or breaching of any job
                          or contract.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>d)&nbsp;</span>
                        <span>Breaking any applicable laws.</span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>e)&nbsp;</span>
                        <span>
                          Damage to third-party property or personal injury caused by
                          your acts or omissions in performing Mover Services.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>f)&nbsp;</span>
                        <span>
                          Sharing or disclosure of Oyo&rsquo;s confidential
                          information.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>g)&nbsp;</span>
                        <span>
                          Any negative public reviews of Oyo Movers, the Platform, or
                          yourself resulting from your acts or omissions in performing
                          Mover Services; or
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>h)&nbsp;</span>
                        <span>
                          Any losses, costs, or damages that Oyo suffers because of your
                          actions or omissions.
                        </span>
                      </p>
                    </div>

                    <p className="text-justify d-flex mb-2">
                      <span></span>
                      <span>
                        This indemnity survives the termination, suspension, or expiry of
                        this Agreement and continues to apply regardless of whether you
                        remain a registered Service Provider on the Oyo Platform.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="tax" className="term-hang">
                  <h5 className="text-uppercase mt-3 term-hang-heading">
                    <span className="term-hang-num">18.&nbsp;</span>
                    <span className="term-hang-title">TAX, GST AND RCTI</span>
                  </h5>
                  <p className="text-justify mb-2 term-hang-body">
                    <span className="term-hang-body-text">
                      We expect all of our partners to meet their own tax obligations
                      like everyone else. You are solely responsible for declaring your
                      earnings and paying all taxes on your earnings from Oyo services.
                      You may also be able to claim your OYO Movers related expenses
                      (as tax deductions) through your tax return. OYO does not
                      withhold or file any tax on your behalf. You will be solely
                      responsible for the tax withholding or payment in connection with
                      the fees paid to you by Oyo.
                    </span>
                  </p>
                  <div className="points term-hang-points">
                    <p className="text-justify d-flex mb-2">
                      <span>18.1&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">ABN &amp; GST Status:-</span>{" "}
                        You must have a valid ABN (registered as Sole Trader or Company)
                        and keep your business and GST details up to date. You must notify
                        OYO Movers if your GST status changes.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>18.2&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          GST Registered Service Providers:-
                        </span>{" "}
                        You authorise OYO Movers to issue Recipient Created Tax Invoices
                        (RCTIs) on your behalf for services completed through the OYO
                        platform. You agree not to issue your own tax invoices to customers
                        for OYO jobs. The issue of RCTI&rsquo;s is governed by OYO&rsquo;s
                        separate RCTI terms, which form part of these terms.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>18.3&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Non-GST Registered Service Providers:-
                        </span>{" "}
                        OYO Movers will not issue RCTIs to you. OYO may provide payout
                        statement, payment summaries or other payment records instead.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span></span>
                      <span>
                        You are responsible for all tax obligations, including GST and BAS
                        reporting, and you indemnify OYO Movers against any claims,
                        penalties, or liabilities arising from incorrect GST details or
                        failure to meet your tax obligations.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span></span>
                      <span>
                        For questions regarding GST, Payment Summaries and claim eligible
                        business expenses, it&rsquo;s best to consult with your accountant
                        / tax advisor.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="fraud" className="term-hang">
                  <h5 className="text-uppercase mt-3 term-hang-heading">
                    <span className="term-hang-num">19.&nbsp;</span>
                    <span className="term-hang-title">FRAUD</span>
                  </h5>
                  <p className="text-justify mb-2 term-hang-body">
                    <span className="term-hang-body-text">
                      OYO does not tolerate fraud or deceptive behavior and takes all
                      reasonable steps to prevent it. Fraud means any action taken to
                      change, influence, or bypass the normal rules or functionality of
                      the OYO Platform. Fraud includes, but is not limited to:
                    </span>
                  </p>
                  <div className="points term-hang-points">
                    <div className="points" style={{ marginLeft: "13px" }}>
                      <p className="text-justify d-flex mb-2">
                        <span>a)&nbsp;</span>
                        <span>Using multiple accounts for the same person or service.</span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>b)&nbsp;</span>
                        <span>Sharing your Account with another individual.</span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>c)&nbsp;</span>
                        <span>
                          Using any method to change or disguise your device location
                          (for example, GPS spoofing).
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>d)&nbsp;</span>
                        <span>
                          Misrepresenting your vehicle, equipment, identity, or details to
                          gain access to jobs.
                        </span>
                      </p>
                    </div>
                    <p className="text-justify d-flex mb-2">
                      <span></span>
                      <span>
                        OYO reserves the right to inspect, monitor, review, and investigate
                        activity on the platform, including the use of technical tools such
                        as GPS tracking, to detect fraud or misuse.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span></span>
                      <span>
                        If fraud or misconduct is detected, OYO may suspend or terminate
                        your Account and take further action where necessary.
                      </span>
                    </p>
                    <p className="text-justify font-weight-bold mb-2">
                      <span className="font-weight-bold">NOTE:-</span>{" "}
                      <span className="font-weight-bold">
                        If you become aware of any breach of these Terms, you must report
                        it to OYO immediately.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="suspension" className="term-hang">
                  <h5 className="text-uppercase mt-3 term-hang-heading">
                    <span className="term-hang-num">20.&nbsp;</span>
                    <span className="term-hang-title">
                      WARNINGS &amp; SUSPENSION
                    </span>
                  </h5>
                  <p className="text-justify mb-2 term-hang-body">
                    <span className="term-hang-body-text">
                      OYO maintains high service and safety standards. If you breach
                      these Terms or the Contractor Agreement, OYO may issue a warning
                      which leads to Suspension or Deactivation of your account. OYO uses
                      a three-level warning system:
                    </span>
                  </p>
                  <div className="points term-hang-points">
                    <p className="text-justify d-flex mb-2 font-weight-bold">
                      <span>20.1&nbsp;</span>
                      <span className="font-weight-bold">
                        Level 1 – Serious Misconduct
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span></span>
                      <span>
                        This includes unlawful or dishonest behavior (e.g. fraud). A Grade 1
                        warning may result in immediate deactivation of your Account.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2 font-weight-bold">
                      <span>20.2&nbsp;</span>
                      <span className="font-weight-bold">
                        Level 2 – Professional Misconduct
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span></span>
                      <span>This includes:</span>
                    </p>
                    <div className="points" style={{ marginLeft: "13px" }}>
                      <p className="text-justify d-flex mb-2">
                        <span>a)&nbsp;</span>
                        <span>Breaching road traffic law or applicable law.</span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>b)&nbsp;</span>
                        <span>Unsafe behaviour during a job.</span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>c)&nbsp;</span>
                        <span>Repeated failure to follow Platform procedures.</span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>d)&nbsp;</span>
                        <span>
                          Not maintaining required licenses or insurance.
                        </span>
                      </p>
                    </div>
                    <p className="text-justify d-flex mb-2">
                      <span></span>
                      <span>
                        If you receive three (3) Grade 2 warnings, OYO may remove your
                        access to the Platform. Grade 2 warnings remain on your profile.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2 font-weight-bold">
                      <span>20.3&nbsp;</span>
                      <span className="font-weight-bold">
                        Level 3 – Service Issues
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span></span>
                      <span>This includes:</span>
                    </p>
                    <div className="points" style={{ marginLeft: "13px" }}>
                      <p className="text-justify d-flex mb-2">
                        <span>a)&nbsp;</span>
                        <span>Poor customer service.</span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>b)&nbsp;</span>
                        <span>
                          Leave a job unfinished without a valid reason or cancel job at
                          last min.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>c)&nbsp;</span>
                        <span>Failure to follow job instructions.</span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>d)&nbsp;</span>
                        <span>Minor breaches of Platform standards.</span>
                      </p>
                    </div>
                    <p className="text-justify d-flex mb-2">
                      <span></span>
                      <span>
                        Grade 3 warnings expire after six (6) months. Your Account may be
                        deactivated after three (3) active (non-expired) Grade 3 warnings.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2 font-weight-bold">
                      <span>20.4&nbsp;</span>
                      <span className="font-weight-bold">Appeals</span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span></span>
                      <span>
                        You may appeal a warning within five (5) business days. OYO will
                        review the matter before making a final decision.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2 font-weight-bold">
                      <span>20.5&nbsp;</span>
                      <span className="font-weight-bold">
                        Consequences of Suspension:-
                      </span>
                    </p>
                    <div className="points" style={{ marginLeft: "13px" }}>
                      <p className="text-justify d-flex mb-2">
                        <span>a)&nbsp;</span>
                        <span>
                          Your services will no longer be available / promoted on the Oyo
                          platform.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>b)&nbsp;</span>
                        <span>
                          Customers will not be able to book or use your services.
                        </span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>c)&nbsp;</span>
                        <span>
                          If you are an Industry Professional, you will not be able to
                          invite anyone to join the platform during the suspension.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div id="modification" className="term-hang">
                  <h5 className="text-uppercase mt-3 term-hang-heading">
                    <span className="term-hang-num">21.&nbsp;</span>
                    <span className="term-hang-title">MODIFICATION OF TERMS</span>
                  </h5>
                  <p className="text-justify mb-2 term-hang-body">
                    <span className="term-hang-body-text">
                      We reserve the right to update these Terms, fees, or policies at
                      any time, in its sole discretion. If we make changes, we will notify
                      you through the Services or by other means. We encourage you to
                      review these Terms periodically to stay informed about our practices.
                      By continuing to use the Oyo Movers platform, you agree to any
                      changes.
                    </span>
                  </p>
                </div>

                <div id="governance" className="term-hang">
                  <h5 className="text-uppercase mt-3 term-hang-heading">
                    <span className="term-hang-num">22.&nbsp;


                    </span>
                    <span className="term-hang-title">
                      GOVERNANCE AND JURISDICTION
                    </span>
                  </h5>
                  <p className="text-justify mb-2 term-hang-body">
                    <span className="term-hang-body-text">
                      These Terms are governed by the laws of Victoria, Australia, and
                      you submit to the non-exclusive jurisdiction of the courts of that
                      State.
                    </span>
                  </p>
                </div>

                <div id="contactus" className="term-hang term-hang--no-num">
                  <h5 className="text-uppercase mt-3 term-hang-heading">
                    <span className="term-hang-title">CONTACT INFORMATION</span>
                  </h5>
                  <div className="points term-hang-points">
                    <p className="text-justify mb-2">
                      If you have any questions or concerns, please contact us at:
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
                        style={{ textDecoration: "underline", color: "#007bff" }}
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
