"use server";

import { postApi } from "../api";

export const createHelper = async (body: any) => {
  try {
    const res = await postApi("auth/become-helper", body);

    if (res.status === 201) {
      return {
        status: res.status,
        message: res.data.message,
        data: res.data,
      };
    }
  } catch (error: any) {
    return { status: 500, message: error?.response?.data?.message };
  }
};

export const updateHelper = async (body: any) => {
  try {
    const res = await postApi("helpers/update", body);

    if (res.status === 200) {
      return {
        status: res.status,
      };
    }
  } catch (error: any) {
    return { status: 500, message: error?.response?.data?.message };
  }
};
