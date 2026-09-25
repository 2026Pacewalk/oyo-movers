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
            <div className="col-md-4 col-lg-4 col-xl-4 col-xxl-3 ">
              <div className="table-of-contents">
                <span>Table Of Content</span>
                <ul>
                  <li><Link href="#introduction" className="links">Introduction</Link></li>
                  <li><Link href="#definitions" className="links">1. Definitions</Link></li>
                  <li><Link href="#description" className="links">2. Description of Services</Link></li>
                  <li><Link href="#bookings" className="links">3. Bookings</Link></li>
                  <li><Link href="#move-size" className="links">4. Move Size</Link></li>
                  <li><Link href="#charges" className="links">5. Charges</Link></li>
                  <li><Link href="#payments" className="links">6. Payments</Link></li>
                  <li><Link href="#discount-codes" className="links">7. Discount Codes</Link></li>
                  <li><Link href="#responsibilities" className="links">8. Your Responsibilities</Link></li>
                  <li><Link href="#off-platform" className="links">9. Off-Platform Dealings</Link></li>
                  <li><Link href="#additional-movers" className="links">10. Additional Movers</Link></li>
                  <li><Link href="#conduct-safety" className="links">11. Conduct & Safety</Link></li>
                  <li><Link href="#provider-rights" className="links">12. Service Providers Rights</Link></li>
                  <li><Link href="#dispute-resolution" className="links">13. Dispute Resolution</Link></li>
                  <li><Link href="#governing-law" className="links">14. Governing Law</Link></li>
                  <li><Link href="#contact" className="links">15. Contact Us</Link></li>
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-md-8 col-lg-8 col-xl-8 col-xxl-9">
              <div className="content-section">
                <div id="last-updated">
                  <h6 className="underline font-weight-normal mb-4">
                    <span style={{ fontWeight: "bold", color: "black" }}>Effective Date:</span> 16.08.2026
                  </h6>
                </div>

                <div id="introduction">
                  <h5 className="text-uppercase mt-3">Introduction</h5>
                  <p className="text-justify">
                    <strong>Welcome to OYO! (On-Demand Moving Platform)</strong>
                  </p>
                  <p className="text-justify">
                    This Website and its subdomains are owned and operated by Oyo Group Pty Ltd
                    (ABN 30 646 236 179). By confirming a booking or your use of the OYO platform, including our
                    website or mobile app, you agree to be bound by these Terms of Use. Please review them
                    carefully before engaging our services.
                  </p><br />
                  <p className="text-justify normal-heading mb-2 font-weight-bold">
                    These Terms must be read together with:
                  </p>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2">
                      <span>•&nbsp;</span>
                      <a href="/platform-terms" style={{ color: "#007bff" }}>Platform Terms and Conditions</a>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>•&nbsp;</span>
                      <a href="/privacy-policy" style={{ color: "#007bff" }}>Privacy Policy</a>
                    </p>
                  </div>
                  <p className="text-justify">
                    Together, these documents form the legally binding agreement between Oyo Group Pty Ltd
                    (provider of the platform) and the User (you, as a customer).
                  </p>
                </div>

                <div id="definitions">
                  <h5 className="text-uppercase mt-3">1. Definitions</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">“We”, “Us”, “Our”, “Oyo”, “Oyo Movers” and “Platform”</span> refers to Oyo Group Pty Ltd.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">“Service Provider”</span> refers to Independent Contractors, Movers, Drivers, Helpers, Moving Professionals or Delivery Partners using the Platform to provide services.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">“Users”, “You”, “Your” or “Customer”</span> refers to anyone using the platform to request or book services.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">“Goods”</span> refers to items being moved, delivered, or removed on customer request.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">“Service”</span> refers to moving, delivery, junk removal or support provided by OYO.</span></p>
                  </div>
                </div>

                <div id="description">
                  <h5 className="text-uppercase mt-3">2. Description of Services</h5>
                  <div className="points ">
                    <p className="text-justify mb-2">
                      OYO Movers is a technology-driven On-Demand moving platform. Our Platform connects users
                      (“Customers”) to the independent contractors (“Service Providers”, “Movers,” or “Helpers”)
                      who can perform the requested services.
                    </p>
                  </div>
                </div>

                <div id="bookings">
                  <h5 className="text-uppercase mt-3">3. Bookings</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span>Bookings can be made via the OYO website or by calling us during business hours.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span>Accurate pickup / delivery and job details are required (including item description).</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span>Booking is secured once confirmed by OYO only.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span>Once booked, OYO will provide you reminders, updates and mover details. <span className="font-weight-bold">NOTE:</span> Arrival times are not guaranteed and may vary based on traffic, availability and prior jobs.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span>Misuse of our platform or misrepresentation of goods may result in booking cancellation or legal action.</span></p>
                  </div>
                </div>

                <div id="move-size">
                  <h5 className="text-uppercase mt-3">4. Move Size</h5>
                  <div className="points ">
                    <p className="text-justify mb-2">OYO provides several ways to estimate your move size (m³):</p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Volume Calculator</span> – Estimate based on room count and furnishing level.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Inventory</span> – Estimate based on the items and boxes being moved.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Exact Volume</span> – If you already know the required cubic meters. Generally applicable if you moved recently.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Phone Estimate</span> – Based on your description of the items.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Photo / Video Review</span> – Estimate based on photos or videos you provide.</span></p>
                    <p className="text-justify mb-2">
                      <span className="font-weight-bold">Final Pricing:</span> All move-size estimates are
                      approximate and should be used as a guide only. Final charges are based on actual
                      work-time, services provided, access conditions and any additional items or applicable fees.
                    </p>
                  </div>
                </div>

                <div id="charges">
                  <h5 className="text-uppercase mt-3">5. Charges</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Pricing:</span> Local moves have a 30-minute minimum, plus a 30-minute call-out travel fee (fuel included). Time is then billed in 30-minute increments. Large Truck or 3-4 Mover jobs have a 4-hour minimum.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Work-Time:</span> Time starts when movers arrive at the pickup location and ends when the job is fully completed and payment has been processed. Waiting time caused by the customer is considered as work time.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Additional:</span> Fees apply for toll routes, parking fees, bad access, delivery urgency and return travel for long-distance moves.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Heavy lifting / Bad access:</span> A $100 fee applies for moving big items such as a Piano, Pool Table, Marble Table, Fish Tanks, bulky items, or for bad property access.</span></p>
                    <p className="text-justify mb-2"><span className="font-weight-bold">Please Note:</span> Large or bulky items will not be moved if deemed unsafe or if extra crew or specialised equipment is required.</p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">GST:</span> All prices include GST, where applicable.</span></p>
                  </div>
                </div>

                <div id="payments">
                  <h5 className="text-uppercase mt-3">6. Payments</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Local Jobs:</span> Payments are processed before or upon completion of the job.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Long Distance or Interstate Jobs:</span> Pre-payment of the estimated job total is required before commencement, and any balance payments upon delivery.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Late Hour Jobs:</span> Jobs after 5:00pm require pre-payment.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Payment Collections:</span> We collect payments before completion of the job. Should circumstances arise where you are unwilling or unable to pay any due charges, we reserve the right to cancel the job or hold deliveries / items of equivalent value until full payment is received.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Payment Gateway:</span> All payments are processed securely via Stripe (PCI Level-1 certified).</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Invoices:</span> All invoices will be emailed electronically.</span></p>
                  </div>
                </div>

                <div id="discount-codes">
                  <h5 className="text-uppercase mt-3">7. Discount Codes</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span>Only one discount code or voucher can be applied per booking.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span>Vouchers & discount codes do not apply on Sundays, Public Holidays & Peak Times.</span></p>
                  </div>
                </div>

                <div id="responsibilities">
                  <h5 className="text-uppercase mt-3">8. Your Responsibilities</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Presence:</span> Be present during loading/unloading to ensure no items are left behind or taken in error.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Owner of Goods:</span> You must be the owner of the Goods or authorised by the owner.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Restricted Items:</span> Goods must not include dangerous, hazardous, or illegal items.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Parking:</span> Safe parking space or permits are arranged close to the property. Parking fines or fees incurred will be added to the bill.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Ensure:</span> Items will fit into the new property (e.g. a large sofa fits through the doors).</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Notify us:</span> Of any access issues, heavy items or special handling requirements. Bad access includes narrow stair flights, awkward access, long walking distance from the parked truck, etc. Please note, additional costs may apply due to unforeseen circumstances.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Liquids:</span> Appliances, lawn equipment & plants must be drained of liquids.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Arrange a Specialist:</span> For tasks such as removing doors or windows, disconnecting whitegoods, or handling property fittings that require licensed trades (e.g. plumbers or carpenters). If you request assistance with such tasks, you accept full responsibility for any loss or damage and agree to indemnify OYO and its service providers.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Final Walk-through:</span> Upon completion of the move, you must inspect the property and items with the team before signing off. All damage claims or property issues must be reported before the team departs the premises to avoid any confusion.</span></p>
                  </div>
                </div>

                <div id="off-platform">
                  <h5 className="text-uppercase mt-3">9. Off-Platform Dealings</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Payments Through OYO only:</span> You must make all payments exclusively through the official OYO platform. You must not offer, negotiate, or make any direct payments (cash, external bank transfers, or private card transactions) to Service Providers.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Off-Platform Arrangements:</span> Any payment or arrangement made directly with a service provider outside the OYO platform is immediately considered an unauthorised private arrangement. This completely voids all or any applicable insurance coverage, damage claim eligibility, and dispute resolution support from OYO, and constitutes a breach of our safety protocols.</span></p>
                  </div>
                </div>

                <div id="additional-movers">
                  <h5 className="text-uppercase mt-3">10. Additional Movers</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span>If your move requires more resources than originally booked (such as an additional truck or extra movers), a separate booking must be made, and these resources will be billed separately.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span>All additional resources are subject to availability at the time of request.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span>If you choose to continue with the original resources, the job may take longer and require you to prioritise which items are moved first.</span></p>
                  </div>
                </div>

                <div id="conduct-safety">
                  <h5 className="text-uppercase mt-3">11. Conduct & Safety</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Zero-Tolerance:</span> OYO has zero tolerance for threatening, abusive, aggressive, discriminatory or harassing behaviour towards OYO staff or Service Providers.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span>OYO or the Service Provider may pause, refuse or stop services where such behaviour occurs and may restrict the Customer’s future use of the Platform.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span>If services are terminated under this clause, the Customer remains liable for all work time, travel fees, and costs incurred up to the stoppage point. OYO and its Service Providers accept no liability for resulting delays or expenses, and OYO reserves the right to permanently ban the Customer’s account.</span></p>
                  </div>
                </div>

                <div id="provider-rights">
                  <h5 className="text-uppercase mt-3">12. Service Providers Rights</h5>
                  <div className="points ">
                    <p className="text-justify mb-2">
                      Safety comes first. A Mover can refuse, pause or stop where they reasonably believe:
                    </p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span>The job site or item is unsafe.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span>The job is materially different from the service booked.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span>Moving an item poses an unreasonable risk of injury or property damage.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span>Additional Movers, vehicles, equipment or trips are required.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span>If extra resources or a different approach is required, the mover will discuss the available options and any additional charges with you when reasonably possible.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span>If a significant risk of damage exists, movers may require you to sign a waiver before proceeding.</span></p>
                  </div>
                </div>

                <div id="dispute-resolution">
                  <h5 className="text-uppercase mt-3">13. Dispute Resolution</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Dispute relating to these Terms or OYO Services:</span> Should first be raised with OYO Support. Both parties will first attempt to resolve the matter informally. If the dispute cannot be resolved, either party may pursue any rights available under applicable law.</span></p>
                    <p className="text-justify d-flex mb-2"><span>•&nbsp;</span><span><span className="font-weight-bold">Dispute with Service Provider:</span> If any issue comes up, we suggest trying to resolve it directly with your movers on the spot. If it cannot be resolved, please contact OYO Support for assistance.</span></p>
                  </div>
                </div>

                <div id="governing-law">
                  <h5 className="text-uppercase mt-3">14. Governing Law</h5>
                  <div className="points ">
                    <p className="text-justify mb-2">
                      These Terms are governed by the laws of Victoria, Australia, and you submit to the
                      non-exclusive jurisdiction of the courts of Victoria.
                    </p>
                  </div>
                </div>

                <div id="contact">
                  <h5 className="text-uppercase mt-3">15. Contact Us</h5>
                  <div className="points ">
                    <p className="text-justify mb-2">
                      For Feedback, Questions or Concerns, please contact our support team:
                    </p>
                    <p className="">
                      Oyo Group Pty Ltd. (ABN 30 646 236 179)
                      <br />
                      <span className="font-weight-bold">🌐 Website:</span>{" "}
                      <a href="/contact-us" style={{ color: "#007bff" }}>www.oyomovers.com.au/contact-us</a>
                      <br />
                      <span className="font-weight-bold">
                        <span style={{ marginRight: "5px" }}><FaEnvelope /></span>Email:
                      </span>{" "}
                      <a href="mailto:support@oyomovers.com.au" style={{ color: "#007bff" }}>support@oyomovers.com.au</a>
                      <br />
                      <span className="font-weight-bold">
                        <span style={{ marginRight: "5px" }}><FaPhoneVolume /></span>Phone:
                      </span>{" "}
                      <a href="tel:1300 01 31 31" style={{ textDecoration: "none", color: "#000" }}>1300 01 31 31</a>
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
