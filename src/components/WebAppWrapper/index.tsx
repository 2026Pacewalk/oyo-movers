import React from "react";
import Footer from "./Footer";
import "../../styles/custom.scss";

const WebAppWrapper = ({ children }: any) => {
  return (
    <div className={`oyo-landing-page`}>
      {children}
      <Footer />
    </div>
  );
};

export default WebAppWrapper;
