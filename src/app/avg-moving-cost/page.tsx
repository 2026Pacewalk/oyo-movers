'use client';

import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/WebAppWrapper/Footer';
import './AvgMovingCost.scss';

export default function AvgMovingCost() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-image">
              <Image
                src="/images/average-moving.png"
                alt="Average Moving Cost"
                width={200}
                height={200}
                className="img-fluid"
              />
            </div>
            <div className="hero-text">
              <h1>How Much do Removalists Cost?</h1>
              <div className="divider"></div>
              <p>The cost mainly depends on<br />amount of furniture and total distance to be covered.</p>
              <div className="hero-buttons">
                <Link href="/prices" className="btn btn-primary">
                  Get a Quote
                </Link>
                <Link href="/booking" className="btn btn-secondary">
                  Book OYO
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tables Section */}
      <section className="tables-section">
        <div className="table-container">
          {/* House Moving Cost Table */}
          <div className="cost-table">
            <div className="table-header">
              <h2>Avg. <span className="highlight">House Moving</span> Cost</h2>
              <p>When Packing is done and ready to move.</p>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Residential Size</th>
                    <th>Total Size / Space req.</th>
                    <th>Avg. Time for Loading / Moving / Unloading</th>
                    <th>Average Moving Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Studio</td>
                    <td>7 - 10 m³</td>
                    <td>1.5 - 2 hrs</td>
                    <td>$300 - $375 </td>
                  </tr>
                  <tr>
                    <td>1 BR Apartment</td>
                    <td>10 - 12 m³</td>
                    <td>2 - 4 hrs</td>
                    <td>$375 - $675 </td>
                  </tr>
                  <tr>
                    <td>2 BR Apartment</td>
                    <td>16 - 20 m³</td>
                    <td>3 - 5 hrs</td>
                    <td>$510 - $850 </td>
                  </tr>
                  <tr>
                    <td>3 BR Apartment</td>
                    <td>30 - 32 m³</td>
                    <td>5 - 8 Hrs </td>
                    <td>$950 - $1520 </td>
                  </tr>
                  <tr>
                    <td>2 BR House</td>
                    <td>20 - 25 m³</td>
                    <td>4 - 5 hrs</td>
                    <td>$680 - $850 </td>
                  </tr>
                  <tr>
                    <td>3 BR House</td>
                    <td>30 - 35 m³</td>
                    <td>6 - 8 hrs</td>
                    <td>$1140 - $1900 </td>
                  </tr>
                  <tr>
                    <td>4 + BR House</td>
                    <td>40 - 50 m³</td>
                    <td>8 -10 hrs / Full Day</td>
                    <td>$1520 - $1900+ </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Office Relocation Cost Table */}
          <div className="cost-table">
            <div className="table-header">
              <h2>Avg. <span className="highlight">Office Relocation</span> Cost</h2>
              <p>When Packing is done and ready to move.</p>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Office Size</th>
                    <th>Total Size / Space req.</th>
                    <th>Avg. Time for Loading / Moving / Unloading</th>
                    <th>Average Moving Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Small Office (2-3 Staff)</td>
                    <td>7-10 m³</td>
                    <td>2 – 3 hrs</td>
                    <td>$300 - $450 </td>
                  </tr>
                  <tr>
                    <td>Medium Office (5-9 Staff)</td>
                    <td>16 - 20 m³</td>
                    <td>4 - 6 hrs</td>
                    <td>$680 - $1140 </td>
                  </tr>
                  <tr>
                    <td>Large Office (10+ Staff)</td>
                    <td>40 - 50 m³</td>
                    <td>6-10 hrs / Full Day</td>
                    <td>$1140 - $1900+ </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Few Items, Store Delivery, Donation Run Table */}
          <div className="cost-table">
            <div className="table-header">
              <h2>Average cost <span className="highlight">for Moving Few Items </span></h2>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Movers Req.</th>
                    <th>Total Size / Space req.</th>
                    <th>Avg. Time for Loading / Moving / Unloading</th>
                    <th>Average Moving Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1 Man & Truck</td>
                    <td>1-2 m³</td>
                    <td>20 - 50 mins</td>
                    <td>$110 - $165 </td>
                  </tr>
                  <tr>
                    <td>2 Men & Truck</td>
                    <td>1-2 m³</td>
                    <td>20 - 50 mins</td>
                    <td>$150 - $225 </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Helping Hands Cost Table */}
          <div className="cost-table">
            <div className="table-header">
              <h2>Average <span className="highlight">Helping Hands</span> Cost</h2>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Muscles Req.</th>
                    <th>Minimum Time.</th>
                    <th>Avg. Help Time</th>
                    <th>Avg. Moving Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1 Man (2 Hands)</td>
                    <td>2 hrs</td>
                    <td>2 - 4 hrs</td>
                    <td>$120 - $240</td>
                  </tr>
                  <tr>
                    <td>2 Men (4 Hands)</td>
                    <td>2 hrs</td>
                    <td>2 - 4 hrs</td>
                    <td>$240 - $480</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Junk Removal Cost Table */}
          <div className="cost-table">
            <div className="table-header">
              <h2>Average <span className="highlight">Junk Removal</span> Cost</h2>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Muscles Req.</th>
                    {/* <th>Minimum Time.</th> */}
                    <th>Avg. Help Time</th>
                    <th>Avg. Moving Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1 Man (2 Hands)</td>
                    {/* <td>2 hrs</td> */}
                    <td>2 - 4 hrs</td>
                    <td>$220 - $440 <span className="tip-fee">+ Tip Fee</span></td>
                  </tr>
                  <tr>
                    <td>2 Men (4 Hands)</td>
                    {/* <td>2 hrs</td> */}
                    <td>2 - 4 hrs</td>
                    <td>$340 - $680 <span className="tip-fee">+ Tip Fee</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Factors affecting moving cost */}
          <div className="factors-section">
            <div className="factors-header">
              <h3>Factors affecting moving cost:-</h3>
            </div>
            <div className="factors-content">
              <div className="factors-grid">
                <div className="factor-column">
                  <ul>
                    <li>Property Type</li>
                    <li>Size and Volume of Goods.</li>
                    <li>Ground floor, Stairs, or Elevators</li>
                    <li>Number of Movers</li>
                  </ul>
                </div>
                <div className="factor-column">
                  <ul>
                    <li>Walking Distance from Parked Vehicles</li>
                    <li>Property Access</li>
                    <li>Dismantling and Reassembling</li>
                    <li>Packing and Unpacking Service</li>
                  </ul>
                </div>
                <div className="factor-column">
                  <ul>
                    <li>Waiting time</li>
                    <li>Vehicle Type</li>
                    <li>Moving Insurance</li>
                    <li>Weather</li>
                  </ul>
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