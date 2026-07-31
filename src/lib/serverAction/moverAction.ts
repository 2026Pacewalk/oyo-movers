import { getApi, postApi } from "../api";

export const deleteMoverAccount = async (data: any) => {
  try {
    const res: any = await postApi("movers/account-delete", data);

    if (res.status === 200) {
      return { status: 200, message: "Account Deleted successfuly" };
    }
  } catch (error: any) {
    if (error?.response?.data?.message) {
      return error?.response?.data;
    }

    return { status: 500, message: "something went worng" };
  }
};
