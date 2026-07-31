'use client';

import React from 'react';
import Image from 'next/image';
import styles from './how-we-charge.module.scss';
import Footer from '@/components/WebAppWrapper/Footer';

const HowWeChargePage = () => {
  return (
    <div className={styles.howWeChargePage}>
      {/* Header Section with Yellow Background */}
      <section className={styles.headerSection}>
        <div className={styles.container}>
          <div className={styles.headerContent}>
            <h1 className={styles.mainTitle}>How We Charge?</h1>
            <h2 className={styles.subtitle}>Pay As You Go! No Minimum Hours to Book</h2>
            <p className={styles.description}>
              Our prices are simple, and we only charge Half Hour Rates Plus Half Hour Travel for us, with No Minimum Hours to book.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Example Section */}
      <section className={styles.exampleSection}>
        <div className={styles.container1}>
          <div className={styles.exampleContent}>
            <h2 className={styles.exampleTitle}>A Quick Example:</h2>
            <p className={styles.exampleDescription}>
              You&apos;re scheduling <span className={styles.highlightText}>Man With A Truck</span> to move few Items 5 km away from your home, Your price will be as followed:
            </p>

            {/* Pricing Cards */}
            <div className={styles.pricingCards}>
              {/* Callout Travel Card */}
              <div className={styles.pricingCard}>
                <div className={styles.cardContent}>
                  <div className={styles.imageContainer}>
                    <img
                      src="/images/callout-travel.png" 
                      alt="Callout Travel" 
                    />
                  </div>
                  <h3 className={styles.cardTitle}>Callout Travel</h3>
                  <p className={styles.cardDescription}>
                    <span className={styles.price}>$55.</span> This is for the Mover to show up at the pickup location.
                    <span className={styles.note}> (This also includes Fuel cost)</span>
                  </p>
                </div>
                <div className={styles.plusSign}>+</div>
              </div>

              {/* Labour Card */}
              <div className={styles.pricingCard}>
                <div className={styles.cardContent}>
                  <div className={styles.imageContainer}>
                    <img
                      src="/images/two-labour2.png" 
                      alt="Labour" 
                    />
                  </div>
                  <h3 className={styles.cardTitle}>Labour</h3>
                  <p className={styles.cardDescription}>
                    <span className={styles.price}>$55 Per 1/2 Hour x (1 Hr. Worktime)</span><br />
                    (Load → Drive → Unload) <span className={styles.price}>equals $110</span>
                  </p>
                </div>
                <div className={styles.plusSign}>=</div>
              </div>

              {/* Total Card */}
              <div className={styles.pricingCard}>
                <div className={styles.cardContent}>
                  <div className={styles.imageContainer}>
                    <img
                      src="/images/total.png" 
                      alt="Total" 
                    />
                  </div>
                  <h3 className={styles.cardTitle}>Total</h3>
                  <p className={styles.cardDescription}>
                    <span className={styles.totalPrice}>Your total in this example is<br />$165</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Text and CTA */}
            <div className={styles.bottomSection}>
              <p className={styles.pricingNote}>Pricing varies per vehicle and crew size.</p>
              <p className={styles.timeNote}>If you use less time then you pay less & if more time then you pay more</p>
              <a href="/prices" >
              <button className={styles.ctaButton}>
                You can get a free estimate here
              </button>
              </a>
            </div>
          </div>  
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HowWeChargePage;