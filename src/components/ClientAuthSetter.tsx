"use client";
import { useEffect } from "react";
import { tokenKey, refreshTokenKey } from "@/config";

export default function ClientAuthSetter({ token, refreshToken }: { token?: string; refreshToken?: string }) {
  useEffect(() => {
    if (!token) return;
    try {
      const expires = new Date();
      expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
      
      // Set token cookie
      document.cookie = `${tokenKey}=${token};expires=${expires.toUTCString()};path=/;SameSite=Lax;Secure`;
      
      // Set refreshToken if provided
      if (refreshToken) {
        document.cookie = `${refreshTokenKey}=${refreshToken};expires=${expires.toUTCString()};path=/;SameSite=Lax;Secure`;
      }
      
      // Removed router.refresh() to avoid POST request delay
      // Navbar will update on next navigation or page reload
    } catch {}
  }, [token, refreshToken]);

  return null;
}

