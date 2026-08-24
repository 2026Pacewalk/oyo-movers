"use client";
import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { Container, Row } from "react-bootstrap";
import Image from "../Image";
import UserMenu from "./UserMenu";
import ToggleDrawerButton from "./ToggleDrawerButton";
import { FaPhoneVolume, FaTruck, FaUser, FaTiktok } from "react-icons/fa6";
import { IoMenuSharp, IoClose } from "react-icons/io5";
import { BiSolidPhoneCall } from "react-icons/bi";
import {
  FaThLarge,
  FaUserPlus,
  FaFileInvoiceDollar,
  FaRegQuestionCircle,
  FaEnvelope,
  FaSignInAlt,
  FaChevronRight,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { s3ImageBaseUrl, tokenKey } from "@/config";
import ServicesMegaMenu from "@/components/Services/ServicesMegaMenu";
import { servicesMenu } from "@/components/Services/servicesData";
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
    pathName.startsWith("/rate-mover") ||
    pathName.startsWith("/app-home") ||
    pathName === "/book" ||
    pathName.startsWith("/book/")
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

  // Lock background scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = showTabs ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showTabs]);

  const closeDrawer = () => setShowTabs(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

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
              <ServicesMegaMenu />

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
      <div className={`drawer-overlay ${showTabs ? "show" : ""}`} onClick={closeDrawer}></div>
      <aside className={`right-drawer ${showTabs ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="drawer-content">
          {/* Header */}
          <div className="drawer-header">
            <Link href="/" className="drawer-logo" onClick={closeDrawer}>
              <img src="/images/Oyo-Black.png" alt="OYO Movers" />
            </Link>
            <button className="btn-close-drawer" onClick={closeDrawer} aria-label="Close menu">
              <IoClose />
            </button>
          </div>

          {/* Primary CTAs */}
          <div className="drawer-cta">
            <a href="/booking" className="drawer-book" onClick={closeDrawer}>
              <FaTruck /> Book Now
            </a>
            <a href="tel:1300013131" className="drawer-call" aria-label="Call OYO Movers">
              <BiSolidPhoneCall />
            </a>
          </div>

          {/* Navigation */}
          <nav className="drawer-nav">
            <div className="drawer-services">
              <button
                type="button"
                className={`drawer-services-toggle ${mobileServicesOpen ? "open" : ""}`}
                onClick={() => setMobileServicesOpen((v) => !v)}
                aria-expanded={mobileServicesOpen}
              >
                <span className="drawer-link-ic"><FaThLarge /></span>
                <span className="drawer-link-label">Services</span>
                <FaChevronRight className="drawer-services-caret" />
              </button>
              <div className={`drawer-services-list ${mobileServicesOpen ? "open" : ""}`}>
                {servicesMenu.map((s) => (
                  <Link
                    key={s.slug}
                    href={s.href}
                    className="drawer-subitem"
                    onClick={closeDrawer}
                  >
                    <span
                      className="drawer-subitem-ic"
                      style={{ background: `${s.color}1f`, color: s.color }}
                    >
                      {s.icon}
                    </span>
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
            <a className="drawer-link" href="/become-mover" onClick={(e) => { handleBecomeMoverClick(e); closeDrawer(); }}>
              <span className="drawer-link-ic"><FaUserPlus /></span>
              <span className="drawer-link-label">Become a Mover</span>
              <FaChevronRight className="drawer-link-chevron" />
            </a>
            <Link className="drawer-link" href="/prices" onClick={closeDrawer}>
              <span className="drawer-link-ic"><FaFileInvoiceDollar /></span>
              <span className="drawer-link-label">Get Estimate</span>
              <FaChevronRight className="drawer-link-chevron" />
            </Link>
            <Link className="drawer-link" href="/faqs" onClick={closeDrawer}>
              <span className="drawer-link-ic"><FaRegQuestionCircle /></span>
              <span className="drawer-link-label">FAQ&apos;s</span>
              <FaChevronRight className="drawer-link-chevron" />
            </Link>
            <Link className="drawer-link" href="/contact-us" onClick={closeDrawer}>
              <span className="drawer-link-ic"><FaEnvelope /></span>
              <span className="drawer-link-label">Contact us</span>
              <FaChevronRight className="drawer-link-chevron" />
            </Link>
            {!isLogedIn && (
              <Link className="drawer-link" href="/login" onClick={closeDrawer}>
                <span className="drawer-link-ic"><FaSignInAlt /></span>
                <span className="drawer-link-label">Sign in</span>
                <FaChevronRight className="drawer-link-chevron" />
              </Link>
            )}
          </nav>

          {/* Footer: contact + social */}
          <div className="drawer-footer">
            <a className="drawer-contact" href="tel:1300013131">
              <BiSolidPhoneCall /> <span>1300 01 31 31</span>
            </a>
            <a className="drawer-contact" href="mailto:support@oyomovers.com.au">
              <FaEnvelope /> <span>support@oyomovers.com.au</span>
            </a>
            <div className="drawer-contact drawer-address">
              <FaMapMarkerAlt /> <span>470 St Kilda Road, Melbourne VIC 3004</span>
            </div>
            <ul className="drawer-social">
              <li><a href="#" aria-label="Facebook"><FaFacebookF /></a></li>
              <li><a href="#" aria-label="TikTok"><FaTiktok /></a></li>
              <li><a href="#" aria-label="Twitter"><FaTwitter /></a></li>
              <li><a href="#" aria-label="Instagram"><FaInstagram /></a></li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};
