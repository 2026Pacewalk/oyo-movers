"use server";

import { deleteApi, postApi } from "../api";

export const UploadImage = async (body: any, mover?: string) => {
  try {
    const res = await postApi(`uploads/image/${mover}`, body);
    if (res.status === 200) {
      return { status: res.status, message: res.data.message, data: res.data };
    }
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};

export const deleteImage = async (key: any, token: string) => {
  try {
    const res = await deleteApi(`uploads/delete?key=${key}`, token);
    if (res.status === 200) {
      return {
        status: res.status,
        message: "Image deleted successfully",
        data: res.data,
      };
    }
  } catch (error: any) {
    return { status: 500, message: "Some thing went worng" };
  }
};
