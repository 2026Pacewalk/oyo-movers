"use client";
import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { Container, Row } from "react-bootstrap";
import Image from "../Image";
import UserMenu from "./UserMenu";
import ToggleDrawerButton from "./ToggleDrawerButton";
import { FaPhoneVolume, FaTruck, FaUser } from "react-icons/fa6";
import { IoMenuSharp } from "react-icons/io5";
import { BiSolidPhoneCall } from "react-icons/bi";
import { s3ImageBaseUrl, tokenKey } from "@/config";
const bookingPage = [
  "/profile",
  "/account-settings",
  "/booking-list",
  "/re-book",
  "/notification",
  "/login",
  "/signup",
  "/mover-login",
  "/booking",
  "/become-mover",
  "/fast-booking",
  "/forgot-password",
  "/verify-otp",
  "/payment",
  "/logout",
  "/become-mover/email-confirmation",
];
const Navbar = ({ isLogedIn, data }: any) => {
  const pathName = usePathname();
  const [showHeader, setShowHeader] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const router = useRouter();

  const getClientCookie = (name: string): string | null => {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  };

  // const handleBecomeMoverClick = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   try {
  //     const token = getClientCookie(tokenKey);
  //     if (!token) {
  //       router.push("/become-mover");
  //       return;
  //     }
  //     let role: string | undefined;
  //     let name: string | undefined;
  //     try {
  //       const payload = JSON.parse(atob(token.split(".")[1] || ""));
  //       role = payload?.role;
  //       name = payload?.name || payload?.email || "Oyo mover";
  //     } catch {}

  //     if (role === "mover") {
  //       router.push(`/become-mover?step=3&token=${token}&name=${encodeURIComponent(name || "Oyo mover")}`);
  //     } else {
  //       router.push("/become-mover");
  //     }
  //   } catch {
  //     router.push("/become-mover");
  //   }
  // };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScroll = window.scrollY;
  //     
  //     // Disable scroll animations on mobile (screen width <= 991px)
  //     if (window.innerWidth <= 991) {
  //       setShowHeader(true);
  //       setLastScroll(currentScroll);
  //       return;
  //     }
  //     
  //     if (currentScroll < 50) {
  //       setShowHeader(true);
  //     } else if (currentScroll > lastScroll) {
  //       setShowHeader(false);
  //     } else {
  //       setShowHeader(true);
  //     }
  //     
  //     setLastScroll(currentScroll);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   window.addEventListener('resize', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //     window.removeEventListener('resize', handleScroll);
  //   };
  // }, [lastScroll]);

  const landingHeader = () => {
    return (
      <div className="oyo-landing-page">
        <WebNavbar isLogedIn={isLogedIn} data={data} />
      </div>
    );
  };
  const webAppHeader = () => {
    return (
      <header className="header show">
        <Container>
          <Row>
            <div className="headerWraper">
              <Link href="/">
                {/* <img className="logo" src="/logo-oyo.png" alt="Oyo Movers Logo" /> */}
                <img className="logo" src="/images/Oyo-Black.png" alt="Oyo Movers Logo" />
              </Link>

              <div className="headerLeftSide">
                <a className="header-phone-icon" href="tel:1300 01 31 31">
                  <BiSolidPhoneCall />
                </a>
                {isLogedIn ? (
                  <>
                    <Link href="/notification" className="notificationPageLink">
                      <Image src="notification.svg" alt="notification" />
                    </Link>
                    <UserMenu user={data?.user} />
                  </>
                ) : (
                  <div className="authsection">
                    <Link href="/login">Sign in</Link>
                    <Link href="/signup" className="signUpButton">
                      Create account
                    </Link>
                  </div>
                )}
                <ToggleDrawerButton />
              </div>
            </div>
          </Row>
        </Container>
      </header>
    );
  };

  if (
    pathName === "/quick-booking" ||
    pathName.startsWith("/quick-booking/") ||
    pathName.startsWith("/rate-mover")
  ) {
    return null;
  }

  return <>{bookingPage.includes(pathName) ? webAppHeader() : landingHeader()}</>;
};

export default Navbar;

export const WebNavbar = ({ isLogedIn, data }: any) => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [showTabs, setShowTabs] = useState<boolean>(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollRef = useRef<number>(0);
  const router = useRouter();
  const pathname = usePathname();

  const handleServicesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowTabs(false);
    if (pathname === "/") {
      const element = document.getElementById("services-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        if (typeof window !== "undefined") {
          window.history.replaceState(null, "", "/#services-section");
        }
      }
    } else {
      router.push("/#services-section");
    }
  };

  const getClientCookie = (name: string): string | null => {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  };

  const handleBecomeMoverClick = (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const token = getClientCookie(tokenKey);
      if (!token) {
        router.push("/become-a-mover");
        return;
      }
      let role: string | undefined;
      let name: string | undefined;
      try {
        const payload = JSON.parse(atob(token.split(".")[1] || ""));
        role = payload?.role;
        name = payload?.name || payload?.email || "Oyo mover";
      } catch {}

      if (role === "mover") {
        router.push(`/become-mover?step=3&token=${token}&name=${encodeURIComponent(name || "Oyo mover")}`);
      } else {
        router.push("/become-a-mover");
      }
    } catch {
      router.push("/become-a-mover");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      
      if (currentScroll < 50) {
        setShowHeader(true);
      } else if (currentScroll > lastScrollRef.current) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      
      setScrollPosition(currentScroll);
      lastScrollRef.current = currentScroll;
    };

    document.body.classList.add("landingPage");
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    
    return () => {
      document.body.classList.remove("landingPage");
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-light ${scrollPosition !== 0 ? "sticky" : ""} ${showHeader ? "show" : "hide"}`} id="navbar">
        <div className="container">
          {/* <Link href="/" className="navbar-brand">
            <Image
              // src={s3ImageBaseUrl + "/logo-oyo.png"}
              src="/logo-oyo.png"
              className="img-fluid logo"

              alt="img"
            />
          </Link> */}
          <div className="d-flex align-items-center d-lg-none justify-content-between w-100">
            {/* Left side - Logo */}
            <div className="mobile-logo">
              <Link href="/" className="navbar-brand">
                <img
                  src="/images/Oyo-Black.png"
                  className="img-fluid mobile-logo-img"
                  alt="OYO Logo"
                />
              {/* <img className="logo" src="/logo-oyo.png" alt="Oyo Movers Logo" /> */}
              </Link>
            </div>

            {/* Right side - Actions */}
            <div className="d-flex align-items-center gap-2">
              <a className="nav-link  text-size-36 text-theme-2" href="tel:1300 01 31 31">
                <BiSolidPhoneCall />
              </a>
              <a href="/booking">
                <button className="btn btn-theme rounded-pill ">Book</button>
              </a>

              {isLogedIn ? (
                <UserMenu user={data?.user} />
              ) : (
                <a className="btn btn-user" href="/login">
                  <FaUser />
                </a>
              )}

              <button
                className="navbar-toggler border-0"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded={true}
                aria-label="Toggle navigation"
                onClick={() => setShowTabs(!showTabs)}
              >
                <IoMenuSharp width={30} height={30} />
              </button>
            </div>
          </div>
          

          <div className="navbar-center">
              <Link href="/" className="navbar-brand">
                {/* <img
                  src="/images/Oyo-Black.png"
                  className="img-fluid logo"
                  alt="OYO Logo"
                /> */}
              <img className="logo" src="/logo-oyo.png" alt="Oyo Movers Logo" />
              </Link>
            </div>

          {/* Desktop Navigation */}
          <div className={`collapse navbar-collapse ${showTabs ? "showTab" : ""}`} id="navbarSupportedContent">
            {/* Left Side - Services Dropdown */}
            <div className="navbar-left">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    href="/#services-section"
                    onClick={handleServicesClick}
                  >
                    Services
                  </Link>
                </li>
              </ul>

              {/* Commented out Services Dropdown */}
              {/* <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    href="/"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Services
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li>
                      <Link className="dropdown-item text-black d-flex gap-3" href="/house-moving">
                        <Image src={s3ImageBaseUrl + "/house-moving.png"} className="img-fluid" alt="img" /> House Moving
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-black d-flex gap-3" href="/store-delivery">
                        <Image src={s3ImageBaseUrl + "/store-delivery.png"} alt="img" /> Store Delivery{" "}
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-black d-flex gap-3" href="/move-a-few-items">
                        <Image src={s3ImageBaseUrl + "/move-a-few-items.png"} alt="img" /> Moving Few Items
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-black d-flex gap-3" href="/office-relocation">
                        <Image src={s3ImageBaseUrl + "/office-relocation-icon.png"} alt="img" /> Office Relocation
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-black d-flex gap-3" href="/donation-run">
                        <Image src={s3ImageBaseUrl + "/donation-run.png"} alt="img" /> Donation Run
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-black d-flex gap-3" href="/storage-removals">
                        <Image src={s3ImageBaseUrl + "/storage-removals.png"} alt="img" /> Storage Removals
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-black d-flex gap-3" href="/junk-removal">
                        {" "}
                        <Image src={s3ImageBaseUrl + "/junk-removal.png"} alt="img" /> Junk Removal
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-black d-flex gap-3" href="/apartment-moves">
                        <Image src={s3ImageBaseUrl + "/apartment-moves.png"} alt="img" /> Apartment Move{" "}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item text-black d-flex gap-3"
                        href="https://oyomovers.com/new/helping-hands.php"
                      >
                        <Image src={s3ImageBaseUrl + "/apartment-moves.png"} alt="img" /> Helping Hands{" "}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul> */}

              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/become-mover" onClick={handleBecomeMoverClick}>
                    Become a Mover
                  </a>
                </li>
              </ul>

            </div>

            {/* Center - Logo */}
            {/* <div className="navbar-center">
              <Link href="/" className="navbar-brand">
                <img
                  src="/images/Oyo-Black.png"
                  className="img-fluid logo"
                  alt="OYO Logo"
                />
              </Link>
            </div> */}

            {/* Right Side - Become a Mover, Book Now, Phone, User */}
            <div className="navbar-right">

              <div className="navbar-actions">
                <a className="btn btn-book-now" href="/booking">
                  <FaTruck /> Book Now
                </a>
                <a className="btn btn-phone" href="tel:1300 01 31 31">
                  <FaPhoneVolume /><span>1300 01 31 31</span>
                </a>
                {isLogedIn ? (
                  <UserMenu user={data?.user} />
                ) : (
                  <a className="btn btn-user" href="/login">
                    <FaUser />
                  </a>
                )}
              </div>
            </div>

            {/* Legacy Navigation - Commented Out */}
            {/* <ul className="navbar-nav mx-auto">
              <li className="nav-item dropdown ">
                <Link
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Our Services
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li>
                    <Link className="dropdown-item text-black d-flex gap-3" href="/house-moving">
                      <Image src={s3ImageBaseUrl + "/house-moving.png"} className="img-fluid" alt="img" /> House Moving
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item text-black d-flex gap-3" href="/store-delivery">
                      <Image src={s3ImageBaseUrl + "/store-delivery.png"} alt="img" /> Store Delivery{" "}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item text-black d-flex gap-3" href="/move-a-few-items">
                      <Image src={s3ImageBaseUrl + "/move-a-few-items.png"} alt="img" /> Moving Few Items
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item text-black d-flex gap-3" href="/office-relocation">
                      <Image src={s3ImageBaseUrl + "/office-relocation-icon.png"} alt="img" /> Office Relocation
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item text-black d-flex gap-3" href="/donation-run">
                      <Image src={s3ImageBaseUrl + "/donation-run.png"} alt="img" /> Donation Run
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item text-black d-flex gap-3" href="/storage-removals">
                      <Image src={s3ImageBaseUrl + "/storage-removals.png"} alt="img" /> Storage Removals
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item text-black d-flex gap-3" href="/junk-removal">
                      {" "}
                      <Image src={s3ImageBaseUrl + "/junk-removal.png"} alt="img" /> Junk Removal
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item text-black d-flex gap-3" href="/apartment-moves">
                      <Image src={s3ImageBaseUrl + "/apartment-moves.png"} alt="img" /> Apartment Move{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item text-black d-flex gap-3"
                      href="https://oyomovers.com/new/helping-hands.php"
                    >
                      <Image src={s3ImageBaseUrl + "/apartment-moves.png"} alt="img" /> Helping Hands{" "}
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link" href="/prices">
                  Prices
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/become-mover">
                  Become a Mover{" "}
                </Link>
              </li>

            </ul>

            <ul className="form-inline my-2 my-lg-0 d-flex align-items-center flex-wrap p-0 gap-2">
              <li className="nav-item d-none d-md-block">
                <a className="btn btn-theme-3 nav-call " href="tel:1300 01 31 31">
                  <FaPhoneVolume />
                  &nbsp;1300 01 31 31
                </a>
              </li>
              <li className="nav-item d-none d-lg-block">
                <a className="btn btn-theme nav-call " href="/booking">
                  <FaTruck /> Book Now
                </a>
              </li>
              <li className="nav-item d-none d-lg-block">
                <a className="btn btn-theme-3 user-cell" href="/booking">
                  <FaUser />
                </a>
              </li>
            </ul> */}
          </div>
        </div>
      </nav>
      {/* Right Side Drawer */}
      <div className={`drawer-overlay ${showTabs ? "show" : ""}`} onClick={() => setShowTabs(false)}></div>
      <div className={`right-drawer ${showTabs ? "open" : ""}`}>
        <div className="drawer-content">
          <button className="btn-close-drawer" onClick={() => setShowTabs(false)}>
            ×
          </button>

          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link
                className="nav-link"
                href="/#services-section"
                onClick={handleServicesClick}
              >
                Services
              </Link>
            </li>

            {/* Commented out Mobile Services Dropdown */}
            {/* <li className="nav-item dropdown ">
              <Link
                className="nav-link dropdown-toggle"
                href="/"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Services
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li>
                  <Link className="dropdown-item text-black d-flex gap-3" href="/house-moving">
                    <Image src={s3ImageBaseUrl + "/house-moving.png"} className="img-fluid" alt="img" /> House Moving
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-black d-flex gap-3" href="/store-delivery">
                    <Image src={s3ImageBaseUrl + "/store-delivery.png"} alt="img" /> Store Delivery{" "}
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-black d-flex gap-3" href="/move-a-few-items">
                    <Image src={s3ImageBaseUrl + "/move-a-few-items.png"} alt="img" /> Moving Few Items
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-black d-flex gap-3" href="/office-relocation">
                    <Image src={s3ImageBaseUrl + "/office-relocation-icon.png"} alt="img" /> Office Relocation
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-black d-flex gap-3" href="/donation-run">
                    <Image src={s3ImageBaseUrl + "/donation-run.png"} alt="img" /> Donation Run
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-black d-flex gap-3" href="/storage-removals">
                    <Image src={s3ImageBaseUrl + "/storage-removals.png"} alt="img" /> Storage Removals
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-black d-flex gap-3" href="/junk-removal">
                    {" "}
                    <Image src={s3ImageBaseUrl + "/junk-removal.png"} alt="img" /> Junk Removal
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-black d-flex gap-3" href="/apartment-moves">
                    <Image src={s3ImageBaseUrl + "/apartment-moves.png"} alt="img" /> Apartment Move{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item text-black d-flex gap-3"
                    href="https://oyomovers.com/new/helping-hands.php"
                  >
                    <Image src={s3ImageBaseUrl + "/apartment-moves.png"} alt="img" /> Helping Hands{" "}
                  </Link>
                </li>
              </ul>
            </li> */}

            <li className="nav-item">
              <a className="nav-link" href="/become-mover" onClick={handleBecomeMoverClick}>
                Become a Mover{" "}
              </a>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" href="/faqs">
                {"FAQ's"}
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};
