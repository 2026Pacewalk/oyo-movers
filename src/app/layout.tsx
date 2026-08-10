import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.scss";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-montserrat",
});
import Header from "@/components/Header";
import ToastProvider from "@/components/ToastProvider";
import NotificationsHandler from "@/components/NotificationsHandler";
import MobileTabBar from "@/components/MobileTabBar";


export const metadata: Metadata = {
  title: "OYO Movers",
  description:
    "OYO Movers offers a wide array of moving services just for you and your unique needs. For the past 5 years, we have moved thousands of people to their new homes.",
  keywords:
    "oyo movers and packers, movers and packers, movers and packers online, movers and packers near me, top 10 movers and packers, movers and packers for few items, best movers and packers, movers and packers near to me, international movers and packers near me",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=0.75"
        />
      </head>
      <body>
        <NotificationsHandler />
        <ToastProvider>
          <NextTopLoader showSpinner={false} color="#ffe147" />
          <Header />
          {children}
          <MobileTabBar />
        </ToastProvider>
      </body>
    </html>
  );
}
