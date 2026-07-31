import React from "react";
import SlickSlider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SliderProps {
  children: React.ReactNode[];
  slidesToShow?: number;
  slidesToScroll?: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
  infinite?: boolean;
  marquee?: boolean;
  marqueeDirection?: "left" | "right";
  responsive?: Settings["responsive"];
}

const ClientSlickSlider = SlickSlider as unknown as React.ComponentType<any>;

const Slider: React.FC<SliderProps> = ({
  children,
  slidesToShow = 4,
  slidesToScroll = 3,
  autoplay = false,
  autoplaySpeed = 3000,
  showDots = false,
  showArrows = false,
  className = "",
  infinite = false,
  marquee = false,
  marqueeDirection = "left",
  responsive,
}) => {
  // Fixed initial value so server HTML matches the first client render (hydration).
  const [windowWidth, setWindowWidth] = React.useState(1200);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine slidesToShow for marquee mode based on window width and responsive settings
  let marqueeSlidesToShow = 3.5;
  if (marquee && responsive && responsive.length > 0) {
    for (const breakpoint of responsive) {
      if (windowWidth <= breakpoint.breakpoint) {
        marqueeSlidesToShow = (breakpoint.settings as any).slidesToShow || marqueeSlidesToShow;
      }
    }
  }

  const settings: Settings = marquee
    ? {
        slidesToShow: marqueeSlidesToShow,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 5000,
        cssEase: "linear",
        infinite: true,
        arrows: false,
        dots: false,
        pauseOnHover: true,
        swipe: windowWidth <= 768 ? true : false,
        draggable: windowWidth <= 768 ? true : false,
        rtl: marqueeDirection === "right",
      }
    : {
        slidesToShow: slidesToShow || 3,
        slidesToScroll: slidesToScroll || 1,
        autoplay,
        autoplaySpeed,
        speed: 500,
        cssEase: "ease-in-out",
        infinite,
        arrows: showArrows,
        dots: showDots,
        pauseOnHover: true,
        responsive: responsive || undefined,
      };

  return (
    <div className={className}>
      <ClientSlickSlider {...settings}>{children}</ClientSlickSlider>
    </div>
  );
};

export default Slider;
