import React from "react";
import MoverStepTab from "@/components/BecomeMover/MoverStepTab";
import WorkDetails from "@/components/BecomeMover/WorkDetails";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import { verifyEmail } from "@/lib/serverAction/becomeMoverActions";
import Footer from "@/components/WebAppWrapper/Footer";
import { tokenKey } from "@/config";
import ClientAuthSetter from "@/components/ClientAuthSetter";

const inter = Inter({ subsets: ["latin"],display: "swap" });
const BecomeMover = async ({ searchParams }: any) => {
  // Handle step-based navigation (skip email verification for now)
  if (searchParams?.step === "3" && searchParams?.token && searchParams?.name) {
    // Cookie is set client-side by ClientAuthSetter component
    return (
      <div className={inter.className}>
        {/* Show loader immediately in HTML before React hydrates */}
        <div id="initial-loader" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(3px)'
        }}>
          <div className="spinner-border" role="status" style={{ 
            width: '3rem', 
            height: '3rem',
            borderWidth: '4px',
            borderColor: '#ffe147',
            borderRightColor: 'transparent'
          }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        {/* Ensure client sets cookie and refreshes for Navbar without manual reload */}
        <ClientAuthSetter token={searchParams.token} />
        <MoverStepTab 
          token={searchParams.token} 
          name={searchParams.name} 
          initialStep={3}
        />
        <Footer />
      </div>
    );
  }

  // Original email verification logic (commented out for now)
  // if(!searchParams?.token && searchParams?.name  ){
  //   return redirect('/become-mover');
  // }
  // const verifyUserEmail:any = await verifyEmail({ token: searchParams?.token });
  
  // if (searchParams?.token && verifyUserEmail.status !== 200) {
  //   return redirect('/become-mover');
  // }

  return (
    <div className={`${inter.className} min-vh-100`}>
      {searchParams.name ? (
        <>
          <ClientAuthSetter token={searchParams?.token} />
          <MoverStepTab token={searchParams.token} name={searchParams.name} />
        </>
      ) : (
        <>
          <WorkDetails />
        </>
      )}
    </div>
  );
};

export default BecomeMover;
