import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/WebAppWrapper/Footer';
import './insurance.scss';
import { FaEnvelope } from "react-icons/fa6";
import { FaPhoneVolume } from "react-icons/fa6";
export default function InsurancePage() {
  return (
    <div>
      <Header />
      <section id="insurance" className="py-4">
        <div className="container-1 insurance-container">
          <div className="row">
            <div className="col-md-12 pb-4">
              <h2>Insurance Policy</h2>
              <div className="divider mb-3 mx-0"></div>
            </div>
            
            {/* Table of Contents */}
            <div className="col-md-4 col-lg-4 col-xl-4 col-xxl-3">
              <div className="table-of-contents">
                <span>Table Of Content</span>
                <ul>
                  <li><Link href="#coverageoverview" className="links">1. Coverage Overview</Link></li>
                  <li><Link href="#coveragelimits" className="links">2. Coverage Limits</Link></li>
                  <li><Link href="#eligibilityforcoverage" className="links">3. Eligibility For Coverage</Link></li>
                  <li><Link href="#exclusions" className="links">4. Exclusions</Link></li>
                  <li><Link href="#claimprocessing" className="links">5. Claim Processing</Link></li>
                  <li><Link href="#modificationstotheterms" className="links">6. Modifications To The Terms</Link></li>
                  <li><Link href="#governanceandjurisdiction" className="links">7. Governance And Jurisdiction</Link></li>
                  <li><Link href="#contactinformation" className="links">8. Contact Information</Link></li>
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-md-8 col-lg-8 col-xl-8 col-xxl-9">
              <div className="content-section">
                <h6 className="underline font-weight-normal mb-4">Last Updated: 11.03.2025</h6>
                <p className="text-justify mb-2">
                  At OYO, we recognize the trust you place in us and our independent Service Providers to handle your items. We are committed to taking all reasonable precautions to ensure that your belongings are delivered safely. This Insurance Policy explains the scope of protection available for items transported through our platform, including any limitations and exclusions that apply.
                </p>

                <div id="coverageoverview">
                  <h5 className="text-uppercase mt-3">1. Coverage Overview</h5>
                  <p className="text-justify">Oyo Provide limited insurance coverage at no additional cost for damage or loss of items during transportation by an authorised Service Provider (Mover) giving you peace of mind.</p>
                  <div className="points pl-3 pl-md-4">
                    <p className="text-justify mb-1">Your move is covered by two forms of insurances:</p>
                    <p className="text-justify d-flex mb-1">
                      <span><span className="font-weight-bold">A. Accidental Damage -</span> Damage to goods moved or scratches & dents to walls of any of the properties involved in the move. <i className="text-secondary font-sm">(Ref:- Clause – 2.1)</i></span>
                    </p>
                    <p className="text-justify d-flex mb-1">
                      <span><span className="font-weight-bold">B. Property & Public Liability Damage -</span> Serious property damage beyond scratches & dents or the injury or death of persons resulting from the move. <i className="text-secondary font-sm">(Ref:- Clause – 2.2)</i></span>
                    </p>
                  </div>
                </div>

                <div id="coveragelimits">
                  <h5 className="text-uppercase mt-3">2. Coverage Limits</h5>
                  <div className="points pl-3 pl-md-4">
                    <p className="text-justify d-flex mb-2">
                      <span>2.1&nbsp;</span>
                      <span><span className="text-black font-weight-bold">Accidental Damage -</span> <span className="text-uppercase">(upto $500 aud) damage to goods moved or scratches & dents to walls of any of the properties involved in the move.</span></span>
                    </p>
                    <p className="text-justify pl-md-4 mb-1">
                      We use professional and experienced movers only but unfortunately damages occasionally happen. After completing thousands of moves, we've found $500 is perfect amount to cover 95% of damage events. We suggest a walk-through of your property prior to completion to check for damage. It is recommended to be informed of any damage before the team leaves the premises to avoid confusions.
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>2.2&nbsp;</span>
                      <span><span className="text-black font-weight-bold">Property & Public Liability Damage –</span> <span className="text-uppercase">(upto 10 million aud) (access apply) this insurance is for serious property damage beyond scratches & dents or the injury or death of persons resulting from the move.</span></span>
                    </p>
                    <p className="text-justify pl-md-4 mb-1">
                      Oyo requires all removalist partners (Movers) to have goods in transit and public liability insurance (10 million AUD minimum) covering the Mover, their staff, and contractors in all regions where they provide Moving Services. This is a requirement for offering services through the Platform. However, Oyo does not guarantee or ensure that a Mover's insurance covers any specific User or is adequate or appropriate for any Move.
                    </p>
                    <p className="text-justify pl-md-4 mb-1">
                      <u>Please Note:-</u> All claims for Property and Public Liability damage will be referred to our removalist partner who supplied the service. Upon notification of a Property & Public Liability Damage event by mover, Oyo will promptly provide you with the partners ABN, direct contact details and our most recent copy of their Certificate of Insurance. Oyo will also instruct the removalist to lodge a claim with their insurer.
                    </p>
                  </div>
                  <p className="border border-dark bg-light rounded-lg py-3 px-4 text-center mt-3 text-italic">
                    Beyond this or for full comprehensive removals insurance, we recommend contacting <a href="https://www.removalsinsurance.com.au/" className="text-black font-weight-bold underline" target="_blank">Carts Insurance</a> at <a href="tel:1300880253" className="text-black font-weight-bold">1300 880 253</a>. For any additional information, please visit <a href="https://www.removalsinsurance.com.au/" className="text-black font-weight-bold underline" target="_blank">www.removalsinsurance.com.au.</a><br />
                    You can also choose your choice of insurer for Content or higher-value insurance.
                  </p>
                </div>

                <div id="eligibilityforcoverage">
                  <h5 className="text-uppercase mt-3">3. Eligibility For Coverage</h5>
                  <div className="points pl-3 pl-md-4">
                    <p className="text-justify d-flex mb-2">
                      <span>3.1&nbsp;&nbsp;</span>
                      <span><span className="font-weight-bold text-black">Covered Items:-</span> The Insurance Policy applies to items that have been properly described, prepared, and documented at the time of booking process, in accordance with our <a href="/platform-terms" className="underline">Terms of Platform Use</a> and guidelines.</span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>3.2&nbsp;&nbsp;</span>
                      <span>Declared Value To be qualify for coverage, customers must provide a complete inventory list including but not limited to item descriptions, estimated value (if item / items are above $1000 AUD), and details of any pre-existing damage.</span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>3.3&nbsp;&nbsp;</span>
                      <span><span className="font-weight-bold text-black">Authorised Service Providers Only:-</span> Insurance coverage is only valid when items are handled by an Oyo authorised service provider through the official platform. If you or anyone representing you assist with loading or unloading, the coverage will be void, and no claims can be made.</span>
                    </p>
                  </div>
                </div>

                <div id="exclusions">
                  <h5 className="text-uppercase mt-3">4. Exclusions</h5>
                  <p>The following exceptions apply and does not cover:</p>
                  <div className="points pl-3 pl-md-4">
                    <p className="text-justify d-flex mb-2">
                      <span>4.1&nbsp;</span>
                      <span><span className="text-black font-weight-bold">Improper Packing or Preparation:-</span> as we don't know what's inside the box and due to defective / inadequate packing or mishandling by customer, prior to handover.</span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>4.2&nbsp;</span>
                      <span><span className="text-black font-weight-bold">Pre-Existing Damage:-</span> Any Damage before pickup & not clearly documented prior to moving. (e.g.- items coming out of storage facility.)</span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>4.3&nbsp;</span>
                      <span><span className="text-black font-weight-bold">Food items:-</span> Vegetable, meat, seafood, beverages, confectionary, foodstuff, flowers or other temperature-controlled goods.</span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>4.4&nbsp;</span>
                      <span><span className="text-black font-weight-bold">Dismantling and Re-assembly:-</span> At your request we may do so however, we do not take responsibility if reassembly is not possible. This may occur due to factors such as nature of material, rusted screws, age, or pre-existing damage.</span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>4.5&nbsp;</span>
                      <span><span className="text-black font-weight-bold">General Wear and Tear:-</span> During the typical moving process, minor scratches, scuffs, or marks may occur on walls, flooring, or furniture due to age or environmental factors.</span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>4.6&nbsp;</span>
                      <span><span className="text-black font-weight-bold">Where You Are Helping Us:-</span> Please be careful with your back while loading / unloading & no insurance applies. (Ref:- One Man jobs)</span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>4.7&nbsp;</span>
                      <span>When damage caused as a result of moving goods under your instructions or against our recommendation.</span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>4.8&nbsp;</span>
                      <span><span className="text-black font-weight-bold">Damage to Goods-</span> Inherent Risky items no matter how carefully they are handled:- e.g. Glass items, Pot Plants, Overweight items of 100 kg+, TV Without Box, Marble, Bonded or Faux Leather, Press-wood Flatpack IKEA or similar Furniture etc.</span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>4.9&nbsp;</span>
                      <span><span className="text-black font-weight-bold">High Value items:-</span> Antiques, artwork, Jewellery, Cash, high value electronics or Musical instruments or any items exceeding maximum accidental coverage limit will not be covered unless prior written agreement is obtained.</span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>4.10&nbsp;</span>
                      <span><span className="text-black font-weight-bold">Unauthorised Services:-</span> Items handled outside of Oyo platform's booking process.</span>
                    </p>
                  </div>
                </div>

                <div id="claimprocessing">
                  <h5 className="text-uppercase mt-3">5. Claim Processing</h5>
                  <p>If you believe our Service Provider is responsible for damages, please contact Oyo Support via <a href="mailto:support@oyomovers.com.au" className="text-primary underline">support@oyomovers.com.au</a> within 3 working days of your completed booking. Claims made after this period will be considered invalid, and the company will not be liable.</p>
                  <div className="points pl-3 pl-md-4">
                    <p className="text-justify d-flex mb-2">
                      <span>5.1&nbsp;</span>
                      <span><span className="text-black font-weight-bold">Submit Supporting documents:-</span> To speed things up, please include photos, purchase receipts and any information you can share about how the damage occurred in your email.
                        <br />
                        <u>Please Note:-</u> This insurance policy doesn't cover indirect, incidental or consequential losses arising from damage or delays (e.g.- lost business opportunities, missed deadlines or emotional distress etc.)
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>5.2&nbsp;</span>
                      <span><span className="text-black font-weight-bold">Claim Assessment:-</span> Oyo will review the claim, can request additional details if required, and determine whether the claim falls within the coverage parameters.
                        <br />
                        <u>Please Note:-</u> Oyo will only initiate an insurance claim if there is no outstanding payments.
                      </span>
                    </p>
                    <p className="text-justify d-flex mb-2">
                      <span>5.3&nbsp;</span>
                      <span><span className="text-black font-weight-bold">Resolution:-</span> <u>For approved claims you will have the option of:-</u></span>
                    </p>
                    <div className="pl-md-4">
                      <p className="text-justify d-flex mb-2">
                        <span>A.&nbsp;</span>
                        <span>Reimbursement of repair costs, Replacement value (upto coverage limit) or a mutually agreed settlement amount. Taking into account market value, depreciation (20% / annum from the purchase date), wear & tear etc.</span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>B.&nbsp;</span>
                        <span>Repairing the damage to as close as possible to its original condition using reputable repairers.</span>
                      </p>
                      <p className="text-justify d-flex mb-2">
                        <span>C.&nbsp;</span>
                        <span>Replacement if a repair cannot be performed (taking into account market value, wear & tear, depreciation). Please note, in this instance the damaged item will be taken away & replaced.</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div id="modificationstotheterms">
                  <h5 className="text-uppercase mt-3">6. Modifications To The Terms</h5>
                  <p>We reserve the right to change these Policy at any time, in its sole discretion in accordance with our <a href="/platform-terms" className="underline">Platform Terms of Use</a>. If we make changes, we will notify you by revising the date at the top of the policy. Continuing use of our services after changes are posted constitutes acceptance of the revised insurance policy.</p>
                </div>

                <div id="governanceandjurisdiction">
                  <h5 className="text-uppercase mt-3">7. Governance And Jurisdiction</h5>
                  <p>Any dispute arising under this Contract shall be governed by the laws of, and shall be determined exclusively by the courts of, the state in which the move is performed</p>
                </div>

                <div id="contactinformation">
                  <h5 className="text-uppercase mt-3">8. Contact Us</h5>
                  <div className="points pl-3 pl-md-4">
                    <p className="text-justify mb-2">If you have any questions or concerns about these Insurance Policy, please contact us at:</p>
                    <p className="text-black">
                      <i className="fa fa-map-marker-alt"></i> (Level-1), 454 Collins Street, Melbourne, VIC 3000<br />
                      <span className="font-weight-bold"><span style={{marginRight: '5px'}}><FaEnvelope /></span>Email:</span> <a href="mailto:support@oyomovers.com.au" className="underline text-primary">support@oyomovers.com.au</a><br />
                      <span className="font-weight-bold"><span style={{marginRight: '5px'}}><FaPhoneVolume /></span>Phone:</span> <a href="tel:1300 01 31 31" className="font-weight-bold text-black">1300 01 31 31</a>
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