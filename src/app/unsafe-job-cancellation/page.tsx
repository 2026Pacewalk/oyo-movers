import React from "react";
import Footer from "@/components/WebAppWrapper/Footer";
import "../cancel-policy/cancellation.scss";

export default function UnsafeJobCancellationPage() {
  return (
    <div>
      <section id="privacy" className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1 pt-3">
              <div className="col-md-12 pb-2 pl-0">
                <h2>Unsafe Job Cancellation</h2>
                <div className="divider mb-3 mx-0"></div>
              </div>

              <p className="text-justify mb-4">
                If a service provider believes a job is unsafe, illegal, or
                materially different from the booking details, they may refuse,
                pause, or cancel the job. This may include:
              </p>

              <ul className="mb-4" style={{ paddingLeft: "1.5rem", fontSize: "18px", lineHeight: "1.6", color: "#666", fontWeight: 500 }}>
                <li className="mb-2">
                  Aggressive, threatening, abusive, or unsafe behaviour by the
                  customer or any person at the site
                </li>
                <li className="mb-2">
                  Unsafe access to pickup or delivery location
                </li>
                <li className="mb-2">
                  Dangerous stairs, steep driveway, narrow access, unstable
                  floor, wet or slippery surface, or blocked pathway
                </li>
                <li className="mb-2">
                  No safe parking or loading zone available
                </li>
                <li className="mb-2">
                  Items too heavy, oversized, fragile, or unsafe to move safely
                  with the assigned team or vehicle
                </li>
                <li className="mb-2">
                  Prohibited, dangerous, hazardous, illegal, or restricted goods
                </li>
                <li className="mb-2">
                  Customer not present or unable to provide safe access
                </li>
                <li className="mb-2">
                  Incorrect booking details that make the job unsafe or
                  unsuitable
                </li>
                <li className="mb-2">
                  Payment issues where pre-payment is required under OYO payment
                  terms, including big moves, long-distance jobs, late-hour
                  jobs, or other jobs where payment must be confirmed before the
                  move can safely proceed
                </li>
                <li className="mb-2">
                  Other genuine safety risks: including weather, traffic, site,
                  building or other conditions that make the job unsafe to
                  continue
                </li>
              </ul>

              <p className="text-justify mb-4">
                A cancellation fee may apply if the unsafe condition was caused
                by incorrect, incomplete, or misleading information provided by
                the customer, or if the customer failed to provide safe access
                or suitable job conditions.</p>
                <p className="text-justify mb-4"> If the unsafe issue was not caused
                by the customer, OYO may choose not to charge a cancellation fee
                or may offer to reschedule the job, depending on the
                circumstances.
              </p>

              <p className="text-justify mb-4">
                If a customer believes the job was incorrectly marked unsafe or
                a cancellation fee was incorrectly charged, the customer may
                contact OYO support for review. OYO may request photos, call
                records, mover notes, booking details, and any other relevant
                information before making a final decision.</p>
                <p className="text-justify mb-4"> OYO&apos;s decision
                will be based on safety, fairness, available evidence, and the
                booking terms.
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
