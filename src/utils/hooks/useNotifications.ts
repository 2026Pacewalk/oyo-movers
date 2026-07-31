import { useEffect, useState } from 'react';
import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging';
import firebaseApp from "@/firebase";
import { useUserData } from '@/components/User/UserDataHook';
import { addDeviceToken } from '@/lib/serverAction/authAction';

const useNotifications = () => {
  const [token, setToken] = useState("");
  const [notificationPermissionStatus, setNotificationPermissionStatus] = useState('');

  const { user } = useUserData();

  useEffect(() => {
    if (token && user?.deviceToken !== token && user?.email) {
      addDeviceToken({ deviceToken: token,topic: ["customers",'allOyoMoverUsers'] })
        .then((res) => {
          console.log("device token added=>", res);
        })
        .catch((err) => {
          console.log("error adding device token=>", err);
        });
    }
  }, [token, user]);

  useEffect(() => {
    const retrieveToken = async () => {
      
      try {
        if (typeof window !== "undefined" && "serviceWorker" in navigator) {
          
          const messaging = getMessaging(firebaseApp);
          // Retrieve the notification permission status
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);
    
          // Check if permission is granted before retrieving the token
          if (permission === "granted") {
            const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
    
            // Wait for the service worker to become active
            await navigator.serviceWorker.ready;
    
            const currentToken = await getToken(messaging, {
              vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID,
            });
            console.log("current token:", currentToken);
            if (currentToken) {
              setToken(currentToken);
            } else {
              console.log("No registration token available. Request permission to generate one.");
            }
          }
        }
      } catch (error) {
        console.log("An error occurred while retrieving token:", error);
      }
    };
    
    isSupported()
      .then((supported) => {
        if (supported) {
          
          retrieveToken();
          // Listen for incoming messages
          const messaging = getMessaging(firebaseApp);
          onMessage(messaging, (payload) => {
            console.log("Message received. ", payload);
            // Customize your notification handling here
          });
        } else {
          console.log("Browser not supporting push notifications");
        }
      })
      .catch((err) => {
        console.log(
          "An Error occurred while Checking Browser support for push notifications",
          err
        );
      });
  }, []);

  return { fcmToken: token, notificationPermissionStatus };
};

export default useNotifications;
