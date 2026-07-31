"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaCircle } from "react-icons/fa";
import Footer from "@/components/WebAppWrapper/Footer";
import "./packingTips.scss";

const PackingTips = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="packing-tips-page">
      {/* Hero Banner Section */}
      <section className="hero-banner">
        <div className="hero-content">
        </div>
      </section>

      {/* Breadcrumb Section */}
      {/* <section className="breadcrumb-section">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Packing Tips
            </li>
          </ol>
        </nav>
      </section> */}

      {/* Main Content Section */}
      <section className="packing-tips-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="packing-tips-container">
                <h1 className="packing-tips-title">Packing Tips</h1>
                <div className="packing-tips-divider"></div>
                
                <div className="intro-text">
                  <p className="intro-item">
                    <FaCircle className="bullet-icon" />
                    <span>Always use Professional packing materials, such as Heavy- Duty Moving Boxes (Large and Small), Picture Boxes, Bubble-Wrap, Tape, Markers, Labels, Cutter, Small and Large zip-lock bags. Always buy more to avoid untimely shopping trips.</span>
                  </p>
                  
                  <Link href="/moving-checklist" className="moving-checklist-link">
                    Moving Checklist
                  </Link>
                </div>

                <div className="packing-tips-wrapper">
                  {/* Where to Begin */}
                  <div className="packing-tips-item">
                    <div 
                      className={`packing-tips-header ${activeSection === 'where-to-begin' ? 'active' : ''}`}
                      onClick={() => toggleSection('where-to-begin')}
                    >
                      <span className="packing-tips-title-text">Where to Begin?</span>
                      <span className="packing-tips-icon">
                        {activeSection === 'where-to-begin' ? '×' : '+'}
                      </span>
                    </div>
                    
                    {activeSection === 'where-to-begin' && (
                      <div className="packing-tips-content">
                        <ul className="packing-tips-list">
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">
                              <strong>Start by packing the belongings you use least:</strong> Such as books, CDs, DVDs and items stored in the roof space or garage.
                            </span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">Go room by room. Pack one room at a time,</span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">You can Use vacuum seal bags for out-of-season clothing</span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">Don't take cloths of their Hanger,</span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">Pack items in baskets, laundry bins, or suitcases for easy transport.</span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">Pack a "First Night Box" with bed linen, towels, clothes, medicines and toiletries for all family members.</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* How to Pack a Box */}
                  <div className="packing-tips-item">
                    <div 
                      className={`packing-tips-header ${activeSection === 'how-to-pack-box' ? 'active' : ''}`}
                      onClick={() => toggleSection('how-to-pack-box')}
                    >
                      <span className="packing-tips-title-text">How to Pack a Box?</span>
                      <span className="packing-tips-icon">
                        {activeSection === 'how-to-pack-box' ? '×' : '+'}
                      </span>
                    </div>
                    
                    {activeSection === 'how-to-pack-box' && (
                      <div className="packing-tips-content">
                        <ul className="packing-tips-list">
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">Always Double tape the bottom and single tape on top of boxes.</span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">
                              <strong>Use the right carton -</strong> Pack lighter items in bigger moving boxes and heavier items such as Books, DVD's, office and kitchen items in smaller cartons.
                            </span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">
                              <strong>Distribute weight -</strong> Pack heavy items at the bottom, light items on top.
                            </span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">
                              <strong>Avoid overloading-</strong> Pack boxes to 10-15 kg maximum for easy lifting
                            </span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">
                              <strong>Fill empty space-</strong> Use clothing, towels, or bubble wrap to fill boxes and prevent movement.
                            </span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">
                              <strong>Fill the box to the top -</strong> Half-filled boxes are tend to break/crash.
                            </span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">
                              <strong>Close boxes properly-</strong> Ensure all boxes are securely closed and taped with no items sticking out on top
                            </span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">
                              <strong>Label every box-</strong> Writing contents inside will help you for easy identification.
                            </span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* How to Pack Makeup */}
                  <div className="packing-tips-item">
                    <div 
                      className={`packing-tips-header ${activeSection === 'how-to-pack-makeup' ? 'active' : ''}`}
                      onClick={() => toggleSection('how-to-pack-makeup')}
                    >
                      <span className="packing-tips-title-text">How to Pack Make-up?</span>
                      <span className="packing-tips-icon">
                        {activeSection === 'how-to-pack-makeup' ? '×' : '+'}
                      </span>
                    </div>
                    
                    {activeSection === 'how-to-pack-makeup' && (
                      <div className="packing-tips-content">
                        <ul className="packing-tips-list">
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">If possible, pack makeup in a hard cosmetics case.</span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">Separate liquids, creams, dry items and brushes</span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">Use zip-lock bags to separate eye, lip and nail products.</span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">Use an extra cotton pad or ball in cosmetic cases to help prevent breakage</span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">Put products like self-tan (that stain) in a plastic bag.</span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">To protect brushes, use brush holders or wrap them in tissue paper.</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* How to pack and move my small valuables */}
                  <div className="packing-tips-item">
                    <div 
                      className={`packing-tips-header ${activeSection === 'small-valuables' ? 'active' : ''}`}
                      onClick={() => toggleSection('small-valuables')}
                    >
                      <span className="packing-tips-title-text">How to pack and move my small valuables?</span>
                      <span className="packing-tips-icon">
                        {activeSection === 'small-valuables' ? '×' : '+'}
                      </span>
                    </div>
                    
                    {activeSection === 'small-valuables' && (
                      <div className="packing-tips-content">
                        <p className="packing-tips-text">
                          We recommend you grab all small valuables (e.g., wallets, phones, jewelry, keys, passports etc.) and transport them yourself, to avoid any risk of misplacing them during the move.
                        </p>
                        {/* <p className="packing-tips-text">
                          For your peace of mind all our movers are experienced, and background checked. Once movers finish your moving job, they will show you empty truck to avoid any misunderstandings.
                        </p> */}
                      </div>
                    )}
                  </div>

                  {/* How do I prepare fridge for moving */}
                  <div className="packing-tips-item">
                    <div 
                      className={`packing-tips-header ${activeSection === 'prepare-fridge' ? 'active' : ''}`}
                      onClick={() => toggleSection('prepare-fridge')}
                    >
                      <span className="packing-tips-title-text">How do I prepare fridge for moving?</span>
                      <span className="packing-tips-icon">
                        {activeSection === 'prepare-fridge' ? '×' : '+'}
                      </span>
                    </div>
                    
                    {activeSection === 'prepare-fridge' && (
                      <div className="packing-tips-content">
                        <ul className="packing-tips-list">
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">
                              <strong>Before Moving:</strong> Empty it, clean and defrost it, unplug and disconnect any cables, secure shelves,
                            </span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">
                              <strong>After Moving:</strong> Wait for 3-4 hours to allow its compressor oil to settle before plugging it back in
                            </span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* How to pack and prepare glass for moving */}
                  <div className="packing-tips-item">
                    <div 
                      className={`packing-tips-header ${activeSection === 'pack-glass' ? 'active' : ''}`}
                      onClick={() => toggleSection('pack-glass')}
                    >
                      <span className="packing-tips-title-text">How to pack and prepare glass for moving?</span>
                      <span className="packing-tips-icon">
                        {activeSection === 'pack-glass' ? '×' : '+'}
                      </span>
                    </div>
                    
                    {activeSection === 'pack-glass' && (
                      <div className="packing-tips-content">
                        <p className="packing-tips-text">
                          Whether a picture frame or a glass tabletop, bubble-wrap is your friend for all large glass pieces. It provides much-needed extra protection for the fragile edges.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* How Should I Protect and pack my TV */}
                  <div className="packing-tips-item">
                    <div 
                      className={`packing-tips-header ${activeSection === 'pack-tv' ? 'active' : ''}`}
                      onClick={() => toggleSection('pack-tv')}
                    >
                      <span className="packing-tips-title-text">How Should I Protect and pack my TV?</span>
                      <span className="packing-tips-icon">
                        {activeSection === 'pack-tv' ? '×' : '+'}
                      </span>
                    </div>
                    
                    {activeSection === 'pack-tv' && (
                      <div className="packing-tips-content">
                        <p className="packing-tips-text">
                          It's best to use its original box and foam inserts, as they are specifically designed for protection. If the original packaging isn't available, you can purchase TV-specific moving boxes from local storage or electronics retailers. Before moving, disconnect and pack all cables and accessories to save time during setup.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Tips for Dismantling Furniture */}
                  <div className="packing-tips-item">
                    <div 
                      className={`packing-tips-header ${activeSection === 'dismantling-furniture' ? 'active' : ''}`}
                      onClick={() => toggleSection('dismantling-furniture')}
                    >
                      <span className="packing-tips-title-text">Tips for Dismantling Furniture</span>
                      <span className="packing-tips-icon">
                        {activeSection === 'dismantling-furniture' ? '×' : '+'}
                      </span>
                    </div>
                    
                    {activeSection === 'dismantling-furniture' && (
                      <div className="packing-tips-content">
                        <ul className="packing-tips-list">
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">
                              <strong>Gather tools:</strong> Get screwdrivers, Allen wrenches, or a power drill.
                            </span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">
                              <strong>Take photos:</strong> Capture assembly details for reassembly later.
                            </span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">
                              <strong>Remove loose parts:</strong> Take off cushions, drawers, or shelves.
                            </span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">
                              <strong>Unfasten screws/bolts:</strong> Use the right tool and keep parts in labelled bags.
                            </span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">
                              <strong>Dismantle in sections:</strong> Start with legs, base, or frame.
                            </span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">
                              <strong>Mark components:</strong> Label parts for easy reassembly.
                            </span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet">○</span>
                            <span className="task-text">
                              <strong>Organize hardware:</strong> Store screws and bolts in bags.
                            </span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Moving Do's and Don'ts */}
                  <div className="packing-tips-item">
                    <div 
                      className={`packing-tips-header ${activeSection === 'dos-donts' ? 'active' : ''}`}
                      onClick={() => toggleSection('dos-donts')}
                    >
                      <span className="packing-tips-title-text">Moving Do's and Don'ts</span>
                      <span className="packing-tips-icon">
                        {activeSection === 'dos-donts' ? '×' : '+'}
                      </span>
                    </div>
                    
                    {activeSection === 'dos-donts' && (
                      <div className="packing-tips-content">
                        <h4>Moving Do's:</h4>
                        <ul className="packing-tips-list">
                          <li className="packing-tips-task">
                            <span className="task-bullet-check">✓</span>
                            <span className="task-text">Pack early to avoid last-minute stress.</span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet-check">✓</span>
                            <span className="task-text">Organising someone else to care for little people and pet.</span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet-check">✓</span>
                            <span className="task-text">Protect fragile items with bubble wrap or blankets.</span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet-check">✓</span>
                            <span className="task-text">Keep important documents and valuables with you.</span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet-check">✓</span>
                            <span className="task-text">Disassemble large furniture before moving.</span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet-check">✓</span>
                            <span className="task-text">Hire professionals for heavy or complicated items.</span>
                          </li>
                        </ul>

                        <h4>Moving Don'ts:</h4>
                        <ul className="packing-tips-list">
                          <li className="packing-tips-task">
                            <span className="task-bullet-cross">✗</span>
                            <span className="task-text">Pack early to avoid last-minute stress.</span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet-cross">✗</span>
                            <span className="task-text">Organising someone else to care for little people and pet.</span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet-cross">✗</span>
                            <span className="task-text">Protect fragile items with bubble wrap or blankets.</span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet-cross">✗</span>
                            <span className="task-text">Keep important documents and valuables with you.</span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet-cross">✗</span>
                            <span className="task-text">Disassemble large furniture before moving.</span>
                          </li>
                          <li className="packing-tips-task">
                            <span className="task-bullet-cross">✗</span>
                            <span className="task-text">Hire professionals for heavy or complicated items.</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default PackingTips;