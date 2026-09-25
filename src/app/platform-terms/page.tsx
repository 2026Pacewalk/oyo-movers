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
                  <li><Link href="#introduction" className="links">Introduction</Link></li>
                  <li><Link href="#definitions" className="links">1. Definitions</Link></li>
                  <li><Link href="#description" className="links">2. Description of Platform</Link></li>
                  <li><Link href="#creating-account" className="links">3. Creating an Account</Link></li>
                  <li><Link href="#user-eligibility" className="links">4. User Eligibility</Link></li>
                  <li><Link href="#prohibited-conduct" className="links">5. Prohibited Conduct</Link></li>
                  <li><Link href="#booking-process" className="links">6. Booking Process</Link></li>
                  <li><Link href="#ratings-reviews" className="links">7. Ratings & Reviews</Link></li>
                  <li><Link href="#third-party" className="links">8. Third-Party Services</Link></li>
                  <li><Link href="#service-providers" className="links">9. Service Providers</Link></li>
                  <li><Link href="#service-availability" className="links">10. Service Availability</Link></li>
                  <li><Link href="#limitation" className="links">11. Limitation of Liability</Link></li>
                  <li><Link href="#suspension" className="links">12. Suspension & Termination</Link></li>
                  <li><Link href="#copyright" className="links">13. Copyright</Link></li>
                  <li><Link href="#indemnity" className="links">14. Indemnity</Link></li>
                  <li><Link href="#app-store" className="links">15. App Store Terms</Link></li>
                  <li><Link href="#storage" className="links">16. Storage Services</Link></li>
                  <li><Link href="#overdue" className="links">17. Overdue Accounts</Link></li>
                  <li><Link href="#breakdowns" className="links">18. Breakdowns & Accidents</Link></li>
                  <li><Link href="#changes" className="links">19. Changes to Terms</Link></li>
                  <li><Link href="#force-majeure" className="links">20. Force Majeure</Link></li>
                  <li><Link href="#severability" className="links">21. Severability</Link></li>
                  <li><Link href="#governing-law" className="links">22. Governing Law</Link></li>
                  <li><Link href="#contact" className="links">23. Contact Information</Link></li>
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-md-8 col-lg-8 col-xl-8 col-xxl-9">
              <div className="content-section">
                <div id="last-updated">
                  <h6 className="underline font-weight-normal mb-4">
                    <span style={{ fontWeight: "bold", color: "black" }}>Last Updated:</span> 16.08.2026
                  </h6>
                </div>

                <div id="introduction">
                  <p className="text-justify">
                    <strong>Welcome to OYO! (On-Demand Moving Platform)</strong>
                  </p>
                  <p className="text-justify">
                    These Terms of Use govern your access to and use of the OYO Platform, including our
                    website, mobile apps and related features or services. Please read these Terms carefully.
                    If you do not agree with them, do not use the Platform.
                  </p><br />
                  <p className="text-justify">
                    BY ACCESSING OR USING THE OYO PLATFORM, YOU AGREE TO THESE TERMS AND OUR APPLICABLE POLICIES.
                  </p><br />
                  <p className="text-justify normal-heading mb-2 font-weight-bold">
                    These Terms should be read together with:
                  </p>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2">
                      <span>•&nbsp;</span>
                      <a href="/customer-terms" style={{ color: "#007bff" }}>Customer Terms of Use</a>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>•&nbsp;</span>
                      <a href="/privacy-policy" style={{ color: "#007bff" }}>Privacy Policy</a>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>•&nbsp;</span>
                      <a href="/cancel-policy" style={{ color: "#007bff" }}>Cancellation Policy</a>
                    </p>
                  </div>
                </div>

                <div id="definitions">
                  <h5 className="text-uppercase mt-3">1. Definitions</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>1.1&nbsp;</span><span><span className="font-weight-bold">“We”, “Us”, “Our”, “Oyo”, “Oyo Movers” and “Platform”</span> refers to Oyo Group Pty Ltd (ABN 30 646 236 179).</span></p>
                    <p className="text-justify d-flex mb-2"><span>1.2&nbsp;</span><span><span className="font-weight-bold">“Service Provider”</span> refers to Independent Contractors, Movers, Drivers, Helpers, Moving Professionals or Delivery Partners using the Platform to provide services.</span></p>
                    <p className="text-justify d-flex mb-2"><span>1.3&nbsp;</span><span><span className="font-weight-bold">“Users”, “You”, “Your” or “Customer”</span> refers to anyone using the platform to request or book services.</span></p>
                    <p className="text-justify d-flex mb-2"><span>1.4&nbsp;</span><span><span className="font-weight-bold">“Goods”</span> refers to furniture, household items, office items, junk, or other items being moved, delivered, or removed.</span></p>
                    <p className="text-justify d-flex mb-2"><span>1.5&nbsp;</span><span><span className="font-weight-bold">“Service”</span> refers to any moving, delivery, junk removal or related services requested or arranged through OYO Platform.</span></p>
                  </div>
                </div>

                <div id="description">
                  <h5 className="text-uppercase mt-3">2. Description of Platform</h5>
                  <div className="points ">
                    <p className="text-justify mb-2">
                      OYO provides a technology platform that connects Customers with independent Service
                      Providers for on-demand moving, delivery and related services.
                    </p>
                    <p className="text-justify d-flex mb-2"><span>2.1&nbsp;</span><span><span className="font-weight-bold">Platform Services:</span> Users can request moving, delivery and related services through the Platform. Requests may be sent to available Service Providers.</span></p>
                    <p className="text-justify d-flex mb-2"><span>2.2&nbsp;</span><span><span className="font-weight-bold">Payments:</span> OYO may facilitate and collect payments through the Platform. Payment processing may be handled by third-party providers such as Stripe, subject to the applicable Customer and Service Provider Terms.</span></p>
                    <p className="text-justify d-flex mb-2"><span>2.3&nbsp;</span><span><span className="font-weight-bold">Independent Service Providers:</span> Service Providers available through the Platform operate as independent contractors or businesses and are responsible for the services they provide, subject to the applicable Terms.</span></p>
                    <p className="text-justify d-flex mb-2"><span>2.4&nbsp;</span><span><span className="font-weight-bold">Platform Fees:</span> OYO may charge Service Providers platform or processing fees. Any Customer charges are shown or explained under the applicable Customer Terms.</span></p>
                    <p className="text-justify d-flex mb-2"><span>2.5&nbsp;</span><span><span className="font-weight-bold">Privacy:</span> Personal information is handled in accordance with our Privacy Policy.</span></p>
                  </div>
                </div>

                <div id="creating-account">
                  <h5 className="text-uppercase mt-3">3. Creating an Account</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>3.1&nbsp;</span><span><span className="font-weight-bold">Account Information:</span> When creating an account, you may be required to provide personal information such as your name, address and mobile number.</span></p>
                    <p className="text-justify d-flex mb-2"><span>3.2&nbsp;</span><span><span className="font-weight-bold">Account Security:</span> You must keep your password and account details secure. You are responsible for activity under your account.</span></p>
                    <p className="text-justify d-flex mb-2"><span>3.3&nbsp;</span><span><span className="font-weight-bold">Unauthorised Use:</span> Notify OYO as soon as possible if you suspect unauthorised use or a security breach.</span></p>
                    <p className="text-justify d-flex mb-2"><span>3.4&nbsp;</span><span><span className="font-weight-bold">Accurate Information:</span> Information provided through your account must be accurate, truthful, current and complete.</span></p>
                    <p className="text-justify d-flex mb-2"><span>3.5&nbsp;</span><span><span className="font-weight-bold">Account Access:</span> OYO may deny, suspend or restrict an account where reasonably required for safety, security, compliance, misuse or a breach of these Terms.</span></p>
                    <p className="text-justify d-flex mb-2"><span>3.6&nbsp;</span><span><span className="font-weight-bold">Electronic Communications:</span> By using the OYO Platform, you agree that OYO may communicate with you about your account, bookings and use of the Platform by email, SMS, app notification or other electronic means.</span></p>
                  </div>
                </div>

                <div id="user-eligibility">
                  <h5 className="text-uppercase mt-3">4. User Eligibility</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>4.1&nbsp;</span><span><span className="font-weight-bold">Age:</span> You must be at least 18 years old and have legal capacity to enter into a binding agreement.</span></p>
                    <p className="text-justify d-flex mb-2"><span>4.2&nbsp;</span><span><span className="font-weight-bold">Authority:</span> If using an account on behalf of another person or entity, you confirm that you have authority to act on their behalf.</span></p>
                    <p className="text-justify d-flex mb-2"><span>4.3&nbsp;</span><span><span className="font-weight-bold">Eligibility:</span> By using the Platform, you confirm that you meet these requirements.</span></p>
                  </div>
                </div>

                <div id="prohibited-conduct">
                  <h5 className="text-uppercase mt-3">5. Prohibited Conduct</h5>
                  <div className="points ">
                    <p className="text-justify mb-2">You must use the Platform lawfully and respectfully. You must not:</p>
                    <p className="text-justify d-flex mb-2"><span>5.1&nbsp;</span><span>Use the Platform or Services for illegal or unauthorised purposes.</span></p>
                    <p className="text-justify d-flex mb-2"><span>5.2&nbsp;</span><span>Violate applicable laws, regulations or third-party rights.</span></p>
                    <p className="text-justify d-flex mb-2"><span>5.3&nbsp;</span><span>Use the Platform or its content to unlawfully copy, reproduce or compete with OYO.</span></p>
                    <p className="text-justify d-flex mb-2"><span>5.4&nbsp;</span><span>Threaten, harass, abuse or defame OYO staff, Service Providers or other Users.</span></p>
                    <p className="text-justify d-flex mb-2"><span>5.5&nbsp;</span><span>Access the Platform through unauthorised methods or attempt to gain unauthorised access to accounts or systems.</span></p>
                    <p className="text-justify d-flex mb-2"><span>5.6&nbsp;</span><span>Submit false, misleading or fraudulent information.</span></p>
                    <p className="text-justify d-flex mb-2"><span>5.7&nbsp;</span><span>Assist another person to misuse the Platform.</span></p>
                    <p className="text-justify d-flex mb-2"><span>5.8&nbsp;</span><span>Use contact details obtained through OYO to bypass the Platform or make unauthorised private arrangements for services introduced or arranged through OYO.</span></p>
                  </div>
                </div>

                <div id="booking-process">
                  <h5 className="text-uppercase mt-3">6. Booking Process</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>6.1&nbsp;</span><span><span className="font-weight-bold">Booking Confirmation:</span> A booking is confirmed once accepted by OYO and, where applicable, allocated to a Service Provider.</span></p>
                    <p className="text-justify d-flex mb-2"><span>6.2&nbsp;</span><span><span className="font-weight-bold">Mover Details:</span> Customer and Mover contact details may be shared for job coordination, usually before the move.</span></p>
                    <p className="text-justify d-flex mb-2"><span>6.3&nbsp;</span><span><span className="font-weight-bold">Mover Unavailable:</span> If an allocated Mover cannot complete the job, OYO will make reasonable efforts to arrange another Service Provider or reschedule the booking. If no alternative is available, the Customer may cancel without penalty.</span></p>
                    <p className="text-justify mb-2 font-weight-bold">When making a booking, you may be asked to provide:</p>
                    <div className="pl-md-4" style={{ marginLeft: "16px" }}>
                      <p className="text-justify d-flex mb-2"><span>6.4&nbsp;</span><span>Pickup and delivery addresses.</span></p>
                      <p className="text-justify d-flex mb-2"><span>6.5&nbsp;</span><span>Vehicle size and number of Movers required.</span></p>
                      <p className="text-justify d-flex mb-2"><span>6.6&nbsp;</span><span>Preferred date and arrival time.</span></p>
                      <p className="text-justify d-flex mb-2"><span>6.7&nbsp;</span><span>Photos, inventory or a description of the move.</span></p>
                      <p className="text-justify d-flex mb-2"><span>6.8&nbsp;</span><span>Payment details.</span></p>
                    </div>
                  </div>
                </div>

                <div id="ratings-reviews">
                  <h5 className="text-uppercase mt-3">7. Ratings & Reviews</h5>
                  <div className="points ">
                    <p className="text-justify mb-2">
                      OYO has a two-way rating and feedback system for Customers and Service Providers.
                      Both can rate each other from 1 to 5 stars.
                    </p>
                    <p className="text-justify d-flex mb-2"><span>7.1&nbsp;</span><span><span className="font-weight-bold">Mover Ratings:</span> Customers may rate and review Movers after a completed service. Ratings may be used by OYO to monitor service quality.</span></p>
                    <p className="text-justify d-flex mb-2"><span>7.2&nbsp;</span><span><span className="font-weight-bold">Customer Ratings:</span> Movers may rate Customers based on matters such as cooperation, conduct and job accuracy.</span></p>
                    <p className="text-justify d-flex mb-2"><span>7.3&nbsp;</span><span><span className="font-weight-bold">Safety & Misconduct:</span> Safety, misconduct or serious service concerns may be reported to OYO Support for review.</span></p>
                    <p className="text-justify d-flex mb-2"><span>7.4&nbsp;</span><span><span className="font-weight-bold">Rating Display:</span> OYO may display an average rating while keeping individual ratings private.</span></p>
                    <p className="text-justify d-flex mb-2"><span>7.5&nbsp;</span><span><span className="font-weight-bold">Platform Access:</span> Repeated poor conduct or serious rating concerns may result in review, restrictions, suspension or removal from the Platform.</span></p>
                  </div>
                </div>

                <div id="third-party">
                  <h5 className="text-uppercase mt-3">8. Third-Party Services & Links</h5>
                  <div className="points ">
                    <p className="text-justify mb-2">
                      The Platform may contain links to, or use services provided by, third parties such as
                      Stripe, Google, Apple or storage providers. Third-party services are subject to their own
                      terms and privacy policies. OYO does not control third-party websites or services and is
                      not responsible for their content or availability.
                    </p>
                  </div>
                </div>

                <div id="service-providers">
                  <h5 className="text-uppercase mt-3">9. Service Providers</h5>
                  <div className="points ">
                    <p className="text-justify mb-2">
                      OYO Platform facilitates the booking, dispatch, and management of removal jobs on behalf
                      of a network of trusted third-party businesses, each operating under their own ABN or ACN.
                    </p>
                    <p className="text-justify d-flex mb-2"><span>9.1&nbsp;</span><span><span className="font-weight-bold">Independent Businesses:</span> Service Providers operate as independent contractors or businesses under their own ABN or ACN.</span></p>
                    <p className="text-justify d-flex mb-2"><span>9.2&nbsp;</span><span><span className="font-weight-bold">Insurance Requirements:</span> OYO may require Service Providers to provide evidence of applicable insurance, licences or other compliance documents before or while using the Platform.</span></p>
                    <p className="text-justify d-flex mb-2"><span>9.3&nbsp;</span><span><span className="font-weight-bold">Service Quality:</span> OYO may review Service Provider ratings, conduct, compliance and performance and may restrict or remove access to the Platform where appropriate.</span></p>
                    <p className="text-justify d-flex mb-2"><span>9.4&nbsp;</span><span><span className="font-weight-bold">Responsibility for Services:</span> Service Providers are responsible for performing the services they accept, subject to applicable law and the relevant OYO Terms.</span></p>
                    <p className="text-justify d-flex mb-2"><span>9.5&nbsp;</span><span><span className="font-weight-bold">Off-Platform Payments:</span> A Service Provider must not request or accept direct payment from a Customer for any booking arranged through the OYO Platform.</span></p>
                    <p className="text-justify d-flex mb-2"><span>9.6&nbsp;</span><span><span className="font-weight-bold">Off-Platform Arrangements:</span> A Service Provider must not solicit, encourage or arrange for an OYO Customer to cancel or arrange services outside the OYO Platform for the purpose of avoiding OYO’s Platform Fee or payment system.</span></p>
                    <p className="text-justify d-flex mb-2"><span>9.7&nbsp;</span><span><span className="font-weight-bold">Independent Business:</span> Nothing in this clause prevents a Service Provider from operating its own independent business or providing services to customers obtained independently and not introduced through OYO.</span></p>
                  </div>
                </div>

                <div id="service-availability">
                  <h5 className="text-uppercase mt-3">10. Service Availability</h5>
                  <div className="points ">
                    <p className="text-justify mb-2">
                      We aim to keep the OYO Platform available, but uninterrupted access is not guaranteed.
                      The Platform may be temporarily unavailable due to maintenance, technical issues or
                      circumstances outside our reasonable control. OYO is not responsible for losses caused
                      by temporary outages or service interruptions.
                    </p>
                  </div>
                </div>

                <div id="limitation">
                  <h5 className="text-uppercase mt-3">11. Limitation of Liability</h5>
                  <div className="points ">
                    <p className="text-justify mb-2">
                      To the fullest extent permitted by law, OYO is not liable for indirect, incidental,
                      special or consequential loss arising from use of the Platform or Services, including
                      loss of profit, revenue, opportunity or reputation.
                    </p>
                    <p className="text-justify mb-2">
                      Nothing in these Terms excludes, restricts or modifies any consumer guarantee, right or
                      remedy under the Australian Consumer Law or other applicable law that cannot lawfully be
                      excluded, restricted or modified.
                    </p>
                    <p className="text-justify mb-2">
                      Where OYO’s liability cannot be excluded, it is limited to the maximum extent permitted by law.
                    </p>
                  </div>
                </div>

                <div id="suspension">
                  <h5 className="text-uppercase mt-3">12. Suspension & Termination</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>12.1&nbsp;</span><span><span className="font-weight-bold">Your Account:</span> You may stop using the Platform at any time or by deleting the app and may request account closure where available.</span></p>
                    <p className="text-justify d-flex mb-2"><span>12.2&nbsp;</span><span><span className="font-weight-bold">OYO Suspension or Termination:</span> OYO may suspend, restrict or terminate access where reasonably required to investigate unusual activity, misuse, safety, security, legal, compliance or regulatory concerns, or a breach of these Terms.</span></p>
                    <p className="text-justify d-flex mb-2"><span>12.3&nbsp;</span><span><span className="font-weight-bold">Existing Rights:</span> Termination or suspension does not affect rights, payments or liabilities that arose before termination.</span></p>
                    <p className="text-justify d-flex mb-2"><span>12.4&nbsp;</span><span>This clause will survive the termination or expiry of these Terms.</span></p>
                  </div>
                </div>

                <div id="copyright">
                  <h5 className="text-uppercase mt-3">13. Copyright</h5>
                  <div className="points ">
                    <p className="text-justify mb-2">
                      Content made available through the OYO Platform, including text, branding, graphics,
                      software and other materials, is owned by or licensed to OYO unless stated otherwise.
                      You must not copy, reproduce, distribute or use Platform content unlawfully.
                    </p>
                    <p className="text-justify mb-2">
                      If you believe content on the Platform infringes copyright you own or control, please
                      contact OYO Support.
                    </p>
                  </div>
                </div>

                <div id="indemnity">
                  <h5 className="text-uppercase mt-3">14. Indemnity</h5>
                  <div className="points ">
                    <p className="text-justify mb-2">
                      You agree to indemnify OYO, its officers, employees and agents against reasonable claims,
                      losses, liabilities, costs or expenses (including reasonable legal costs) arising from your
                      unlawful conduct, material breach of these Terms, or infringement of another person’s rights.
                    </p>
                  </div>
                </div>

                <div id="app-store">
                  <h5 className="text-uppercase mt-3">15. App Store Terms</h5>
                  <div className="points ">
                    <p className="text-justify mb-2">
                      If you download an OYO app through Apple’s App Store or another third-party app store, the
                      app store provider is not responsible for operating or providing the OYO Services. Your use
                      of the app may also be subject to the app store provider’s applicable terms.
                    </p>
                    <p className="text-justify mb-2">
                      <span className="font-weight-bold">Apple Users:</span> Where required by Apple’s App Store
                      terms, you acknowledge that these Terms are between you and OYO, not Apple. OYO is
                      responsible for the app and its content, subject to these Terms and applicable law.
                    </p>
                  </div>
                </div>

                <div id="storage">
                  <h5 className="text-uppercase mt-3">16. Storage Services</h5>
                  <div className="points ">
                    <p className="text-justify mb-2">
                      We use third-party companies for both Short-Term Storage and Long-Term Storage services for
                      all our clients / jobs. Additional charges and terms apply.
                    </p>
                    <p className="text-justify d-flex mb-2"><span>16.1&nbsp;</span><span><span className="font-weight-bold">Third-Party Storage:</span> Such Storage services are charged separately and subject to the storage provider’s terms. Customers should consider purchasing appropriate insurance for high-value items.</span></p>
                    <p className="text-justify d-flex mb-2"><span>16.2&nbsp;</span><span><span className="font-weight-bold">Storage of Undelivered Goods:</span> The following terms apply:</span></p>
                    <div className="pl-md-4" style={{ marginLeft: "16px" }}>
                      <p className="text-justify d-flex mb-2"><span>16.3&nbsp;</span><span><span className="font-weight-bold">Storage & Fees:</span> If Goods cannot be unloaded or delivered due to site access issues, customer absence, or non-payment, they may be placed in secure storage. You are liable for all transport, storage, and re-delivery fees. Goods will only be released upon full payment.</span></p>
                      <p className="text-justify d-flex mb-2"><span>16.4&nbsp;</span><span><span className="font-weight-bold">Required Notices:</span> If charges remain unpaid, OYO will issue:</span></p>
                      <div className="pl-md-4" style={{ marginLeft: "16px" }}>
                        <p className="text-justify d-flex mb-2"><span>16.5&nbsp;</span><span><span className="font-weight-bold">First Notice:</span> 28 days to settle all outstanding balances and arrange collection.</span></p>
                        <p className="text-justify d-flex mb-2"><span>16.6&nbsp;</span><span><span className="font-weight-bold">Final Notice:</span> 14 days’ written notice prior to scheduled sale or disposal.</span></p>
                      </div>
                      <p className="text-justify d-flex mb-2"><span>16.7&nbsp;</span><span><span className="font-weight-bold">Disposal & Proceeds:</span> If charges remain unpaid after the notice periods expire:</span></p>
                      <div className="pl-md-4" style={{ marginLeft: "16px" }}>
                        <p className="text-justify d-flex mb-2"><span>16.8&nbsp;</span><span>Goods may be sold (by auction/private sale) or responsibly disposed of if unsaleable.</span></p>
                        <p className="text-justify d-flex mb-2"><span>16.9&nbsp;</span><span>Sale proceeds will first pay storage, disposal, and unpaid move charges. Any surplus will be refunded to you or held under statutory unclaimed money regulations.</span></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="overdue">
                  <h5 className="text-uppercase mt-3">17. Overdue Accounts</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>17.1&nbsp;</span><span><span className="font-weight-bold">Payment Due:</span> Invoices are payable on the date of issue. Late payments incur a fee of $50 for every 7 days the invoice remains unpaid.</span></p>
                    <p className="text-justify d-flex mb-2"><span>17.2&nbsp;</span><span><span className="font-weight-bold">Interest:</span> Outstanding amounts may accrue monthly interest at the applicable General Interest Charge (GIC) rate, compounded monthly.</span></p>
                    <p className="text-justify d-flex mb-2"><span>17.3&nbsp;</span><span><span className="font-weight-bold">Debt Recovery Costs:</span> OYO may refer overdue accounts to a debt collection agency. The Customer is responsible for applicable debt recovery and other associated legal costs.</span></p>
                    <p className="text-justify d-flex mb-2"><span>17.4&nbsp;</span><span><span className="font-weight-bold">Legal Recovery:</span> If an account remains unpaid, OYO may pursue recovery through VCAT or other legal processes. An administration fee of up to $1,100, plus VCAT + other applicable legal fees, may apply.</span></p>
                  </div>
                </div>

                <div id="breakdowns">
                  <h5 className="text-uppercase mt-3">18. Breakdowns & Accidents</h5>
                  <div className="points ">
                    <p className="text-justify mb-2">
                      We understand that moving day can be stressful and unexpected events like mechanical
                      breakdowns or road accidents occasionally happen. As OYO connects you with independent
                      Service Providers, our priority during any unexpected event is to minimise disruption and
                      work quickly to find a solution for you.
                    </p>
                    <p className="text-justify d-flex mb-2"><span>18.1&nbsp;</span><span><span className="font-weight-bold">Break-down Before the Job:</span> If a vehicle breaks down before the move, OYO will make reasonable efforts to find another available team. If no replacement is available, the Customer may reschedule or cancel without any penalty.</span></p>
                    <p className="text-justify d-flex mb-2"><span>18.2&nbsp;</span><span><span className="font-weight-bold">Break-down During the Job:</span> If a vehicle breaks down during the move and cannot be repaired promptly, OYO will make reasonable efforts to assist with a replacement vehicle or team. Customers will not be charged for breakdown-related waiting time or duplicate work caused solely by the breakdown.</span></p>
                    <p className="text-justify d-flex mb-2"><span>18.3&nbsp;</span><span><span className="font-weight-bold">Accidents:</span> If an accident prevents completion, OYO will make reasonable efforts to assist with an alternative team or reschedule the move. Loss or damage claims may need to be handled with the relevant Service Provider, insurer or authorities.</span></p>
                  </div>
                </div>

                <div id="changes">
                  <h5 className="text-uppercase mt-3">19. Changes to Terms</h5>
                  <div className="points ">
                    <p className="text-justify mb-2">
                      OYO reserves the right to modify these Terms at any time in its sole discretion. If we make
                      material changes, we will notify you through the Platform, by email, or by other reasonable
                      means. Your continued use of the OYO Platform after any such changes constitutes your
                      acceptance of the modified Terms. If you do not agree to the revised Terms, you must stop
                      using the Platform.
                    </p>
                  </div>
                </div>

                <div id="force-majeure">
                  <h5 className="text-uppercase mt-3">20. Force Majeure</h5>
                  <div className="points ">
                    <p className="text-justify mb-2">
                      OYO is not responsible for delays or failure to provide the Platform or Services caused by
                      events reasonably outside its control, including severe weather, road closures, accidents,
                      emergencies, government restrictions, strikes, utility or network outages.
                    </p>
                  </div>
                </div>

                <div id="severability">
                  <h5 className="text-uppercase mt-3">21. Severability</h5>
                  <div className="points ">
                    <p className="text-justify mb-2">
                      If any provision of these Terms is found to be invalid or unenforceable, the remaining
                      provisions will continue to apply.
                    </p>
                  </div>
                </div>

                <div id="governing-law">
                  <h5 className="text-uppercase mt-3">22. Governing Law</h5>
                  <div className="points ">
                    <p className="text-justify mb-2">
                      These Terms are governed by the laws of Victoria, Australia, and you submit to the
                      non-exclusive jurisdiction of the courts of Victoria.
                    </p>
                  </div>
                </div>

                <div id="contact">
                  <h5 className="text-uppercase mt-3">23. Contact Information</h5>
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
