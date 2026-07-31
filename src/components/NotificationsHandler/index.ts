"use client";

import { useEffect } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import useNotifications from "@/utils/hooks/useNotifications";
import firebaseApp from "@/firebase";
import { infoToast } from "@/lib/toaster";

const NotificationsHandler = () => {
  const { notificationPermissionStatus } = useNotifications();

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      if (notificationPermissionStatus === "granted") {
        const messaging = getMessaging(firebaseApp);
        const unsubscribe = onMessage(messaging, (payload: any) =>{
          infoToast(`${payload?.notification?.title}: ${payload?.notification?.body}`);
          console.log("Foreground push notification received:", payload)
        }
        
        );
        return () => {
          unsubscribe(); // Unsubscribe from the onMessage event on cleanup
        };
      }
    }
  }, [notificationPermissionStatus]);

  return null; // This component is primarily for handling foreground notifications
};

export default NotificationsHandler;
