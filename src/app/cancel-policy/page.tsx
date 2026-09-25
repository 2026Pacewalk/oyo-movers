import React from "react";
import Link from "next/link";
import Footer from "@/components/WebAppWrapper/Footer";
import "@/styles/legal.scss";

export default function CancellationTermPage() {
  return (
    <div className="legal-page">
      <section id="cancel-policy">
        <div className="pt-hero">
          <div className="pt-hero-inner">
            <nav className="pt-crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Legal</span>
              <span>/</span>
              <span>Cancellations &amp; Changes</span>
            </nav>
            <h1 className="pt-title">Cancellations &amp; Changes Policy</h1>
            <div className="divider"></div>
            <p className="pt-hero-sub">
              How cancellations, rescheduling and refunds are handled at OYO Movers.
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
                  <li><Link href="#cancellations" className="links">1. Cancellations</Link></li>
                  <li><Link href="#changes" className="links">2. Changes</Link></li>
                  <li><Link href="#provider-cancel" className="links">3. Cancel by Service Provider</Link></li>
                  <li><Link href="#refunds" className="links">4. Refunds</Link></li>
                  <li><Link href="#processing" className="links">5. Processing of Refunds</Link></li>
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-md-8 col-lg-8 col-xl-8 col-xxl-9">
              <div className="content-section">
                <div id="last-updated">
                  <h6 className="underline font-weight-normal mb-4">
                    <span style={{ fontWeight: "bold", color: "black" }}>Last Updated:</span> 08.04.2026
                  </h6>
                </div>

                <div id="intro">
                  <p className="text-justify">
                    This cancellation and refund policy provides information about how cancellations,
                    rescheduling and refunds are handled by Oyo Group Pty Ltd. By accessing or using our
                    services, you agree to abide by this policy.
                  </p>
                </div>

                <div id="cancellations">
                  <h5 className="text-uppercase mt-3">1. Cancellations</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>1.1&nbsp;</span><span><span className="font-weight-bold">Prior To 24 Hours —</span> No Charges.</span></p>
                    <p className="text-justify d-flex mb-2"><span>1.2&nbsp;</span><span><span className="font-weight-bold">Less Than 24 Hours —</span> 1 hour of quoted price.</span></p>
                    <p className="text-justify d-flex mb-2"><span>1.3&nbsp;</span><span><span className="font-weight-bold">After Starting Job —</span> Minimum 1 hour charge plus any additional cost incurred (e.g. working, waiting, or preparation time).</span></p>
                    <p className="text-justify d-flex mb-2"><span>1.4&nbsp;</span><span><span className="font-weight-bold">No One at Pickup —</span> 1 hour of quoted price. (Movers wait for a minimum of 15 minutes before cancelling a job.)</span></p>
                  </div>
                </div>

                <div id="changes">
                  <h5 className="text-uppercase mt-3">2. Changes</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>2.1&nbsp;</span><span><span className="font-weight-bold">Prior to 24 Hrs —</span> No Charges.</span></p>
                    <p className="text-justify d-flex mb-2"><span>2.2&nbsp;</span><span><span className="font-weight-bold">Less Than 24 Hrs —</span></span></p>
                    <div className="pl-md-4" style={{ marginLeft: "16px" }}>
                      <p className="text-justify d-flex mb-2"><span>a)&nbsp;</span><span>Add stop or change address — <span className="font-weight-bold">No charge.</span></span></p>
                      <p className="text-justify d-flex mb-2"><span>b)&nbsp;</span><span>Change of Date, Timeslot or Vehicle Size — <span className="font-weight-bold">1 hour of the quoted price.</span></span></p>
                    </div>
                  </div>
                </div>

                <div id="provider-cancel">
                  <h5 className="text-uppercase mt-3">3. Cancel by Service Provider</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>3.1&nbsp;</span><span>If a Service Provider cancels a scheduled service, we will try to give you as much notice as possible and will endeavour to reallocate your job to another Service Provider as soon as possible. If this is not possible, we will endeavour to reschedule the service at a mutually convenient time.</span></p>
                    <p className="text-justify d-flex mb-2"><span>3.2&nbsp;</span><span>If rescheduling is not possible or desirable for the customer, a full refund will be provided for any amounts (deposit) already paid.</span></p>
                    <p className="text-justify mb-2">
                      <Link href="/unsafe-job-cancellation" style={{ color: "#2563eb", textDecoration: "underline" }}>
                        Read about Unsafe Job Cancellation by a Service Provider
                      </Link>
                    </p>
                  </div>
                </div>

                <div id="refunds">
                  <h5 className="text-uppercase mt-3">4. Refunds</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>4.1&nbsp;</span><span>Refunds for services cancelled by the customer will be processed as per the guidelines in Section 1 of this policy.</span></p>
                    <p className="text-justify d-flex mb-2"><span>4.2&nbsp;</span><span>For services cancelled by the Service Provider or OYO, refer to Section 3 of this policy.</span></p>
                  </div>
                </div>

                <div id="processing">
                  <h5 className="text-uppercase mt-3">5. Processing of Refunds</h5>
                  <div className="points ">
                    <p className="text-justify mb-2">
                      We process refunds immediately; the processing time may vary depending on your bank or
                      service provider (this may take 3–4 working days).
                    </p>
                    <p className="text-justify mb-2">
                      We reserve the right to change these Terms at any time, at our sole discretion. If we make
                      changes, we will notify you by revising the date at the top of the policy.
                    </p>
                    <p className="text-justify mb-2">
                      By using our services, you acknowledge that you have read, understood and agree to be bound
                      by this Cancellation, Rescheduling and Refund Policy.
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
