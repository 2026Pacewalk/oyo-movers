import React from "react";
import Link from "next/link";
import Footer from "@/components/WebAppWrapper/Footer";
import "@/styles/legal.scss";

export default function PrivacyPolicyPage() {
  return (
    <div className="legal-page">
      <section id="privacy-policy">
        <div className="pt-hero">
          <div className="pt-hero-inner">
            <nav className="pt-crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Legal</span>
              <span>/</span>
              <span>Privacy Policy</span>
            </nav>
            <h1 className="pt-title">Privacy Policy</h1>
            <div className="divider"></div>
            <p className="pt-hero-sub">
              How OYO Movers collects, uses and protects your personal information.
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
                  <li><Link href="#collect" className="links">1. Information We Collect</Link></li>
                  <li><Link href="#use" className="links">2. Use of Information</Link></li>
                  <li><Link href="#sharing" className="links">3. Sharing of Information</Link></li>
                  <li><Link href="#phone-calls" className="links">4. Phone Calls</Link></li>
                  <li><Link href="#security" className="links">5. Security of Your Information</Link></li>
                  <li><Link href="#account" className="links">6. Account Registration and Use</Link></li>
                  <li><Link href="#choices" className="links">7. Your Choices</Link></li>
                  <li><Link href="#promotional" className="links">8. Promotional Communications</Link></li>
                  <li><Link href="#updates" className="links">9. Updates to This Policy</Link></li>
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-md-8 col-lg-8 col-xl-8 col-xxl-9">
              <div className="content-section">
                <div id="last-updated">
                  <h6 className="underline font-weight-normal mb-4">
                    <span style={{ fontWeight: "bold", color: "black" }}>Last Updated:</span> 26.02.2026
                  </h6>
                </div>

                <div id="intro">
                  <p className="text-justify">
                    Your privacy is very important to us. We have developed this Policy for you to understand
                    how Oyo Group Pty Ltd. (&quot;Oyo Movers&quot;, &quot;Oyo&quot;, &quot;we&quot;, &quot;us&quot;
                    or &quot;our&quot;) ABN 30 646 236 179 collects, uses, communicates, discloses and makes use
                    of personal information when you use our website, mobile application and other online products
                    and services, or when you otherwise interact with us.
                  </p>
                </div>

                <div id="collect">
                  <h5 className="text-uppercase mt-3">1. Information We Collect</h5>
                  <p className="text-justify font-weight-bold mb-2">We may collect the following types of personal information when you use our App or Services:</p>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>1.1&nbsp;</span><span>Name, email, address, phone number, credit card information.</span></p>
                    <p className="text-justify d-flex mb-2"><span>1.2&nbsp;</span><span>If you register as a Mover or Helper on our site, your personal and account details.</span></p>
                    <p className="text-justify d-flex mb-2"><span>1.3&nbsp;</span><span>Information about your use of our services, such as past orders, transaction data, and feedback about or provided by you.</span></p>
                    <p className="text-justify d-flex mb-2"><span>1.4&nbsp;</span><span>Any additional information related to you that you provide to us directly or indirectly by using our services.</span></p>
                    <p className="text-justify d-flex mb-2"><span>1.5&nbsp;</span><span>We may collect data from third-party partners to analyse user behaviour and improve our services.</span></p>
                  </div>
                </div>

                <div id="use">
                  <h5 className="text-uppercase mt-3">2. Use of Information We Collect</h5>
                  <p className="text-justify font-weight-bold mb-2">We may use information about you for various purposes, which include:</p>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>2.1&nbsp;</span><span>Provide, maintain and improve our Services.</span></p>
                    <p className="text-justify d-flex mb-2"><span>2.2&nbsp;</span><span>Provide, communicate about and deliver the products and services you request, process transactions and send you related information, including confirmations and Tax Invoices.</span></p>
                    <p className="text-justify d-flex mb-2"><span>2.3&nbsp;</span><span>Link or combine with information we get from others to help understand your needs and provide you with better service.</span></p>
                    <p className="text-justify d-flex mb-2"><span>2.4&nbsp;</span><span>We may use your information to comply with legal obligations, resolve disputes, and enforce our agreements.</span></p>
                  </div>
                </div>

                <div id="sharing">
                  <h5 className="text-uppercase mt-3">3. Sharing of Information</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>3.1&nbsp;</span><span>We do not sell your personal information to third parties.</span></p>
                    <p className="text-justify d-flex mb-2"><span>3.2&nbsp;</span><span>We may share your information with service providers to enable them to perform the service, such as payment gateways to process credit card payments and app developers.</span></p>
                    <p className="text-justify d-flex mb-2"><span>3.3&nbsp;</span><span>Where a booking is made through an affiliate or referral partner, OYO Movers may share limited booking information with that affiliate to confirm referrals and calculate commissions. This may include the job reference number, customer first name (where applicable), booking date, booking status, and commission amount. OYO does not share customer contact details, addresses, payment information, or other sensitive personal information with affiliates. All customer information remains managed by OYO in accordance with applicable privacy laws and this privacy policy.</span></p>
                    <p className="text-justify d-flex mb-2"><span>3.4&nbsp;</span><span>If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property and safety of OYO or others.</span></p>
                    <p className="text-justify d-flex mb-2"><span>3.5&nbsp;</span><span>We share your information with some large companies who work worldwide, and some countries may not have the same privacy laws as those set in this privacy policy with the Australian Privacy Principles. We may not require organisations to which we disclose personal information in those countries to comply with similar privacy laws and, accordingly, your personal information may not receive the same protections that it would in Australia.</span></p>
                    <p className="text-justify d-flex mb-2"><span>3.6&nbsp;</span><span>We may share your information with government agencies, if required by law or in response to valid requests by public authorities.</span></p>
                  </div>
                </div>

                <div id="phone-calls">
                  <h5 className="text-uppercase mt-3">4. Phone Calls</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>4.1&nbsp;</span><span>Calls to our service number may be recorded or monitored for quality, verification and training purposes.</span></p>
                    <p className="text-justify d-flex mb-2"><span>4.2&nbsp;</span><span>If you do not wish to have your call recorded, you will be given the option to either end the call or ask to be transferred to another line where monitoring or recording does not take place.</span></p>
                  </div>
                </div>

                <div id="security">
                  <h5 className="text-uppercase mt-3">5. Security of Your Information</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>5.1&nbsp;</span><span>We store Personal Information in electronic form.</span></p>
                    <p className="text-justify d-flex mb-2"><span>5.2&nbsp;</span><span>We take reasonable steps to protect your Personal Information from misuse, interference and loss, as well as unauthorised access, modification or disclosure, and we use a number of physical, administrative, personnel and technical measures to protect your Personal Information. However, we cannot guarantee the security of your Personal Information.</span></p>
                  </div>
                </div>

                <div id="account">
                  <h5 className="text-uppercase mt-3">6. Account Registration and Use</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>6.1&nbsp;</span><span>When you book a job with us, a customer account will be automatically created and registered on our server.</span></p>
                    <p className="text-justify d-flex mb-2"><span>6.2&nbsp;</span><span>Movers and Helpers must register an account to access and use our App and Services, to access, pick and complete moving jobs.</span></p>
                    <p className="text-justify d-flex mb-2"><span>6.3&nbsp;</span><span>Account registration and use is subject to our <a href="/customer-terms" style={{ color: "#2563eb", fontWeight: 500 }}>Customer Terms</a> and <a href="/movers-term" style={{ color: "#2563eb", fontWeight: 500 }}>Mover Terms</a>.</span></p>
                  </div>
                </div>

                <div id="choices">
                  <h5 className="text-uppercase mt-3">7. Your Choices</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>7.1&nbsp;</span><span>You may update, edit or delete your account information at any time by logging into your online account.</span></p>
                    <p className="text-justify d-flex mb-2"><span>7.2&nbsp;</span><span>You can also request us to delete your account by emailing us at <a href="mailto:support@oyomovers.com.au" style={{ color: "#2563eb", fontWeight: 500 }}>support@oyomovers.com.au</a>. However, some information may remain in our records after your account has been deleted.</span></p>
                  </div>
                </div>

                <div id="promotional">
                  <h5 className="text-uppercase mt-3">8. Promotional Communications</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>8.1&nbsp;</span><span>You may opt out of receiving promotional e-mails, push notifications or text messages from OYO Movers by following the instructions in those communications or by adjusting the settings on your mobile device.</span></p>
                    <p className="text-justify d-flex mb-2"><span>8.2&nbsp;</span><span>If you opt out, we may still send you non-promotional communications, such as those about your account, products or services you&apos;ve requested, or our ongoing business relations.</span></p>
                  </div>
                </div>

                <div id="updates">
                  <h5 className="text-uppercase mt-3">9. Updates to This Policy</h5>
                  <div className="points ">
                    <p className="text-justify d-flex mb-2"><span>9.1&nbsp;</span><span>We may update this Privacy Policy from time to time. If we make any changes, we will notify you by revising the &quot;Last Updated&quot; date at the top of the policy and, in some cases, we may provide you with additional notice.</span></p>
                    <p className="text-justify d-flex mb-2"><span>9.2&nbsp;</span><span>We encourage you to read our Terms and Conditions, and Cancellation and Refund Policy before using our services. If you have any questions about this Privacy Policy, please feel free to reach us at <a href="mailto:support@oyomovers.com.au" style={{ color: "#2563eb", fontWeight: 500 }}>support@oyomovers.com.au</a> or call us on <a href="tel:1300 01 31 31" style={{ color: "#18181b", fontWeight: 500 }}>1300 01 31 31</a>.</span></p>
                    <p className="text-justify d-flex mb-2"><span>9.3&nbsp;</span><span>Oyo Group Pty Ltd reserves the right to modify this Privacy Policy at any time. If we make changes, we will notify you through the Services or by other appropriate means.</span></p>
                    <p className="text-justify mt-3">
                      By using our Services, you acknowledge that you have read, understood, and agree to be
                      bound by this Privacy Policy.
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
