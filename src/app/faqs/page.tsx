'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaPlus, FaXmark } from 'react-icons/fa6';
import Footer from '@/components/WebAppWrapper/Footer';
import './faqs.scss';

export default function FAQs() {
  const [activeItem, setActiveItem] = useState<string | null>('headingOne');

  const toggleItem = (itemId: string) => {
    setActiveItem(activeItem === itemId ? null : itemId);
  };

  useEffect(() => {
    // Add Font Awesome CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);

    return () => {
      // Cleanup on unmount
      document.head.removeChild(link);
    };
  }, []);

  // Helper function to highlight phone numbers, emails, and links
  const highlightLinks = (text: string) => {
    // First, replace newlines with <br> to preserve formatting
    let highlighted = text.replace(/\n/g, '<br>');
    
    // Match phone numbers (1300 XX XX XX, 1300 XXX XXX, +61 X XXXX XXXX, etc.)
    highlighted = highlighted.replace(/(\d{4}\s\d{2}\s\d{2}\s\d{2}|\d{4}\s\d{3}\s\d{3}|\+61\s\d\s\d{4}\s\d{4}|\d{3}\s\d{3}\s\d{3})/g, '<a href="tel:$1" class="highlight-text">$1</a>');
    
    // Match email addresses
    highlighted = highlighted.replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '<span class="highlight-text">$1</span>');
    
    // Match URLs (http://, https://, www.)
    highlighted = highlighted.replace(/(https?:\/\/[^\s<>]+|www\.[^\s<>]+)/g, '<span class="highlight-text">$1</span>');
    
    return highlighted;
  };

  const faqData = [
    {
      id: 'headingOne',
      question: 'What is OYO-App?',
      answer: `OYO app is an on-demand moving and same-day delivery platform connecting users with verified professional movers & independent contractors for house moving, office relocations, furniture deliveries, and junk removals. 

Through OYO, you can quickly select your moving team and truck size, with just a few clicks, either On-Demand (with 60 mins) or schedule in advance.`
    },
    {
      id: 'headingTwo',
      question: 'How do I Book Oyo Movers Service',
      answer: `It's simple! You can schedule a Move anytime by filling Online Booking Form (24x7). Also, our friendly customer service team is available at 1300 01 31 31, between 7 AMto 4 PM.(Mon – Saturday)`
    },
    {
      id: 'headingThree',
      question: 'What truck size and how many movers do I need?',
      answer: `Since every job is different, we use simple formula :- you need same number of movers as the number of bedrooms in your house.

• 1 Bedroom – 2 Movers (Small or Medium Truck)
• 2 Bedroom – 2 Movers (Medium Truck) 
• 3 Bedrooms – 3 Movers (Large Truck)
• 4 Bedrooms – 4 Movers (Large Truck or 2 Trucks)

Other Factors to consider - Job size, property access, distance to the truck, and furniture type. For larger jobs or to speed up the process, booking 3-4 movers with two trucks (multiple bookings) can save both time and money.

Also, If you already have some manpower, you'll need fewer movers.`
    },
    {
      id: 'headingFour',
      question: 'I have lot to move, but large truck can\'t access my property?',
      answer: 'If your property has restricted access (e.g., narrow driveway or low hanging branches), using multiple smaller trucks may be more efficient. They can park closer, reducing carrying distance, time, and overall costs.'
    },
    {
      id: 'headingFive',
      question: 'Which cities does OYO operate?',
      answer: 'Currently OYO operates in Melbourne and Geelong, with plans to expand to more cities soon.'
    },
    {
      id: 'headingSix',
      question: 'How soon can a mover arrive for a last-minute booking',
      answer: 'We\'ll send the nearest available mover as quickly as possible, often within 30 minutes. However, arrival times are not guaranteed and depend on availability, traffic, and distance. You\'ll receive an update once your booking is confirmed.'
    },
    {
      id: 'headingSeven',
      question: 'Can I have multiple stops?',
      answer: `Yes, you can do this any time, you have few options such as:-

• +Add Stops during booking process
• By Login into your Account & edit your booking
• By requesting Movers while they are on your job.`
    },
    {
      id: 'headingEight',
      question: 'Can I schedule multiple bookings?',
      answer: 'Of course! After you schedule your first booking, you can go ahead and schedule as many that meet your needs.They can beat the same time or weeks apart.'
    },
    {
      id: 'headingNine',
      question: 'Are the Movers trained and professional?',
      answer: 'All drivers go through essential induction, background check, industry experience and quality reference check to become an accredited OYO Mover. All Movers require to receive an average of at least 4-star rating from previous customers.'
    },
    {
      id: 'headingTen',
      question: 'Will Movers Disassemble / Reassemble my items?',
      answer: `Our Movers will have the basic tools needed to do most assembly work. If your items need special tools, please have them ready for your Move.

Please Keep in mind that you pay for the time spent, so assembling any items will affect your final price.`
    },
    {
      id: 'heading11',
      question: 'What equipment\'s do the Movers have?',
      answer: 'All Movers Vehicles are equipped with Trolley,Flat Dolly, furniture blankets, tie-down straps to ensure the safety of your items and a basic toolkit for dismantling and reassembling of furniture.'
    },
    {
      id: 'heading12',
      question: 'How do I contact with my mover(s)?',
      answer: 'Once movers are assigned to your job, both your contact details and theirs will be shared. You can then reach out to them directly for any job details or logistics. For additional support, please call our team or email us at support@oyomovers.com.au'
    },
    {
      id: 'heading13',
      question: 'My building requires Certificate of Insurance. Can you provide it?',
      answer: 'Yes! all the Movers carry copy of public liability insurances with them. If you require one in advance, please call us or email us at support@oyomovers.com.au and a copy of our insurance certificate will be sent to you.'
    },
    {
      id: 'heading14',
      question: 'Will the Movers bring my items inside?',
      answer: 'Yes, Oyo offers door-to-door service, meaning movers will pick up and deliver your items to the room of your choice. Make sure the item fits in the desired location. If it doesn\'t due to access issues, inform the movers of an alternative spot (e.g., garage). If you want the item returned to the pickup location, you\'ll be responsible for the return cost.'
    },
    {
      id: 'heading15',
      question: 'What happens if the movers are unable to move some of my items?',
      answer: 'Movers will move all items if it\'s safe and practical. If an item is too heavy, bulky, risky your property has bad access and requires extra equipment or manpower, Insuch scenario, the Movers has the right to decline to move that item.'
    },
    {
      id: 'heading16',
      question: 'What if my items don\'t fit in the truck on moving day?',
      answer: `If space runs out, we have a few options:

 Multiple trips - If pickup and drop-off are nearby, we can do another trip.
 Prioritize big items - We can move large furniture first and leave smaller items for you to handle later.
 Book an extra truck - You can always book another truck at standard rates through the app to speed up the moving process and save time. (we don't charge extra for last min bookings).

Pro-Tip: Share photos in advance so we can match the right truck size to your move.`
    },
    {
      id: 'heading17',
      question: 'Do I need to organize a parking permit for my move?',
      answer: `If you live in a city or nearby area, it's a good idea to book a parking permit from your local council for truck parking. A medium truck needs 2 parking bays, and a large truck needs 3 bays. If you can't secure a permit, the mover will try to park as close as possible to your entrance.

Note:- Any parking fines or fees will be forwarded to the client and added to the total cost of the job.`
    },
    {
      id: 'heading18',
      question: 'Can movers drop items for recycling / Tip?',
      answer: `We can dispose of rubbish by taking it to the nearest tip, with time charged at our standard rate. The tip fee is added to your final invoice (no markup).

Fees vary by tip, and each has restrictions (e.g., no chemicals or mattresses). If unsure, confirm with the tip.

Please Note: We are unable to remove hazardous materials like asbestos.`
    },
    {
      id: 'heading19',
      question: 'How do I know that my credit card details are safe?',
      answer: 'Oyo Movers does not have access to any credit card information you have entered. We use Stripe - an online banking platform that holds onto your information. Stripe has been audited by a PCI-certified auditor and is certified to PCI Service Provider Level 1. This is the most stringent level of certification available in the payments industry. For more information on this please visit the Stripe website https://stripe.com/docs/security/stripe'
    },
    {
      id: 'heading20',
      question: 'Can I tip my Movers?',
      answer: `Yes, if you'd like to reward your movers for their excellent service, you can provide a cash tip or request movers to add a tip during the final payment process.

While tipping is not mandatory, it's a customary way to show appreciation for a job well done.`
    },
    {
      id: 'heading21',
      question: 'What if my items are damaged during the move?',
      answer: `At OYO Movers, we aim to make your move safe, smooth, and stress-free. In the rare event that an item is damaged, we're committed to resolving the issue fairly and promptly.

If you believe movers are responsible, please email support@oyomovers.com.au with photos and details of the damage. Our support team will review your case and respond within 2-3 business days.

You can also call us at 1300 013 131 to start the claims process. Please keep all damaged items until your claim has been fully resolved.`
    },
    {
      id: 'heading22',
      question: 'I want to report a driver\'s behavior',
      answer: 'We take feedback seriously. Please report any driver-related concerns through the "Report a Driver" option under "Contact Us." Include your job reference and a short description of the incident.'
    },
    {
      id: 'heading23',
      question: 'What happens if I need to cancel or reschedule my booking?',
      answer: 'You can update or cancel your booking anytime via the OYO App, your account portal, or by calling 1300 01 31 31. Most changes are free, but a fee may apply if made within 48 hours of your scheduled time. (See our- cancellation and re-scheduling policy)'
    },
    {
      id: 'heading24',
      question: 'Can I partner with Oyo as a Driver or business?',
      answer: 'Absolutely. If you\'re a Mover or business interested in collaboration, download the mover app and complete the online application.'
    },
    {
      id: 'heading25',
      question: 'What do I do if I have billing issue?',
      answer: 'Your removal list can answer questions about your bill on the day. However, if there\'s a problem, you\'re welcome to call our operations center and we\'ll work with you to a solution.'
    }
  ];

  return (
    <>
      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-hero">
          <div className="faq-hero-inner">
            <span className="faq-badge">FAQs</span>
            <h1 className="faq-title">Frequently Asked Questions</h1>
            <div className="faq-divider"></div>
            <p className="faq-sub">
              Everything you need to know about booking and moving with OYO Movers.
              Can&apos;t find your answer? Call our friendly team on 1300 01 31 31.
            </p>
          </div>
        </div>
        <div className="container">
          <div className="row mt-3">
            <div className="col-md-12">
              <div className="accordion mb-4" id="accordionExample">
                {faqData.map((item, index) => (
                  <div key={item.id} className="card">
                    <div className="card-header p-0" id={item.id}>
                      <a
                        href="javascript:void(0)"
                        className={`text-left ${activeItem === item.id ? '' : 'collapsed'}`}
                        onClick={() => toggleItem(item.id)}
                        aria-expanded={activeItem === item.id}
                        aria-controls={`collapse${item.id}`}
                      >
                        {item.question}
                        <span className="toggle-icon">
                          {activeItem === item.id ? <FaXmark /> : <FaPlus />}
                        </span>
                      </a>
                    </div>
                    <div
                      id={`collapse${item.id}`}
                      className={`collapse ${activeItem === item.id ? 'show' : ''}`}
                      aria-labelledby={item.id}
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <p dangerouslySetInnerHTML={{ __html: highlightLinks(item.answer) }}></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="faq-cta">
                <h3>Still have questions?</h3>
                <p>Our friendly team is here to help, seven days a week.</p>
                <div className="faq-cta-actions">
                  <a href="tel:1300013131" className="faq-btn-primary">Call 1300 01 31 31</a>
                  <Link href="/contact-us" className="faq-btn-ghost">Contact us</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}
