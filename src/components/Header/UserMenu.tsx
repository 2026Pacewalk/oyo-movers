"use client";

import { logout } from "@/lib/serverAction";
import "./header.scss";
import { Dropdown } from "react-bootstrap";
import Link from "next/link";
import { useUserData } from "../User/UserDataHook";
import { useEffect } from "react";
import Image from "../Image";

const UserMenu = ({ user }: any) => {
  const { setUser } = useUserData();

  useEffect(() => {
    if (user) {
      setUser(user);
    } else {
      onLogout()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onLogout = () => {
    setUser({})
    logout();
  };

  return (
    <Dropdown className="profileHeader">
      <Dropdown.Toggle variant="a">
        <img src={user?.imgSrc || "/images/avtar.jpg"} alt="avtar" className="profileHeader__img" />
        
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {/* <p style={{ fontSize: '16px', fontWeight: '600', textAlign: 'center', borderBottom: '1px solid #ccc', marginBottom: '20px' }}> {user?.name}</p> */}
        <p> {user?.name}</p>
        <Link href="/profile">Profile</Link>
        <Link href="/booking-list">My Bookings</Link>
        <Link href="/account-settings">Settings</Link>

        <Link href="/logout" onClick={onLogout}>
          Logout
        </Link>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserMenu;
