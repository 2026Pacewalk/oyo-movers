import "./header.scss";
import { cookies, headers } from "next/headers";
import { tokenKey } from "@/config";
import { getProfile } from "@/lib/serverAction";
import Navbar from "./Navbar";

const Header = async () => {
  const cookieStore = cookies();
  const isLogedIn = cookieStore.has(tokenKey);
  const data = isLogedIn && (await getProfile());
  // console.log("data111111111111111111111", data);

  return <Navbar isLogedIn={isLogedIn} data={data} />;
};

export default Header;
