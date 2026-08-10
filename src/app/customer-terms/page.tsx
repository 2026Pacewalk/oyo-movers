import React from "react";
import Link from "next/link";
import Footer from "@/components/WebAppWrapper/Footer";
import "@/styles/legal.scss";
import { FaEnvelope, FaPhoneVolume } from "react-icons/fa6";
export default function CustomerTermsPage() {
  return (
    <div className="legal-page">
      <section id="customer-terms">
        <div className="pt-hero">
          <div className="pt-hero-inner">
            <nav className="pt-crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Legal</span>
              <span>/</span>
              <span>Customer Terms</span>
            </nav>
            <span className="pt-badge">Legal</span>
            <h1 className="pt-title">Customer Terms of Use</h1>
            <div className="divider"></div>
            <p className="pt-hero-sub">
              The terms that apply when you book a move with OYO Movers.
            </p>
          </div>
        </div>
        <div className="container-1">
          <div className="row">

            {/* Table of Contents */}
            <div className="col-md-4 col-lg-4 col-xl-4 col-xxl-3">
              <div className="table-of-contents">
                <span>Table Of Content</span>
                <ul>
                  <li>
                    <Link href="#introduction" className="links">
                      Introduction & Description
                    </Link>
                  </li>
                  <li>
                    <Link href="#payments" className="links">
                      1. Payments
                    </Link>
                  </li>
                  <li>
                    <Link href="#charges" className="links">
                      2. Charges
                    </Link>
                  </li>
                  <li>
                    <Link href="#worktime" className="links">
                      3. Worktime
                    </Link>
                  </li>
                  <li>
                    <Link href="#quotation" className="links">
                      4. Quotation & Estimates
                    </Link>
                  </li>
                  <li>
                    <Link href="#responsibilities" className="links">
                      5. Your Responsibilities
                    </Link>
                  </li>
                  <li>
                    <Link href="#volume" className="links">
                      6. Estimated Volume of Items
                    </Link>
                  </li>
                  <li>
                    <Link href="#additional-movers" className="links">
                      7. Additional Movers
                    </Link>
                  </li>
                  <li>
                    <Link href="#arrival-time" className="links">
                      8. Arrival Time
                    </Link>
                  </li>
                  <li>
                    <Link href="#travel-fee" className="links">
                      9. Travel Fee
                    </Link>
                  </li>
                  <li>
                    <Link href="#discount-codes" className="links">
                      10. Discount Codes
                    </Link>
                  </li>
                  <li>
                    <Link href="#service-providers" className="links">
                      11. Service Providers
                    </Link>
                  </li>
                  <li>
                    <Link href="#service-providers-rights" className="links">
                      12. Service Providers Rights
                    </Link>
                  </li>
                  <li>
                    <Link href="#reviews" className="links">
                      13. Reviews & Feedback
                    </Link>
                  </li>
                  <li>
                    <Link href="#storage" className="links">
                      14. Storage Services
                    </Link>
                  </li>
                  <li>
                    <Link href="#overdue" className="links">
                      15. Overdue Account
                    </Link>
                  </li>
                  <li>
                    <Link href="#contesting" className="links">
                      16. Contesting the Final Bill
                    </Link>
                  </li>
                  <li>
                    <Link href="#walk-through" className="links">
                      17. End of Job Walk Through
                    </Link>
                  </li>
                  <li>
                    <Link href="#breakdown" className="links">
                      18. Breakdown or Accidents
                    </Link>
                  </li>
                  <li>
                    <Link href="#insurance" className="links">
                      19. Insurance
                    </Link>
                  </li>
                  <li>
                    <Link href="#governance" className="links">
                      20. Governance & Jurisdiction
                    </Link>
                  </li>
                  <li>
                    <Link href="#contactus" className="links">
                      21. Contact Information
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
                    <span style={{ fontWeight: "bold", color: "black" }}>Last Updated:</span> 15.02.2026
                  </h6>
                </div>

                <div id="introduction">
                  <h5 className="text-uppercase mt-3">
                    Welcome to OYO! (On-Demand Moving Platform)
                  </h5>
                  <div className="points ">
                    <p className="text-justify mb-2">
                      This Website and its subdomains are owned and operated by
                      Oyo Group Pty Ltd (ABN- 30646236179). By confirming a
                      booking (whether verbally, in writing, or via the oyomovers
                      website or app), you (“Customer”, “User”, “you”) agree to
                      be bound by these Terms of Use.
                    </p>
                    <p className="text-justify mb-2">
                      Please read them carefully before engaging our services.
                    </p>

                    <p className="text-justify normal-heading mb-2 font-weight-bold">
                      These Terms Must be read together with:-
                    </p>
                    <div className="points ">
                      <p className="text-justify d-flex mb-2">
                        <span>•&nbsp;</span>
                        <a href="/platform-terms" style={{ color: "#007bff" }}>
                          Platform Terms and Conditions
                        </a>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>•&nbsp;</span>
                        <a href="/privacy-policy" style={{ color: "#007bff" }}>
                          Privacy Policy
                        </a>
                      </p>
                    </div>
                    <p className="text-justify mb-2">
                      Together, these documents form the legally binding
                      agreement ("Agreement") between{" "}
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        Oyo Group Pty Ltd.
                      </span>{" "}
                      (provider of the platform) and{" "}
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        User
                      </span>{" "}
                      (you as a customer)
                    </p>
                  </div>
                </div>

                <div id="description">
                  <h5 className="text-uppercase mt-3">
                    DESCRIPTION OF SERVICES
                  </h5>
                  <div className="points ">
                    <p className="text-justify mb-2">
                      OYO provides On-Demand Moving Services, Delivery and Junk
                      Removal Services. Our Platform connect users (“Customers”)
                      to the independent contractors (“Service Providers”,
                      “Movers,” or “Helpers”) who can perform the requested
                      services.
                    </p>
                  </div>
                </div>

                <div id="payments">
                  <h5 className="text-uppercase mt-3">1. PAYMENTS</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2">
                      <span>1.1&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Deposit:-</span>A
                        Fifty Dollars (AUD $50) deposit required to secure new
                        booking.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>1.2&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Local Jobs:-</span>
                        Payments are processed before or upon completion of the
                        job.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>1.3&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Long Distance or Interstate Jobs:-
                        </span>
                        Pre-payments of estimated job total is required before
                        commencement and any balance payments upon delivery.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>1.4&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Late Hour Jobs:-
                        </span>
                        Jobs after 5:00pm required pre-payment.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>1.5&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Payment collections:-
                        </span>
                        We collect payments before completion of the job. Should
                        circumstances arise that you are unwilling or unable to
                        pay any due charges, we reserve the right to hold
                        deliveries or items of equivalent value until full
                        payment is received.
                        <i
                          className="text-secondary font-sm"
                          style={{ fontWeight: "400", fontSize: "16px" }}
                        >
                          (see Clauses-14.2 & 15)
                        </i>
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>1.6&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Payment Gateway:-
                        </span>
                        We use <span className="font-weight-bold">Stripe</span>{" "}
                        for Card Payments processing. Stripe is PCI-certified to
                        level-1. (the highest standard in the payment industry).
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>1.7&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Invoices:-</span>Tax
                        invoices will be emailed to you.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="charges">
                  <h5 className="text-uppercase mt-3">2. CHARGES</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2">
                      <span>2.1&nbsp;</span>
                      <span>
                        {" "}
                        <span className="font-weight-bold">
                          Minimum charge:-
                        </span>
                        Only 30 minutes minimum, plus a 30-minute Call-Out
                        Travel Fee)
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>2.2&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Time calculation:-
                        </span>
                        After the first 30 minutes. The Second Half Hour Starts
                        (31-60 minutes). Your move charges are based on (total ½
                        hours) + (½ hour Call-Out Travel) (Any additional costs
                        such as Return Travel Time for long distance moves over
                        20 kms)
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>2.3&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Pool Table/Piano:-
                        </span>
                        One off fee of $150 for heavy lifting and using
                        specialised trolley for moving big items such as Piano,
                        Pool Table, Marble Table, fish Tanks etc.{" "}
                        <span style={{ textDecoration: "underline" }}>
                          Please Note:- If it's not safe, we don't move large
                          and heavy items from stairs.
                        </span>
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>2.4&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Tolls:-</span>charged
                        separately if you choose a toll route.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>2.5&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">GST:-</span>
                        <span style={{ fontWeight: "600" }}>
                          All Prices are GST Inclusive.
                        </span>
                      </span>
                    </p>
                  </div>
                </div>

                <div id="worktime">
                  <h5 className="text-uppercase mt-3">3. WORK TIME</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2">
                      <span style={{ color: "#666" }}>
                        Our chargeable time begins when Movers arrive at pick-up
                        location and ends when job is completed, all vehicles
                        are packed up and payment is processed.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ fontWeight: "600" }}>
                        <span>Please Note:-</span>Waiting delays caused by
                        Customer (e.g., lack of access, unprepared items, last
                        minute packing or payment issues) are billable.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="quotation">
                  <h5 className="text-uppercase mt-3">
                    4. QUOTATION AND ESTIMATES (Price Range)
                  </h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2">
                      <span>4.1&nbsp;</span>
                      <span>
                        When providing a quotation or an estimate, we rely on
                        what information you provide. All times provided to you
                        either verbally or via estimate tool are an ESTIMATE
                        only, as every job is different. (e.g.- "Pack and Move"
                        jobs take more time than "Moving Only" jobs.)
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>4.2&nbsp;</span>
                      <span>
                        Final charges may vary depending on factors such as
                        dismantling/reassembly, access conditions, distance from
                        vehicle to property, or additional items.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>4.3&nbsp;</span>
                      <span>
                        We will ensure that our crew work to the best of their
                        ability and at an efficient pace whilst also ensuring
                        that all items are adequately taken care of.{" "}
                        <span className="font-weight-bold underline">
                          If the job is completed outside of the estimated time
                          or price range on the quote, the client is expected to
                          pay for the job in full and for the entirety of the
                          time worked
                        </span>
                      </span>
                    </p>
                  </div>
                </div>

                <div id="responsibilities">
                  <h5 className="text-uppercase mt-3">
                    5. YOUR RESPONSIBILITIES
                  </h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2">
                      <span>5.1&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Parking:-</span>Make
                        sure adequate parking is provided to park our vehicle.
                        We will park anywhere safe you ask us to do, except
                        clearways. Any Parking fees we pay or fines we receive
                        during your move will be added to your bill. It is
                        always better to arrange parking permit where required.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>5.2&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Ownership:-</span>You
                        must be owner of the Goods or authorised by the owner.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>5.3&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Dangerous Goods:-
                        </span>
                        Goods must not include dangerous, hazardous, or illegal
                        items
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>5.4&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Presence:-</span>You
                        or an adult representative will be present at
                        loading/unloading. (except Store Deliveries).
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>5.5&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          To inform us about the Awkward/Bad access or Heavy
                          items:-
                        </span>{" "}
                        This can include:- narrow stair flights, bad access,
                        long walking distance from parked truck etc. Ensure
                        items will fit into the new property (e.g.- large sofa
                        fit through doors){" "}
                        <span style={{ textDecoration: "underline" }}>
                          Please Note: additional costs may apply due to
                          unforeseen circumstances.
                        </span>
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>5.6&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Liquids:-</span>
                        Appliances and garden tools (e.g. washing machines,
                        mowers) must be drained and free of liquids or fuels.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>5.7&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Goods Left Behind:-
                        </span>
                        Ensure no items are left behind or taken in error.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>5.8&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Arrange a Specialist:-
                        </span>
                        Our service providers are not insured or trained to
                        perform tasks such as removing doors or windows,
                        disconnecting whitegoods, or handling property fittings
                        that require licensed trades (e.g., plumbers or
                        carpenters). If you request assistance with such tasks,
                        you accept full responsibility for any loss or damage
                        and agree to indemnify Oyo and its service providers
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>5.9&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          During the move:-
                        </span>
                        As we don't take an itemised inventory during the move,
                        we will act on your instructions at each location.
                        Please show our team everything that you need to be
                        moved when they arrive at the pickup address. Sometimes
                        there is more stuff that we discussed during the
                        booking, we will always try to fit it in for you, but we
                        don't always have time or space to do more than we were
                        booked for. If that is the case, we will try to discuss
                        alternative options to get it all done. You need to tell
                        us about any fragile goods or any special handling
                        instructions.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="volume">
                  <h5 className="text-uppercase mt-3">
                    6. ESTIMATED VOLUME OF ITEMS (m³)
                  </h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2">
                      <span>
                        Oyo provides different ways to estimate your move size:
                      </span>
                    </p>

                    <p className="text-justify d-flex mb-2">
                      <span>6.1&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Quick quote calculator:-
                        </span>
                        a basic estimate of size based on room count and
                        furnished level.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>6.2&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">Exact Volume:-</span>
                        where you already know cubic meter required or vehicle.
                        Generally, only applicable if you've moved recently
                        (e.g. out of storage) or have industry expertise.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>6.3&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Phone Estimate:-
                        </span>
                        O ur staff make an estimate based on your description of
                        goods.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>6.4&nbsp;</span>
                      <span>
                        {" "}
                        <span className="font-weight-bold">
                          Photo/Video Estimate:-
                        </span>
                        based on images you provide.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="additional-movers">
                  <h5 className="text-uppercase mt-3">7. ADDITIONAL MOVERS</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2">
                      <span>7.1&nbsp;</span>
                      <span>
                        If your move requires resources beyond the original job
                        scope or estimate (such as an additional truck or extra
                        movers required),{" "}
                        <span className="font-weight-bold">
                          a separate booking must be made, and these resources
                          will be billed separately.
                        </span>
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>7.2&nbsp;</span>
                      <span>
                        Engaging extra resources may speed-up your move and
                        reduce overall price and worktime.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>7.3&nbsp;</span>
                      <span>
                        All additional resources are subject to availability at
                        the time of request.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>7.4&nbsp;</span>
                      <span>
                        If you choose to continue with the originally allocated
                        resources, the job may take longer, and you need to
                        prioritize which items to move first.{" "}
                        <span className="font-weight-bold">
                          NOTE:- Where no additional resources are provided, you
                          will only be billed for the services included in the
                          original job scope.
                        </span>
                      </span>
                    </p>
                  </div>
                </div>

                <div id="arrival-time">
                  <h5 className="text-uppercase mt-3">8. ARRIVAL TIME</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2">
                      <span>
                        <span className="font-weight-bold">
                          Advance Bookings:
                        </span>{" "}
                        OYO will provide you reminders, updates and movers
                        details
                      </span>
                    </p>
                    <ul>
                      <li>
                        <span className="font-weight-bold">
                          06:00-08:00 am -
                        </span>
                        First job of the day.
                      </li>
                      <li>
                        <span className="font-weight-bold">
                          10:00-01:00 pm -
                        </span>
                        Mid-Day Slot
                      </li>
                      <li>
                        <span className="font-weight-bold">
                          01:00-04:00 pm -
                        </span>
                        Evening Slot
                      </li>
                    </ul>
                    <p className="text-justify d-flex mb-2">
                      <span>
                        <span className="font-weight-bold">
                          ASAP (Last Minute Bookings):-
                        </span>{" "}
                        Jobs are allocated to nearest available mover. Once
                        assigned, mover details will be provided to contact them
                        directly.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>
                        <span style={{ textDecoration: "underline" }}>
                          Please note:-
                        </span>{" "}
                        For last minute booking movers may arrive within 30
                        minutes or take longer. Arrival times are not guarantee
                        and may vary on traffic, availability and jobs before.
                        You'll get status updates, reminders and a call before
                        arrival time.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="travel-fee">
                  <h5 className="text-uppercase mt-3">9. TRAVEL FEE</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2">
                      <span>9.1&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Callout Travel:-
                        </span>
                        30 minutes of Travel Fee (Callout) applies to all Jobs,
                        which also cover fuel costs.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>9.2&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Back To Base Travel:-
                        </span>
                        Right now, we are not charging any back to base travel
                        for jobs upto 20 kms from Melbourne CBD. All jobs
                        outside this area will incur a Back to Base travel time.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>9.3&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Here are some examples:-
                        </span>
                      </span>
                    </p>
                    <ul style={{ marginLeft: "36px" }}>
                      <p>
                        {" "}
                        <span className="font-weight-bold">a)</span>
                        <span className="font-weight-bold">
                          Melbourne, VIC:-
                        </span>
                        Box Hill, VIC (NO back to base time)
                      </p>
                      <p>
                        {" "}
                        <span className="font-weight-bold">b)</span>
                        <span className="font-weight-bold">
                          Melbourne, VIC:-
                        </span>
                        Geelong, VIC (60-minute back to base time)
                      </p>
                    </ul>
                    <p className="text-justify d-flex mb-2">
                      <span>9.4&nbsp;</span>
                      <span>
                        We use Google Maps to determine the optimal route.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="discount-codes">
                  <h5 className="text-uppercase mt-3">10. DISCOUNT CODES</h5>
                  <div className="points padd ">
                    <p className="text-justify d-flex mb-2">
                      <span>10.1&nbsp;</span>
                      <span>
                        Only one discount code or voucher can be applied per
                        booking.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>10.2&nbsp;</span>
                      <span>
                        Vouchers & discount codes do not apply on Sundays,
                        Public holidays & Peak Times.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="service-providers">
                  <h5 className="text-uppercase mt-3">11. SERVICE PROVIDERS</h5>
                  <div className="points padd ">
                    <p className="text-justify d-flex mb-2">
                      <span>11.1&nbsp;</span>
                      <span>
                        oyomovers facilitates the{" "}
                        <span className="font-weight-bold">
                          booking, dispatch, and management
                        </span>{" "}
                        of removal jobs on behalf of a network of trusted
                        third-party businesses, each operating under their own
                        ABN.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>11.2&nbsp;</span>
                      <span>
                        oyomovers facilitates{" "}
                        <span className="font-weight-bold">
                          booking, dispatch, and management
                        </span>{" "}
                        of jobs on behalf of a network of trusted third-party
                        businesses (services providers).
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>11.3&nbsp;</span>
                      <span>
                        All Movers on our platform are operating as independent
                        businesses with their own ABN.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>11.4&nbsp;</span>
                      <span>
                        Oyo requires all Service Providers to provide a valid{" "}
                        <span className="font-weight-bold">
                          Certificate of Currency
                        </span>{" "}
                        showing they hold{" "}
                        <span className="font-weight-bold">
                          Public Liability insurance
                        </span>{" "}
                        with a minimum value of $5,000,000 (5 Million AUD) when
                        joining the platform and to submit a new certificate{" "}
                        <span className="font-weight-bold">annually</span> .
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>11.5&nbsp;</span>
                      <span>
                        Service Providers must maintain a{" "}
                        <span className="font-weight-bold">
                          minimum 4-star rating
                        </span>{" "}
                        to remain on Oyo platform.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="service-providers-rights">
                  <h5 className="text-uppercase mt-3">
                    12. SERVICE PROVIDERS RIGHTS
                  </h5>
                  <div className="points padd ">
                    <p className="text-justify d-flex mb-2">
                      <span style={{ fontWeight: "600" }}>
                        Movers may, at their discretion, refuse, delay, or
                        impose conditions on a job where:
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>12.1&nbsp;</span>
                      <span>
                        Job is unsafe or falls outside quoted scope of work.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>12.2&nbsp;</span>
                      <span>
                        An item poses high risk of damage (in such cases, the
                        Customer may proceed at their own risk).
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>12.3&nbsp;</span>
                      <span>
                        If a job site is hazardous, movers may refuse the job
                        and vacate immediately.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>12.4&nbsp;</span>
                      <span>
                        Additional manpower, vehicles or trips are required to
                        complete the job. (These will proceed only with the
                        Customer's agreement to cover extra costs).
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>12.5&nbsp;</span>
                      <span>
                        If there is a significant risk of damage, Movers may
                        require the Customer to sign a waiver before continuing.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="reviews">
                  <h5 className="text-uppercase mt-3">
                    13. REVIEWS AND FEEDBACK
                  </h5>
                  <div className="points padd ">
                    <p className="text-justify d-flex mb-2">
                      <span>13.1&nbsp;</span>
                      <span>
                        All Movers are reviewed independently by Customers
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>13.2&nbsp;</span>
                      <span>Movers must maintain a minimum 4-star rating.</span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>13.3&nbsp;</span>
                      <span>
                        We work only with top-rated Movers, if any issues arise,
                        please share your feedback and contact our support team.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>13.4&nbsp;</span>
                      <span>
                        After your move is complete, you may rate and review
                        your Mover.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>13.5&nbsp;</span>
                      <span>
                        Where you have a negative experience with a Mover, You
                        may request not to be allocated to a mover/helper again
                        by contacting us.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>13.6&nbsp;</span>
                      <span>
                        Your feedback helps us monitor service quality and guide
                        other Customers in choosing reliable Movers.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>13.7&nbsp;</span>
                      <span>
                        Any illegal or unethical behavior should be reported
                        immediately.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>13.8&nbsp;</span>
                      <span>
                        While we value your feedback, please note that Movers
                        are independent providers and are solely responsible for
                        their services. Where needed, we may pass your concerns
                        (such as safety or quality issues) to the Mover to help
                        resolve the matter.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>13.9&nbsp;</span>
                      <span>
                        To assist with any concern, complaint, or claim,
                        Customers must provide requested details and supporting
                        information as soon as possible after the service
                      </span>
                    </p>
                  </div>
                </div>

                <div id="storage">
                  <h5 className="text-uppercase mt-3">14. STORAGE SERVICES</h5>
                  <div className="points padd ">
                    <p className="text-justify d-flex mb-2">
                      <span>
                        We Use third-party companies for both{" "}
                        {/* <span className="font-weight-bold"> */}
                        Short Term Storage
                        {/* </span>{" "} */}
                        and {/* <span className="font-weight-bold"> */}
                        Long-Term Storage
                        {/* </span>{" "} */}
                        services for all our clients/jobs.
                      </span>
                    </p>

                    <p className="text-justify d-flex mb-2">
                      <span>14.1&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Third Party Storage Companies:-
                        </span>
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span></span>
                      <span style={{ marginLeft: "16px" }}>
                        Such storage services shall be charged separately and
                        subject to the terms and conditions of that Company's
                        storage agreement. The Customer is encouraged to
                        purchase additional insurance coverage for high-value
                        items in storage.
                      </span>
                    </p>

                    <p className="text-justify d-flex mb-2">
                      <span>14.2&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Storage of Undelivered Goods
                        </span>{" "}
                        <i
                          className="text-secondary font-sm"
                          style={{ fontWeight: "400", fontSize: "16px" }}
                        >
                          (Ref:- Clause - 1.5 & 15 )
                        </i>
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span></span>
                      <span style={{ marginLeft: "16px" }}>
                        If goods cannot be delivered or unloaded due to reasons
                        beyond our control (including non-payment), they may be
                        moved to a storage partner or our facility without prior
                        approval. Customers will be notified where possible and
                        are responsible for all additional storage and delivery
                        charges. Goods will only be released once outstanding
                        charges are paid. If charges remain unpaid after 28
                        days, the goods may be sold or disposed of to recover
                        costs, without further notice. Any amount received on
                        such disposal shall be first adjusted towards the
                        outstanding charges of the customer.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="overdue">
                  <h5 className="text-uppercase mt-3">
                    15. OVERDUE ACCOUNTS{" "}
                    <i
                      className="text-secondary font-sm"
                      style={{
                        fontWeight: "400",
                        fontSize: "16px",
                        textTransform: "none",
                      }}
                    >
                      (Ref:- Clause - 1.5 & 14.2)
                    </i>
                  </h5>
                  <div className="points padd ">
                    <p className="text-justify d-flex mb-2">
                      <span>15.1&nbsp;</span>
                      <span>
                        If an account is overdue, Oyo Group may refer it to a
                        debt collection agency. All costs charged by the agency,
                        as well as any legal costs incurred by Oyo Group on an
                        indemnity basis, will be added to the account.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>15.2&nbsp;</span>
                      <span>
                        Invoices are payable on the date of issue. Payment
                        should be remitted to{" "}
                        <a
                          href="mailto:payments@oyomovers.com.au"
                          style={{ textDecoration: "underline" }}
                        >
                          payments@oyomovers.com.au
                        </a>
                        . Late payments incur a fee of $50 per 7 days from the
                        invoice date.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>15.3&nbsp;</span>
                      <span>
                        Outstanding accounts accrue interest monthly at the
                        General Interest Charge rate. Interest compounds on the
                        total outstanding balance at the end of each month.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>15.4&nbsp;</span>
                      <span>
                        If an invoice remains unpaid for an extended period, Oyo
                        Group may refer the matter to the Victorian Civil and
                        Administrative Tribunal (VCAT). An administration fee of
                        upto $900, plus any applicable VCAT fees, may apply at
                        Oyo Group's discretion.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="contesting">
                  <h5 className="text-uppercase mt-3">
                    16. CONTESTING THE FINAL BILL
                  </h5>
                  <div className="points padd ">
                    <p className="text-justify d-flex mb-2">
                      <span>16.1&nbsp;</span>
                      <span>
                        If for whatever reason, the final bill is disputed. Oyo
                        will review and adjust any administrative errors.
                        Disputes about time worked or other matters do not pause
                        billing—the crew remains on the clock until payment is
                        made in full. Our Service Providers reserves the right
                        to take payment between 30-60 minutes prior to unloading
                        or completion of any job.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>16.2&nbsp;</span>
                      <span>
                        After 5:00pm all jobs must be prepaid based on a
                        reasonable estimate of remaining Job time. Where the
                        payment taken on the day is insufficient, any shortfall
                        must be paid the next business day, and any overpayment
                        will be refunded the next business day.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>16.3&nbsp;</span>
                      <span>
                        Any outstanding issues can then be escalated to our
                        support team who will then assess the situation and come
                        to an amicable resolution based on the circumstances of
                        the job. We have a dedicated support team that can fast
                        track your query and resolve it.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>16.4&nbsp;</span>
                      <span>
                        Full payment is still required even where damages are
                        reported. Please note that, option for repair or claims
                        may be provided after payment.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>16.5&nbsp;</span>
                      <span>
                        We will not initiate any claim if the payment is not
                        made in full.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>
                        <span className="font-weight-bold">Helpful Note:</span>{" "}
                        "If any issue comes up, we suggest trying to resolve it
                        directly with your movers on the spot. If it can't be
                        sorted, our support team is always here to help."
                      </span>
                    </p>
                  </div>
                </div>

                <div id="walk-through">
                  <h5 className="text-uppercase mt-3">
                    17. END OF JOB WALK THROUGH
                  </h5>
                  <div className="points padd ">
                    <p className="text-justify d-flex mb-2">
                      <span style={{ fontWeight: "500" }}>
                        Upon completion of the move and prior to signing off on
                        the job, we highly recommend that you do a walk-through
                        of the property. Any perceived issues on the job, or
                        damages will be photographed and recorded by the crew
                        and shared with our support staff via Movers App. All
                        damages must be reported before movers leave the
                        property to avoid any confusion. Signing confirms the
                        job is completed to satisfaction.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="breakdown">
                  <h5 className="text-uppercase mt-3">
                    18. VEHICLE BREAK-DOWN OR ACCIDENTS
                  </h5>
                  <div className="points padd ">
                    <p className="text-justify d-flex mb-2">
                      <span style={{ fontWeight: "500" }}>
                        {" "}
                        We understand that unexpected events such as vehicle
                        breakdowns or accidents may occur during a job. Please
                        note that the Oyo Platform acts solely as a facilitator
                        between you and the service provider. Oyo is not
                        responsible for any delays, damages, or losses resulting
                        from such incidents. However, we will make every
                        reasonable effort to support you and help minimize
                        disruption.
                      </span>
                    </p>

                    <p className="text-justify d-flex mb-2">
                      <span>18.1&nbsp;</span>
                      <span className="font-weight-bold">
                        Truck Breakdown -<span> Before the Job Starts</span>
                      </span>
                    </p>
                    <ul style={{ marginLeft: "48px" }}>
                      <p>
                        <span>a)</span> If a truck breaks down before your
                        scheduled move, Oyo will make reasonable efforts to find
                        the nearest available team and reassign your job to them
                      </p>
                      <p>
                        <span>b)</span> We will share the new team’s details
                        with you once the allocation is confirmed
                      </p>
                      <p>
                        <span>c)</span> If no replacement team is available, you
                        may choose to reschedule or cancel the booking without
                        penalty.
                      </p>
                    </ul>

                    <p className="text-justify d-flex mb-2">
                      <span>18.2&nbsp;</span>
                      <span className="font-weight-bold">
                        Truck Breakdown -<span> During the Job</span>
                      </span>
                    </p>
                    <ul style={{ marginLeft: "48px" }}>
                      <p>
                        <span>a)</span> If a truck breaks down during your move,
                        the Mover may attempt to repair the issue on-site (e.g.,
                        with a mobile mechanic).
                      </p>
                      <p>
                        <span>b)</span> If the vehicle cannot be fixed promptly,
                        Oyo will assist in arranging a replacement vehicle to
                        continue and complete your move as soon as possible.
                      </p>
                      <p>
                        <span>c)</span> You will only be charged for the actual
                        time worked. Any waiting time or duplicate work (such as
                        reloading due to the breakdown) will not be billed.
                      </p>
                    </ul>

                    <p className="text-justify d-flex mb-2">
                      <span>18.3&nbsp;</span>
                      <span className="font-weight-bold">
                        ACCIDENTS<span> </span>
                      </span>
                    </p>
                    <ul style={{ marginLeft: "48px" }}>
                      <p>
                        <span>a)</span> If an accident occurs and the job cannot
                        be completed, we will work with you to reschedule or
                        arrange alternative support.
                      </p>
                      <p>
                        <span>b)</span> Any delays, costs, or damages caused by
                        the accident are the responsibility of the mover, but
                        we'll do our best to help you find the right solution.
                      </p>
                      <p>
                        <span>c)</span> In some cases, you may need to cooperate
                        with the service provider or relevant authorities if
                        reports or insurance claims are required.
                      </p>
                    </ul>
                  </div>
                </div>

                <div id="insurance">
                  <h5 className="text-uppercase mt-3">19. INSURANCE</h5>
                  <div className="points padd ">
                    <p className="text-justify d-flex mb-2">
                      <span>Please note the following definitions:</span>
                    </p>

                    <p className="text-justify d-flex mb-2">
                      <span style={{ fontWeight: "500" }}>
                        <span className="font-weight-bold">
                          Accidental Damage
                        </span>{" "}
                        (Upto $500 AUD) - Damage to items being moved or
                        scratches & dents to walls or surfaces at the properties
                        involved in the move.
                        <i
                          className="text-secondary font-sm"
                          style={{ fontWeight: "400", fontSize: "16px" }}
                        >
                          (Ref:- Clause – 19.1)
                        </i>
                      </span>
                    </p>

                    <p className="text-justify d-flex mb-2">
                      <span style={{ fontWeight: "500" }}>
                        <span className="font-weight-bold">
                          Public Liability Insurance
                        </span>{" "}
                        (Upto 10 Million AUD) - Injury or major property damage
                        caused to other people during the move.{" "}
                        <i
                          className="text-secondary font-sm"
                          style={{ fontWeight: "400", fontSize: "16px" }}
                        >
                          (Ref:- Clause – 19.2)
                        </i>
                      </span>
                    </p>

                    <p className="text-justify d-flex mb-2">
                      <span>19.1&nbsp;</span>
                      <span className="font-weight-bold">
                        Accidental Damage or No Damage Guarantee :-
                        <span> </span>
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ fontWeight: "500", marginLeft: "48px" }}>
                        After completing thousands of moves, we've found $500 is
                        appropriate amount to cover 95% of accidental damage
                        cases. Any damage must be reported to Oyo or movers on
                        site <span>before the team leaves the premises</span> to
                        avoid confusion. We strongly recommend a walk-through of
                        your property before the job is completed to check for
                        any potential issues.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ fontWeight: "600", marginLeft: "48px" }}>
                        For approved claims you may have the option of:-
                      </span>
                    </p>
                    <ul style={{ marginLeft: "48px" }}>
                      <p>
                        <span>a)&nbsp;</span> Repair to restore the damage as
                        close as possible to its original condition, using
                        reputable repairers
                      </p>
                      <p>
                        <span>b)&nbsp;</span> Monetary compensation directly via
                        Oyo if repair cannot be performed, calculated with
                        consideration of market value, wear and tear,
                        depreciation.
                      </p>
                      
                    </ul>

                    <p className="text-justify d-flex mb-2">
                      <span style={{ fontWeight: "600", marginLeft: "48px" }}>
                        <span style={{ textDecoration: "underline" }}>
                          EXCLUSIONS:
                        </span>{" "}
                        The following situations are not covered under
                        Accidental Damage:
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ marginLeft: "48px" }}>a)&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          {" "}
                          Improper Packing or Preparation
                        </span>
                        :- we are not responsible for damage caused by poor or
                        inadequate packing, items mishandled by the customer
                        before handover, or appliances (such as front-loader
                        washing machines) not secured with transit bolts.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ marginLeft: "48px" }}>b)&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          {" "}
                          Pre-Existing Damage
                        </span>
                        :- Any Damage that occurred before pickup & not
                        documented prior to move. (e.g.- items collected from
                        storage facility.)
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ marginLeft: "48px" }}>c)&nbsp;</span>
                      <span>
                        <span className="font-weight-bold"> Food items</span>:-
                        Vegetables, meat, seafood, beverages, confectionery,
                        foodstuff, flowers or other temperature-controlled
                        goods.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ marginLeft: "48px" }}>d)&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          {" "}
                          Dismantling and Reassembly
                        </span>
                        :- At your request we may do so however, we do not take
                        responsibility if reassembly is not possible. This may
                        occur due to factors such as nature of material, rusted
                        screws, age, or pre-existing damage.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ marginLeft: "48px" }}>e)&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          {" "}
                          General Wear and Tear
                        </span>
                        :- During the typical moving process, minor scratches,
                        scuffs, or marks may occur on walls, flooring, or
                        furniture due to age or environmental factors.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ marginLeft: "48px" }}>f)&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          {" "}
                          Where You Are Helping Us
                        </span>
                        :- Please be careful with your back while loading /
                        unloading & no insurance applies. (e.g.:- One Man jobs)
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ marginLeft: "48px" }}>g)&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          {" "}
                          Customer Directed Moves
                        </span>
                        :- When damage is caused as a result of moving goods
                        under your instructions or if you refuse our
                        recommendation on the safest way to move an item.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ marginLeft: "48px" }}>h)&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          {" "}
                          Damage to Goods-Inherent Risky items
                        </span>
                        :- no matter how carefully they are handled:- e.g. Glass
                        items, Pot Plants, Overweight items of 80 kg+. TV
                        Without Box, Marble, Bonded or Faux Leather, Press-wood
                        Flat Pack IKEA or similar Furniture etc.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ marginLeft: "48px" }}>i)&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          {" "}
                          High Value items
                        </span>
                        :- Antiques, artwork, Jewellery, Cash, high value
                        electronics or Musical instruments or any items
                        exceeding maximum accidental coverage limit will not be
                        covered unless prior written agreement is obtained.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ marginLeft: "48px" }}>j)&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          {" "}
                          Unauthorised Services
                        </span>
                        :- Items handled outside of Oyo platform's booking
                        process.
                      </span>
                    </p>

                    <p
                      className="text-justify d-flex mb-2"
                      style={{
                        backgroundColor: "#f8f9fa",
                        padding: "10px",
                        fontStyle: "italic",
                        borderRadius: "15px",
                        border: "1px solid black",
                      }}
                    >
                      <span style={{ fontWeight: "600" }}>
                        {" "}
                        Despite the above exclusions, we can still move such
                        items at your own risk. Our movers will take reasonable
                        precautions, including the use of heavy-duty blankets or
                        shrink-wrap padding, to help minimise potential damage
                        and provide maximum protection.
                      </span>
                    </p>

                    <p className="text-justify d-flex mb-2">
                      <span>19.2&nbsp;</span>
                      <span>
                        <span className="font-weight-bold">
                          Property & Public Liability Cover
                        </span>
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ fontWeight: "500", marginLeft: "48px" }}>
                        All claims relating to Property or Public Liability
                        damage will be referred directly to the third-party
                        service provider who provided the service. Upon
                        notification of such an event, Oyo will provide you with
                        the mover's ABN, direct contact details, and their most
                        recent Certificate of Insurance. Oyo will also instruct
                        the mover to lodge a claim with their insurer. You
                        acknowledge that Oyo is not liable for any Property or
                        Public Liability claims.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span style={{ fontWeight: "500", marginLeft: "48px" }}>
                        Oyo requires all removalist partners (Movers) to have
                        goods in transit and public liability insurance (minimum
                        10 million AUD). This is a requirement for offering
                        services through the Platform. However, Oyo does not
                        guarantee or represent that a mover's insurance will
                        cover a particular user, or that it is sufficient or
                        appropriate for your move. Any costs associated with
                        accessing or making an insurance claim are the
                        responsibility of the customer.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>
                        For more Insurance details:- Please check Insurance page
                        .
                      </span>
                    </p>

                    <p
                      className=" mb-2"
                      style={{
                        backgroundColor: "#f8f9fa",
                        padding: "10px",
                        textAlign: "left",
                        fontStyle: "italic",
                        borderRadius: "15px",
                        border: "1px solid black",
                      }}
                    >
                      <span style={{ fontWeight: "600" }}>
                        For full comprehensive removals insurance, we recommend
                        contacting{" "}
                        <span
                          className="font-weight-bold"
                          style={{ color: "#000", fontStyle: "italic" }}
                        >
                          Carts Insurance
                        </span>
                        at{" "}
                        <a
                          href="tel:1300880253"
                          className="font-weight-bold"
                          style={{ color: "#000", fontStyle: "italic" }}
                        >
                          1300 880 253
                        </a>
                        . For any additional information, please visit{" "}
                        <span className="font-weight-bold">
                          <a
                            href="https://www.removalsinsurance.com.au"
                            target="_blank"
                            style={{ color: "#000", fontStyle: "italic" }}
                          >
                            www.removalsinsurance.com.au
                          </a>
                        </span>
                        . You can also choose your choice of insurer for Content
                        or higher-value insurance.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="governance">
                  <h5 className="text-uppercase mt-3">
                    20. GOVERNING LAW & JURISDICTION
                  </h5>
                  <div className="points padd ">
                    <p className="text-justify d-flex mb-2">
                      {/* <span></span> */}
                      <span style={{ fontWeight: "500" }}>
                        These Terms are governed by the laws of Victoria,
                        Australia, and you submit to the non-exclusive
                        jurisdiction of the courts of that State.
                      </span>
                    </p>
                  </div>
                </div>

                <div id="contactus">
                  <h5 className="text-uppercase mt-3">
                    <span>21.&nbsp;</span>CONTACT INFORMATION
                  </h5>
                  <div className="points padd ">
                    <p className="text-justify mb-2">
                      If you have any questions or concerns, please contact us
                      at:
                    </p>
                    <p className="">
                      
                      <span className="font-weight-bold">
                        <span style={{ marginRight: "5px" }}>
                          <FaEnvelope />
                        </span>
                        Email:
                      </span>{" "}
                      <a
                        href="mailto:support@oyomovers.com.au"
                        style={{ textDecoration: "underline", color: "#007bff " }}
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
