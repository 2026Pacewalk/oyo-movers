"use server";

import { getApi, postApi } from "../api";
import { revalidateTag } from "next/cache";

export const saveCards = async (body: any) => {
  console.log("body", body);
  try {
    const res = await postApi("me/cards", body);

    if (res.status === 201) {
      revalidateTag("me/cards");
      return { status: res.status, data: res.data };
    }
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};

export const getCards = async () => getApi("me/cards", ["me/cards"]);

export const removeCard = async (id: string) => {
  try {
    const res = await postApi(`me/card-remove`, { paymentMethodId: id });

    if (res.status === 200) {
      revalidateTag("me/cards");
      return { status: res.status, message: res.data.message };
    }
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};
