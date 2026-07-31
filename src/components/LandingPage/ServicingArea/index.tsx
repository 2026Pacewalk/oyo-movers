import React from 'react';
import './Servicingarea.scss';
import HeadingSection from '../Heading';

const ServicingArea: React.FC = () => {
  return (
    <section className="servicingArea">
     
        {/* <button className={styles.tag}>⭐ Service Areas</button> */}
       <HeadingSection buttonLabel="
Service Areas"  mainHeading="Currently we are Servicing
"  subHeading="We provide professional moving services across major Australian cities. Our experienced team is ready to help you relocate anywhere within our service areas.

"/>
   <div className='mapservice'>
   <img src='/map.png' />
   </div>
    </section>
  );
};

export default ServicingArea;
