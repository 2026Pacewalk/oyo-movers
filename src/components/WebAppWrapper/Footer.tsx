import "./footer.scss"
import { Image } from '@/components'
import { s3ImageBaseUrl } from '@/config'
import Link from 'next/link'
import React from 'react'
import { FaFacebookF, FaGoogle, FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa'
import { FaTiktok } from "react-icons/fa6"

const Footer = () => {
  return (
    <div className='footer-section'>
      <div className='footer-divider mx-auto'></div>
      <section className="footer text-md-left">
        <div className="footer-container">
          <div className="row">
            <div className="col-md-4  d-flex flex-column align-items-center">
              <a href="">
                <div className="f-logo">
                  <img src="/images/footer-logo.png" alt='img' />
                </div>
              </a>
              <ul className="list-unstyled footer-social d-flex mt-4">
                <li className="list-inline-item">
                  <a href="#" className="text-decoration-none social-icon">
                    <FaFacebookF />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className="text-decoration-none social-icon">
                    <FaTiktok />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className="text-decoration-none social-icon">
                    <FaTwitter />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className="text-decoration-none social-icon">
                    <FaInstagram />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-8">        
              <div className="row d-flex justify-content-around">
                <div className="col-md-3  col-sm-6">
                  <h4 className="text-uppercase  font-weight-bold mt-4 mt-md-0 mb-md-4 mb-3 text-black" style={{ fontWeight: 700, fontSize: '20px', whiteSpace: 'nowrap'}}>HELPFUL LINKS</h4>
                  <ul className="list-unstyled">
                    <li className="mb-2"><a href="/moving-checklist" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}>Moving Checklist</a></li>
                    <li className="mb-2"><a href="/packing-tips" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}> Packing Tips</a></li>
                    <li className="mb-2"><a href="/item-we-take" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}> Item We Take</a></li>
                    <li className="mb-2"><a href="/avg-moving-cost" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}> Avg Moving Cost</a></li>
                    <li className="mb-2"><a href="/how-we-charge" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}> How We Charge</a></li>
                    {/* <li className="mb-2"><a href="/office-relocation" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}> Office Relocation</a></li>
                    <li className="mb-2"><a href="/donation-run" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}> Donation Run </a></li>
                    <li className="mb-2"><a href="/storage-removals" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}> Storage Removals</a></li>
                    <li className="mb-2"><a href="/junk-removal" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}> Junk Removal</a></li>
                    <li className="mb-2"><a href="https://oyomovers.com/new/helping-hands.php" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}> Helping Hands</a></li> */}
                  </ul>
                </div>
                <div className="col-md-3 pl-md-5  col-sm-6">
                  <h4 className="text-uppercase  font-weight-bold mt-4 mt-md-0 mb-md-4 mb-3 text-black" style={{ fontWeight: 700, fontSize: '20px', whiteSpace: 'nowrap'}}>Legal</h4>
                  <ul className="list-unstyled">
                  <li className="mb-2"><a href="/platform-terms" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}>Platform T&C's</a></li>
                  <li className="mb-2"><a href="/customer-terms" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}>Customer T&C's</a></li>
                  {/* <li className="mb-2"><a href="/movers-term" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}>Movers T&C's</a></li> */}
                  <li className="mb-2"><a href="/cancel-policy" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}>Cancellations & Changes</a></li>
                  <li className="mb-2"><a href="/insurance" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}> Insurance</a></li>
                  <li className="mb-2"><a href="/privacy-policy" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}>Privacy Policy</a></li>
                  {/* <li className="mb-2"><a href="/rcti-terms" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}>RCTI Terms</a></li> */}
 

                    {/* <li className="mb-2"><a href="/login" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}>Account Login</a></li>
                    <li className="mb-2"><a href="/booking" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}>Get Estimate</a></li>
                    <li className="mb-2"><a href="/become-mover" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}>Drivers</a></li>
                    <li className="mb-2"><a href="https://oyomovers.com/new/packing-tips.php" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}>Packing Tips</a></li>
                    <li className="mb-2"><a href="https://oyomovers.com/new/moving-checklist.php" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}>Moving Checklist</a></li>
                    <li className="mb-2"><a href="https://oyomovers.com/new/insurance.php" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}>Insurance</a></li> */}
                  </ul>
                </div>

                <div className="col-md-3  col-sm-6">
                  <h4 className="text-uppercase  font-weight-bold mt-4 mt-md-0 mb-md-4 mb-3 text-black" style={{ fontWeight: 700, fontSize: '20px', whiteSpace: 'nowrap'}}>Company</h4>
                  {/* <ul className="list-unstyled">
                <li className="mb-2"><a href="tel:1300 01 31 31" className=" text-decoration-none text-black"><i className="fa fa-phone"></i> Dial: 13-000-1313-1</a></li>
                <li className="mb-2"><a href="mailto:support@oyomovers.com.au" className="text-decoration-none text-black"><i className="fa fa-envelope"></i> Email: support@oyomovers.com.au</a></li>
                <li className="mb-2"><a href="#" className="text-decoration-none text-black"><i className="fa fa-map-marker-alt"></i> 470 St Kilda Road, Melbourne, 3004</a></li>
              </ul>
              <h6 className="font-weight-bold mb-1 text-black"><i className="fa fa-clock"></i> Opening Hours:- </h6>
              <ul className="list-unstyled text-black">
                <li>Mon-Fri:- 7AM - 7PM<br/>
                Sat-Sun:- 8AM- 4PM 
                </li>
              </ul> */}
                  <ul className="list-unstyled">
                    <li className="mb-2"><a href="/become-mover" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}>Become a Mover</a></li>
                    <li className="mb-2"><a href="/login" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}>Customer Portal</a></li>
                    <li className="mb-2"><a href="/prices" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}>Get Estimate</a></li>
                    {/* <li className="mb-2"><a href="/#" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}>Customer Reviews</a></li> */}
                    <li className="mb-2"><a href="/faqs" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}>FAQ&apos;s</a></li>
                    <li className="mb-2"><a href="/contact-us" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}>Contact us</a></li>
                  </ul>

                </div>
                {/* <div className="col-md-3  col-sm px-3">
                  <h4 className="text-uppercase  font-weight-bold mt-4 mt-md-0 mb-md-4 mb-3 text-black" style={{ fontWeight: 700, fontSize: '21px'}}>Extra pages </h4>
                  <ul className="list-unstyled ">
                    <li className="mb-2"><a href="/#" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'  }}>Old Homepage</a></li>
                    <li className="mb-2"><a href="#" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}>Old Pricing Page</a></li>
                    <li className="mb-2"><a href="/#" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}>Affiliate Partners</a></li>
                     <li className="mb-2"><a href="/" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}> Customer Reviews </a></li>
                    <li className="mb-2"><a href="/" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}> FAQ&apos;s  </a></li>
                   <li className="mb-2"><a href="/contact-us" style={{ color: '#222222', fontSize: '14px', fontWeight: '400'}}> Contact us  </a></li> 

                  </ul>
                </div> */}

              </div>
            </div>
          </div>


        </div>
      </section>
      <section style={{ padding: '20px 10px' }} >
        <div className="container py-1">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className=" copyright-text mb-0 copright-text">
                Copyright &copy; 2026 OYO Movers | All rights reserved
              </p>
            </div>
            <div className="col-md-6">
              <ul className="payment-logos d-flex justify-content-center justify-content-md-end mb-0  list-unstyled">
              <li className="list-inline-item py-1"><img src={s3ImageBaseUrl + "/f-logo-2.png"} alt="logo" className="footer-logo-card master-card" /></li>
                <li className="list-inline-item py-1"><img src={s3ImageBaseUrl + "/f-logo-1.png"} alt="logo" className="footer-logo-card visa-p" /></li>
                <li className="list-inline-item py-1"><img src={s3ImageBaseUrl + "/f-logo-3.png"} alt="logo" className="footer-logo-card ammerican-express" /></li>
                {/* <li className="list-inline-item py-1"><img src={s3ImageBaseUrl + "/f-logo-4.png"} alt="logo" className="footer-logo-card elfpos" /></li>*/}
                <li className="list-inline-item py-1"><img src={s3ImageBaseUrl + "/f-logo-5.png"} alt="logo" className="footer-logo-card australia" /></li> 
                <li className="list-inline-item py-1"><img src={s3ImageBaseUrl + "/f-logo-6.png"} alt="logo" className="footer-logo-card recycle" /></li>
              </ul>
            </div>
          </div>

        </div>
      </section></div>
  )
}

export default Footer