import { Image } from "@/components";
import { s3ImageBaseUrl } from "@/config";
import React from "react";

const AverageCost = () => {
  return (
    <div>
      <section className="py-5 bg-theme-2">
        <div className="container py-md-3">
          <div className="row">
            <div className="col-md-12 text-center text-white">
              <h1 className="display-4 font-weight-bold text-theme-1">How Much? </h1>
              <h2 className=" mb-3 h5 text-theme-1">Wow! Not even that much!</h2>
              <p className=" mt-3 text-white">
                {"Much less than you'd expect. The Man’s simple and"}
                <br /> straightforward pricing means you know you’ll be getting value for your hard-earned.
              </p>
              <a className=" mr-2 btn  btn-theme-2 border-light " href="book-now.php">
                Get Free Quote
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 bg-light">
        <div className="container py-4">
          <ul className="nav nav-tabs nav-justified" role="tablist">
            <li className="nav-item ">
              <a className="nav-link active" data-toggle="tab" href="#home">
                Lite Jobs
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#menu1">
                Small Truck
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#menu2">
                Medium Truck
              </a>
            </li>
          </ul>

          <div className="tab-content">
            <div id="home" className="container tab-pane active">
              <br />
              <div className="row">
                <div className="col-md-5 my-auto">
                  <h3>Lite Jobs</h3>
                  <h6 className="mb-4">
                    $50 + $1.60/min
                    <br />
                    <span className="text-theme-1">Few Items</span>
                  </h6>
                  <Image src={s3ImageBaseUrl+"/light-truck-pricing.png"} className="Image-fluid" alt='Image-fluid' />
                </div>
                <div className="col-md-7 mb-md-0 mt-4 ">
                  <Image src="images/price-chart-1.png" className="Image-fluid d-block mx-auto" alt='price' />
                </div>
              </div>
            </div>
            <div id="menu1" className="container tab-pane fade">
              <br />
              <div className="row">
                <div className="col-md-5  my-auto">
                  <h3>Small Truck</h3>
                  <h6 className="mb-4">
                    $70 + $2.80/min
                    <br />
                    <span className="text-theme-1">Few Items & Small Moves</span>
                  </h6>
                  <Image src="images/small-truck-pricing.png" className="Image-fluid" alt='truck' />
                </div>
                <div className="col-md-7 mb-md-0 mt-4">
                  <Image src="images/price-chart-1.png" className="Image-fluid d-block mx-auto" alt='price'/>
                </div>
              </div>
            </div>
            <div id="menu2" className="container tab-pane fade">
              <br />
              <div className="row">
                <div className="col-md-5  my-auto">
                  <h3>Medium Truck</h3>
                  <h6 className="mb-4">
                    $80 + $3.20/min
                    <br />
                    <span className="text-theme-1">1-2 Bedrooms</span>
                  </h6>
                  <Image src="images/medium-truck-pricing.png" className="Image-fluid" alt='img' />
                </div>
                <div className="col-md-7 mb-md-0 mt-4">
                  <Image src="images/price-chart-1.png" className="Image-fluid d-block mx-auto" alt='img' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AverageCost;
