import React from "react";
import "./heading.scss";

interface HeadingSectionProps {
  buttonLabel: string;
  mainHeading: string;
  subHeading: string;
}

const HeadingSection: React.FC<HeadingSectionProps> = ({
  // buttonLabel,
  mainHeading,
  subHeading,
}) => {
  return (
    <section className="how-it-works-section text-center">
      {/* <button className="btn btn-outline-primary how-it-works-btn"> {buttonLabel}</button> */}
      <h2 className="mainsub-heading">{mainHeading}</h2>
      <div className="divider"></div>
      <p className="subheading">{subHeading}</p>
    </section>
  );
};

export default HeadingSection;
