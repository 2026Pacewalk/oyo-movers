'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/WebAppWrapper/Footer';
import './become-a-mover.scss';

export default function BecomeAMover() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const vehicleTrackRef = useRef<HTMLDivElement>(null);

  const toggleItem = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  useEffect(() => {
    const vehicleTrack = vehicleTrackRef.current;
    if (!vehicleTrack) return;

    // Add CSS animation class after a small delay to ensure DOM is ready
    setTimeout(() => {
      vehicleTrack.classList.add('marquee-animation');
      console.log('Marquee animation added'); // Debug log
    }, 100);

    // Pause on hover
    const handleMouseEnter = () => {
      vehicleTrack.classList.add('marquee-paused');
    };

    const handleMouseLeave = () => {
      vehicleTrack.classList.remove('marquee-paused');
    };

    vehicleTrack.addEventListener('mouseenter', handleMouseEnter);
    vehicleTrack.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      vehicleTrack.removeEventListener('mouseenter', handleMouseEnter);
      vehicleTrack.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Helper function to highlight phone numbers, emails, and links
  const highlightLinks = (text: string) => {
    // First, replace newlines with <br> to preserve formatting
    let highlighted = text.replace(/\n/g, '<br>');
    
    // Make specific terms bold (as shown in images)
    highlighted = highlighted.replace(/Cover Jobs/g, '<strong>Cover Jobs</strong>');
    highlighted = highlighted.replace(/•/g, '<strong>•  </strong>');
    
    
    // Match phone numbers (1300 XX XX XX, 1300 XXX XXX, +61 X XXXX XXXX, etc.)
    highlighted = highlighted.replace(/(\d{4}\s\d{2}\s\d{2}\s\d{2}|\d{4}\s\d{3}\s\d{3}|\+61\s\d\s\d{4}\s\d{4}|\d{3}\s\d{3}\s\d{3})/g, '<a href="tel:$1" class="highlight-text">$1</a>');
    
    // Match email addresses and make them clickable mailto links
    highlighted = highlighted.replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '<a href="mailto:$1" class="highlight-text">$1</a>');
    
    // Match URLs (http://, https://, www.)
    highlighted = highlighted.replace(/(https?:\/\/[^\s<>]+|www\.[^\s<>]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="highlight-text">$1</a>');
    
    return highlighted;
  };

  const faqData = [
    {
      id: 'faq1',
      question: 'What will I be doing?',
      answer: `All Movers and Helpers operate as independent contractors, assisting customers across the Melbourne region with their delivery and moving needs using their own Furniture Moving Trucks or Vans.

Most jobs involve furniture removals and deliveries. Work may also include Apartment Moves, Office Relocations, Loading and Unloading Trucks or Containers, and transporting items to and from storage facilities. Knowledge of assembling and disassembling furniture is highly beneficial.`
    },
    {
      id: 'faq2',
      question: 'How long does activation take after I apply?',
      answer: `Most applications are reviewed within 1-3 business days.

Our team may contact you if additional information is required (including ID or Stripe verification). Prompt responses will help speed up the approval process.

For assistance, contact moversupport@oyomovers.com.au`
    },
    {
      id: 'faq3',
      question: 'How do I get jobs?',
      answer: `After onboarding, you'll gain access to available jobs in the Cover Jobs tab.

Review the details and accept the jobs that fit your schedule. Staying active and responding quickly increases your chances of securing more bookings and growing your earnings.`
    },
    {
      id: 'faq4',
      question: 'When and how do I get paid?',
      answer: `We use Stripe to securely transfer your earnings directly to your nominated bank account.

Your first payment may take 3-4 business days. After that, payments usually arrive within 1-2 business days, depending on your bank and Stripe processing times.

Payments are released once the job is completed without any issue and the customer's final payment is received. All payments are automatic — no withdrawal request is required.`
    },
    {
      id: 'faq5',
      question: 'What equipment do I need to carry in the truck?',
      answer: `Movers are required to carry essential equipment including:

• Dolly and trolley
• 10-20 moving blankets
• Securing straps / tie-downs
• Shrink wrap
• Basic tool kit
• Cordless drill and driver set (for furniture assembly/disassembly)`
    }
    
  ];

  const vehicleTypes = [
    {
      image: '1man.png',
      label: '1 Man',
      dimensions: null
    },
    {
      image: '2men.png',
      label: '2 Men',
      dimensions: null
    },
    {
      image: '1vann.png',
      label: 'Van',
    },
    {
      image: 'small-truckn.png',
      label: 'Small Truck',
    },
    {
      image: 'medium-truckn.png',
      label: 'Medium Truck',
    },
    {
      image: 'large-truckn.png',
      label: 'Large Truck',
    }
  ];

  // Create many duplicates for truly infinite marquee
  const duplicatedVehicleTypes = [
    ...vehicleTypes, ...vehicleTypes, ...vehicleTypes,
    ...vehicleTypes, ...vehicleTypes, ...vehicleTypes
  ];

  return (
    <div className="bam-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>MOVERS WANTED!</span>
            </div>
            <h1 className="hero-title">
              Earn Money With Your Truck or Van.<br />
              <span style={{ color: "#666", fontWeight: "500", fontSize: "36px" }}> Work Whenever You Want.</span>
            </h1>
            {/* <p className="hero-subtitle">
              <strong>Don&apos;t have a Van or Box Truck?</strong> <a href= "#" style={{color:"#000", textDecoration: "underline"}}>Apply as a Helper!</a>
            </p> */}
          </div>

          {/* Role Selection Cards */}
          <div className="role-selection">
            <div className="role-cards">
              <Link href="/become-mover" className="role-card mover-card">
                <div className="role-icon">
                  <img
                    src="/images/become-a-mover-icon.png" 
                    alt="Become a Mover" 
                  />
                </div>
                <h3 className="role-title">Become a Mover</h3>
                <p className="role-description">🚚 Vehicle + 💪 Muscles</p>
                <button className="role-button mover-button">Apply Now</button>
              </Link>

                {/* <div className="or-divider">
                  <span>OR</span>
                </div>

                <Link href="tel:1300 01 31 31" className="role-card helper-card">
                  <div className="role-icon">
                    <img
                      src="/images/become-a-helper-icon.png" 
                      alt="Become a Helper" 
                    />
                  </div>
                  <h3 className="role-title">Become a Helper</h3>
                  <p className="role-description">💪 Muscles only</p>
                  <button className="role-button helper-button">Helper Sign-Up</button>
                </Link> */}
            </div>
          </div>
        </div>
      </section>

      {/* What You Need Section */}
      <section className="what-you-need">
        <div className="container">
          <h2 className="section-heading become-a-mover-heading">
            What you <span className="underlined">need to</span> get started
          </h2>
          <div className="need-grid">
            <div className="need-item">
              <div className="need-icon">
                <img src="/images/box-truck.png" alt="Box Truck or a Van" />
              </div>
              <h3>A Box Truck or a Van</h3>
              <p>Don't have one? You can start as helper!</p>
            </div>
            <div className="need-item">
              <div className="need-icon">
                <img src="/images/strong-man.png" alt="Strong & Physically Fit" />
              </div>
              <h3>Strong & Physically Fit</h3>
              <p>Think of it as a heavy sofa, or a tallboy</p>
            </div>
            <div className="need-item">
              <div className="need-icon">
                <img src="/images/license.png" alt="Full Australian Driver's Licence" />
              </div>
              <h3>Full Australian Driver's Licence</h3>
              <p>Don't have one? You can start as helper!</p>
            </div>
            <div className="need-item">
              <div className="need-icon">
                <img src="/images/insurance.png" alt="Relevant Insurance" />
              </div>
              <h3>Relevant Insurance</h3>
              <p>Have liability Insurance or willing to purchase</p>
            </div>
            <div className="need-item">
              <div className="need-icon">
                <img src="/images/smartphone.png" alt="Smart Phone" />
              </div>
              <h3>Smart Phone</h3>
              <p>A recent model Phone is required</p>
            </div>
            <div className="need-item">
              <div className="need-icon">
                <img src="/images/abn.png" alt="Australia Business Number" />
              </div>
              <h3>Australia Business Number</h3>
              <p>Must have ABN or willing to have one.</p>
            </div>
          </div>
        </div>
      </section>

      {/* We Are Looking For Section */}
      <section className="looking-for">
        <div className="container">
          <h2 className="section-heading-underline">We are Looking for</h2>
          <ul className="looking-list">
            <li>
              <img src="/images/arrow-icon.png" alt="" />
              <span>Honest and Hardworking</span>
            </li>
            <li>
              <img src="/images/arrow-icon.png" alt="" />
              <span>Well-presented and professional</span>
            </li>
            <li>
              <img src="/images/arrow-icon.png" alt="" />
              <span>Solution oriented mindset</span>
            </li>
            <li>
              <img src="/images/arrow-icon.png" alt="" />
              <span>Clean & Maintained vehicles (unbranded)</span>
            </li>
            <li>
              <img src="/images/arrow-icon.png" alt="" />
              <span>A good knowledge of local area and roads.</span>
            </li>
            <li>
              <img src="/images/arrow-icon.png" alt="" />
              <span>Minimum 1 year of experience in removal industry</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Perks Section */}
      <section className="perks-section">
        <div className="container">
          <h2 className="section-title">PERKS WITH OYO</h2>
          <div className="perks-grid">
            <div className="perks-column">
              <div className="perk-item">
                <h3>Flexible Work</h3>
                <p>Accept jobs which suits your schedule, Choose your own Workdays or Workhours</p>
              </div>
              <div className="perk-item">
                <h3>Regular Confirmed Jobs</h3>
                <p>Work available 7 days, All jobs on our app are confirmed leads, you don't need to quote</p>
              </div>
              <div className="perk-item">
                <h3>Stay Fit and Active</h3>
                <p>Being a mover allows you to stay physically fit and active and maintain your fitness.</p>
              </div>
            </div>
            <div className="perks-column income-column">
              <div className="perk-item income-item">
                <h3 style={{ marginTop: "40px" }}>Earn Great Income</h3>
                <p className='margin-pp'>Potential earnings:</p>
                <ul className="earnings-list">
                  <li><span className="check">✓</span> Single Movers - $2,000+</li>
                  <li><span className="check">✓</span> Two-Person Team - $5,000+</li>
                  <li><span className="check">✓</span> Two-Men with Large Truck - $5,000+</li>
                </ul>
                <p className="note">NOTE: Our top earners maximize earnings by accepting all suitable jobs for their vehicle type</p>
              </div>
            </div>
            <div className="perks-column">
              <div className="perk-item">
                <h3>Get Paid Fast</h3>
                <p>Reliable and On-time payments every time within 48 hrs.</p>
              </div>
              <div className="perk-item">
                <h3>You are 100% Supported</h3>
                <p>Run into trouble? Our support team has your back and is just a call away!</p>
              </div>
              <div className="perk-item">
                <h3>Get Big Tips</h3>
                <p>Once people are happy, they'll tip you which means more money</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="faq-title">FAQ&apos;s</h2>
          <div className="divider"></div>
          <div className="faq-list">
            {faqData.map((item) => (
              <div key={item.id} className="faq-item">
                <div
                  className="faq-question"
                  onClick={() => toggleItem(item.id)}
                >
                  {item.question}
                  <span className="faq-toggle">
                    {expandedItems.has(item.id) ? '−' : '+'}
                  </span>
                </div>
                <div className={`faq-answer ${expandedItems.has(item.id) ? 'show' : ''}`}>
                  <p dangerouslySetInnerHTML={{ __html: highlightLinks(item.answer) }}></p>
                </div>
              </div>
            ))}
          </div>
          <p className="faq-link">
            Have questions before applying? See more{' '}
            <Link href="/movers-faqs">Movers FAQ here</Link>
          </p>
        </div>
      </section>

      {/* Vehicle Types Section */}
      <section className="vehicle-types">
        <div className="container-vehicle">
          <div className="vehicle-carousel">
            <div className="vehicle-track" ref={vehicleTrackRef}>
              {duplicatedVehicleTypes.map((vehicle, index) => (
                <div key={index} className="vehicle-item">
                  <div className="vehicle-image-container">
                    <img
                      src={`/images/${vehicle.image}`} 
                      alt={vehicle.label} 
                      className="vehicle-icon"
                    />
                    {/* {vehicle.dimensions && (
                      <div className="dimensions">
                        <div className="dimension-line height">
                          <span className="dimension-text">{vehicle.dimensions.height}</span>
                        </div>
                        <div className="dimension-line length">
                          <span className="dimension-text">{vehicle.dimensions.length}</span>
                        </div>
                    </div>
                    )} */}
                  </div>
                  <button className="vehicle-button">{vehicle.label}</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}