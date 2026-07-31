import React from "react";
import Link from "next/link";
import Footer from "@/components/WebAppWrapper/Footer";
import "./cancellation.scss";

export default function CancellationTermPage() {
  return (
    <div>
      <section id="privacy" className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1 pt-3">
              <div className="col-md-12 pb-2 pl-0">
                <h2 className="">Cancellations & Changes Policy</h2>
                <div className="divider mb-3 mx-0"></div>
              </div>

              <h6 className="underline font-weight-normal mb-3">
                <span style={{ fontWeight: "bold", color: "black" }}>Last Updated:</span> 08.04.2026
              </h6>
              <p className="text-justify mb-4">
                This cancellation and refund policy provides information about
                how cancellations, rescheduling and refunds are handled by Oyo
                Group Pty Ltd. By accessing or using our services, you agree to
                abide by this policy.
              </p>

              <h4 className="mt-3 text-uppercase">1. CANCELLATIONS</h4>

              <div className="points ">
                <p className="text-justify d-flex mb-1">
                  <span>1.1&nbsp;&nbsp;</span>
                  <span>
                    <span className="text-black">Prior To 24 Hours - </span>
                   <span  style={{ fontWeight: "bold", color: "black" }}> No Charges</span>
                  </span>
                </p>

                <p className="text-justify d-flex mb-1">
                  <span>1.2&nbsp;</span>
                  <span>
                    <span className="text-black">Less Than 24 Hours - </span>
                   <span  style={{ fontWeight: "bold", color: "black" }}> 1 hour of quoted price.</span>
                  </span>
                </p>

                


                <p className="text-justify d-flex mb-2  ">
                  1.3&nbsp;&nbsp; <span className="text-black">After Starting Job - &nbsp; </span>
                  <span>
                     <span style={{ fontWeight: "bold", color: "black" }}>Minimum 1 hour charge</span>
                     plus any additional cost incurred
                    (e.g.:- working, waiting, or preparation time)
                  </span>
                </p>
                
                <p className="text-justify d-flex mb-2  ">
                 1.4&nbsp;&nbsp; <span className="text-black"> No One at Pickup - &nbsp; </span>
                  <span>
                     <span style={{ fontWeight: "bold", color: "black" }}>1 hour of quoted price. </span>
                      (Movers wait for minimum 15 minutes  
                                         before Cancelling a job) 

                  </span>
                </p>

                
              </div>

              <h4 className="mt-3 text-uppercase">2. CHANGES </h4>

              <div className="points ">
                <p className="text-justify d-flex mb-1">
                  <span>2.1&nbsp;&nbsp;</span>
                  <span>
                    <span className="text-black">Prior to 24 Hrs - </span>
                    <span  style={{ fontWeight: "bold", color: "black" }}>No Charges</span>
                    
                  </span>
                </p>

                

                <p className="text-justify d-flex mb-1">
                  <span>2.2&nbsp;</span>
                  <span>
                    <span className="text-black">Less Than 24 Hrs - </span>
                    <br />
                    <span>
                      {" "}
                      a) Add stop or change address –{" "}
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        {" "}
                        No charge{" "}
                      </span>
                    </span>
                    <br />
                    <span>
                      {" "}
                      b) Change of Date, Timeslot or Vehicle Size -{" "}
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        1 hour of the quoted price.
                      </span>
                    </span>
                  </span>
                </p>
              </div>

              <h4 className="mt-3 text-uppercase">
                3. Cancel By Service Provider
              </h4>

              <div className="points ">
                <p className="text-justify d-flex mb-2">
                  <span>3.1&nbsp;</span>
                  <span>
                    If a Service Provider cancels a scheduled service, we will
                    try to give you as much notice as possible and will
                    endeavour to reallocate your job to another Service Provider
                    as soon as possible. If this is not possible, we will
                    endeavour to reschedule the service at a mutually convenient
                    time.
                  </span>
                </p>

                <p className="text-justify d-flex mb-2">
                  <span>3.2&nbsp;</span>
                  <span>
                    If the rescheduling is not possible or desirable for the
                    customer, a full refund will be provided for any amounts
                    (Deposit) already paid.
                  </span>
                </p>
              </div>

              <Link
                href="/unsafe-job-cancellation"
                style={{ textDecoration: "underline", color: "inherit" }}
                className="unsafe-job-link"
              >
                <h4 className="text-justify d-flex mb-2">Unsafe Job Cancellation By Service Provider</h4>
              </Link>

              <h4 className="mt-3 text-uppercase">4. Refunds</h4>
              <div className="points ">
                <p className="text-justify d-flex mb-2">
                  <span>4.1&nbsp;</span>
                  <span>
                    Refunds for services cancelled by the customer will be processed
                    as per the guidelines in section-1 of this policy
                  </span>
                </p>

                <p className="text-justify d-flex mb-2">
                  <span>4.2&nbsp;</span>
                  <span>
                    For services cancelled by the service provider or OYO, refer to
                    Section-3 of this policy.
                  </span>
                </p>
              </div>

              <h4 className="mt-3 text-uppercase">5. Processing Of Refunds</h4>
              <p className="text-justify text-black mb-3">
                We process refunds immediately; the processing time may vary
                depending on your bank or service provider. (this may take 3-4
                working days)
              </p>

              <p className="text-secondary mb-2">
                We reserve the right to change these Terms at any time, at our sole discretion. If we make changes, we will notify you by
                revising the date at the top of the policy
              </p>

              <p className="text-secondary">
                By using our services, you acknowledge that you have read,
                understood and agree to be bound by this Cancellation,
                Rescheduling and Refund Policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
