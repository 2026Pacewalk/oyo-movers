'use client';

import { useState, useEffect } from 'react';
import Footer from '@/components/WebAppWrapper/Footer';
import './movers-faqs.scss';

export default function MoversFAQs() {
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
    
    // Make specific terms bold (as shown in images)
    highlighted = highlighted.replace(/Cover Jobs/g, '<strong>Cover Jobs</strong>');
    highlighted = highlighted.replace(/•/g, '<strong>•  </strong>');
    highlighted = highlighted.replace(/Start button/g, '<strong>Start button</strong>');
    highlighted = highlighted.replace(/first-come, first-accepted basis/g, '<strong>first-come, first-accepted basis</strong>');
    
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
      id: 'headingOne',
      question: 'What will I be doing?',
      answer: `All Movers and Helpers operate as independent contractors, assisting customers across the Melbourne region with their delivery and moving needs using their own Furniture Moving Trucks or Vans.

Most jobs involve furniture removals and deliveries. Work may also include Apartment Moves, Office Relocations, Loading and Unloading Trucks or Containers, and transporting items to and from storage facilities. Knowledge of assembling and disassembling furniture is highly beneficial.`
    },
    {
      id: 'headingTwo',
      question: 'What are the requirements to become a Mover with OYO?',
      answer: `To become an OYO contractor, you must:
• Be 18+ years of age
• Hold a valid Full Australian Driver's License
• Have a reliable and insured Box Truck or Van
• Have (or be willing to obtain) Public Liability Insurance
• Have an Android or iOS smartphone
• Be able to pass a background check
• Be physically fit for heavy lifting
• Have an Australian Bank Account to receive payments`
    },
    {
      id: 'headingThree',
      question: 'How long does activation take after I apply?',
      answer: `Most applications are reviewed within 1-3 business days.

Our team may contact you if additional information is required (including ID or Stripe verification). Prompt responses will help speed up the approval process.

For assistance, contact moversupport@oyomovers.com.au`
    },
    {
      id: 'headingFour',
      question: 'How do I get jobs?',
      answer: `After onboarding, you'll gain access to available jobs in the Cover Jobs tab.

Review the details and accept the jobs that fit your schedule. Staying active and responding quickly increases your chances of securing more bookings and growing your earnings.`
    },
    {
      id: 'headingFive',
      question: 'A Cover Job disappeared - what happened?',
      answer: `If a job disappears before you accept it, another mover has already accepted it.

 Jobs operate on a first-come, first-accepted basis. The mover who opens and accepts the job first secures it. Keep notifications on and respond quickly to maximise your opportunities.`
    },
    {
      id: 'headingSix',
      question: 'When and how do I get paid?',
      answer: `We use Stripe to securely transfer your earnings directly to your nominated bank account.

Your first payment may take 3-4 business days. After that, payments usually arrive within 1-2 business days, depending on your bank and Stripe processing times.

Payments are released once the job is completed without any issue and the customer's final payment is received. All payments are automatic — no withdrawal request is required.`
    },
    {
      id: 'headingSeven',
      question: 'How much should I be able to lift?',
      answer: `Movers should be physically fit and able to lift heavy furniture safely. Most heavier items are handled using team lifting techniques or appropriate equipment.`
    },
    {
      id: 'headingEight',
      question: 'What equipment do I need to carry in the truck?',
      answer: `Essential equipment includes:
• Dolly and trolley
• 10-20 moving blankets
• Securing straps / tie-downs
• Shrink wrap
• Basic tool kit
• Cordless drill and driver set (for furniture assembly/disassembly)`
    },
    {
      id: 'headingNine',
      question: 'How do I start a job?',
      answer: `• The "Start button" will appear in the Mover-App once you arrive at the pickup location.
• Press 'Start Job', and an Authorisation form will appear for the customer to sign.
• After the customer signs, press 'Save' to begin the job timer.

•You can edit Authorising Person details using the 'Edit' button.
•You can also 'Skip' the Authorisation Form, but this is not recommended, as it's your responsibility.`
    },
    {
      id: 'headingTen',
      question: 'How do I take a break during a job?',
      answer: `Tap the 'Break button' on the home screen to take a break during a job. This will pause the job timer, and break time will not be billed to the customer.
       It is strongly recommended to inform the customer before taking a break.`
    },
    {
      id: 'heading11',
      question: 'How do I cancel an accepted job?',
      answer: `In the Mover App:
1. Go to My Schedule Bookings
2. Select the job
3. Tap Job Details
4. Cancel and provide a reason

Cancelling Job may reduce your acceptance rating and impact your priority for future bookings.`
    },
    {
      id: 'heading12',
      question: 'My truck broke down — what should I do?',
      answer: `1. Ensure you are in a safe location
2. If on a busy road, remain inside the vehicle and contact emergency services if required
3. Contact your mechanic
4. Inform your customer and OYO Support immediately`
    },
    {
      id: 'heading13',
      question: 'How do reviews and ratings work?',
      answer: `After each completed job, customers can rate your service using a 5-star rating system. 
      
      Maintaining a high rating improves your visibility and priority for future job offers. Accounts with ratings below 4 stars may receive lower priority on the OYO platform.`
    },
    {
      id: 'heading14',
      question: 'Have more questions?',
      answer: `Contact us at moversupport@oyomovers.com.au`
    }
  ];

  return (
    <>
      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading text-center mb-3">
                <span className="mini-title">
                  <i className="fa-regular fa-star"></i>&nbsp; Movers FAQ&apos;s
                </span>
                <h2 className="text-center h1 text-uppercase heading-md">
                  Frequently Asked Questions
                </h2>
              </div>
            </div>
          </div>
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
                          {activeItem === item.id ? '×' : '+'}
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
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}

