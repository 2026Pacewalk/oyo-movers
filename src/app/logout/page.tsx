"use client";

import { logout } from "@/lib/serverAction";
import { useEffect } from "react";
import Login from "../login/page";

const Logout =  () => {
  useEffect(() => {
    logout().then(() => {
      window.location.href = "/login"
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Login />;
};
export default Logout;

