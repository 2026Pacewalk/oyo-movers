"use client";
import React, { useEffect, useState } from "react";
import MoverLoginForm from "./Form";
import "./mover-login.scss";
import Link from "next/link";
import AuthContainer from "@/components/AuthContainer";
import { useRouter, useSearchParams } from "next/navigation";
import { tokenKey, refreshTokenKey } from "@/config";
import { successToast, errorToast } from "@/lib/toaster";

const MoverLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isAutoLoggingIn, setIsAutoLoggingIn] = useState(false);
  const [hasAutoLoggedIn, setHasAutoLoggedIn] = useState(false);

  // Client-side cookie setting function
  const setClientCookie = (name: string, value: string, days: number = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    console.log(`Client-side cookie set: ${name} = ${value}`);
  };

  // Auto-login function
  const handleAutoLogin = async () => {
    const verified = searchParams.get('verified');
    const autoLogin = searchParams.get('autoLogin');
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const message = searchParams.get('message');

    // Check if all required parameters are present and we haven't already auto-logged in
    if (verified === 'true' && autoLogin === 'true' && accessToken && refreshToken && !hasAutoLoggedIn) {
      setIsAutoLoggingIn(true);
      setHasAutoLoggedIn(true); // Prevent duplicate execution
      
      try {
        // Set tokens in cookies
        setClientCookie(tokenKey, accessToken);
        setClientCookie(refreshTokenKey, refreshToken);
        
        // Show single success message
        successToast("Login successful! Redirecting...");
        
        // Decode the JWT token to get user information
        try {
          const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
          const userName = tokenPayload.name || tokenPayload.email || 'Oyo mover';
          
          // Redirect to become-mover page with the same format as before
          const redirectUrl = `/become-mover?step=3&token=${accessToken}&name=${encodeURIComponent(userName)}`;
          router.push(redirectUrl);
        } catch (tokenError) {
          console.error('Error decoding token:', tokenError);
          // Fallback to redirect without name if token decoding fails
          router.push(`/become-mover?step=3&token=${accessToken}&name=${encodeURIComponent('Oyo mover')}`);
        }
        
      } catch (error) {
        console.error('Auto-login error:', error);
        errorToast("Auto-login failed. Please try logging in manually.");
        setIsAutoLoggingIn(false);
        setHasAutoLoggedIn(false); // Reset flag on error
      }
    }
  };

  useEffect(() => {
    handleAutoLogin();
  }, [searchParams]);

  return (
    <AuthContainer>
      <div className="loginContainer">
        <div className="loginWraper">
          <h1>Sign in Your Mover Account</h1>
          <p>Enter your details below to continue.</p>
          
          {isAutoLoggingIn ? (
            <div className="auto-login-container">
              <div className="loading-spinner">
                <div className="spinner"></div>
              </div>
              <p>Logging you in automatically...</p>
            </div>
          ) : (
            <MoverLoginForm query={searchParams?.get('redirectTo') || ''} />
          )}
          
          <div className="loginFooter">
            <p>
              Don&apos;t have a mover account? <Link href="/become-mover">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};

export default MoverLogin;
