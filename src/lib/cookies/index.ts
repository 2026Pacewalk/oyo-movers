"use server";

import { cookies } from "next/headers";

export const getAllCookies = () => {
  const cookieData = cookies().getAll();
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData);
    }, 1000)
  );
};

export const getCookie = (name: string) => {
  const cookieData = cookies().get(name);
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData?.value);
    }, 1000)
  );
};

export const setCookie = (name: string, value: string) => cookies().set(name, value);

export const deleteCookie = async (name: string) => {
  cookies().delete(name);
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, 1000)
  );
};
