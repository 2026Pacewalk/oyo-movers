import React from "react";
import Footer from "@/components/WebAppWrapper/Footer";
import "./rcti-terms.scss";

export default function RctiTermsPage() {
  return (
    <div>
      <section id="rcti-terms" className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1 pt-3">
              <div className="col-md-12 pb-2 pl-0">
                <h2 className="">RCTI Terms</h2>
                <div className="divider mb-3 mx-0"></div>
              </div>

              <h6 className="underline font-weight-normal mb-3">
                <span style={{ fontWeight: "bold", color: "black" }}>
                  Last Updated:
                </span>{" "}
                30.04.2026
              </h6>

              <h4 className="mt-3">1. About these RCTI Terms</h4>
              <div className="points">
                <p className="text-justify mb-2">
                  These RCTI Terms form part of the OYO Movers / Helpers Terms
                  of Use. By submitting the Become a Mover/Helper form, saving
                  details, or using the OYO platform, you agree to these RCTI
                  Terms.
                </p>
              </div>

              <h4 className="mt-3">2. What RCTI means</h4>
              <div className="points">
                <p className="text-justify mb-2">
                  RCTI means Recipient Created Tax Invoice. It means OYO may
                  issue a tax invoice to you for eligible services you provide
                  through the OYO platform.
                </p>
              </div>

              <h4 className="mt-3">3. Your ABN and GST details</h4>
              <div className="points">
                <p className="text-justify mb-2">
                  You confirm that your business name, ABN, address and GST
                  status provided to OYO are correct and up to date. You must
                  tell OYO if your ABN, business details or GST registration
                  status changes.
                </p>
              </div>

              <h4 className="mt-3">4. Authority to issue RCTIs</h4>
              <div className="points">
                <p className="text-justify mb-2">
                  If you are registered for GST, and OYO is also registered for
                  GST, you authorise OYO Group Pty Ltd to issue RCTIs and
                  adjustment notes on your behalf for eligible OYO platform
                  jobs. This may include completed jobs, helper services,
                  cancellation payments, refunds, chargebacks and platform fee
                  adjustments.
                </p>
              </div>

              <h4 className="mt-3">5. If you are not registered for GST</h4>
              <div className="points">
                <p className="text-justify mb-2">
                  If you are not registered for GST, OYO will not issue RCTIs to
                  you. OYO may provide payout statements, payment summaries or
                  other payment records instead.
                </p>
              </div>

              <h4 className="mt-3">6. No separate tax invoice</h4>
              <div className="points">
                <p className="text-justify mb-2">
                  Where OYO issues an RCTI for a platform job, you must not
                  issue a separate tax invoice to the customer or to OYO for
                  the same service.
                </p>
              </div>

              <h4 className="mt-3">7. Accuracy of information</h4>
              <div className="points">
                <p className="text-justify mb-2">
                  OYO prepares RCTIs based on the information you provide and
                  the payment records in the platform. You are responsible for
                  making sure your ABN, GST status and business details are
                  correct. OYO is not liable for any loss, tax issue or penalty
                  caused by incorrect or outdated information provided by you.
                </p>
              </div>

              <h4 className="mt-3">8. Adjustments and corrections</h4>
              <div className="points">
                <p className="text-justify mb-2">
                  If a payment changes after an RCTI is issued, OYO may issue
                  an adjustment note or updated statement. This may happen
                  because of refunds, cancellations, disputes, chargebacks,
                  payment corrections or platform fee adjustments.
                </p>
              </div>

              <h4 className="mt-3">9. Your tax responsibility</h4>
              <div className="points">
                <p className="text-justify mb-2">
                  You are responsible for your own tax obligations, including
                  GST reporting, BAS lodgment, income tax and record keeping.
                  OYO does not provide tax advice and does not withhold tax
                  from your earnings unless required by law.
                </p>
              </div>

              <h4 className="mt-3">10. Records and changes</h4>
              <div className="points">
                <p className="text-justify mb-2">
                  OYO may keep copies of RCTIs, payout statements, adjustment
                  notes and related payment records for accounting, platform,
                  legal and compliance purposes.
                </p>
                <p className="text-justify mb-2">
                  OYO may update these RCTI Terms from time to time. If changes
                  are made, OYO may notify you through the app, dashboard,
                  email or another reasonable method. By continuing to use the
                  OYO platform after the update, you accept the updated RCTI
                  Terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
