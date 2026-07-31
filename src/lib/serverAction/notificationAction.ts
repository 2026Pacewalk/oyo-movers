import { getApi } from "../api";



export const getCustomerNotifications = async () => {
  try {
    const res = await getApi(`notifications/customer`, );    
    if (res?.status === 200) {
      return res?.notifications;
    }
  } catch (error: any) {
    return { status: 500, message: "something went worng" };
  }
};