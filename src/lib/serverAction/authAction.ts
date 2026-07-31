"use server";
import { refreshTokenKey, tokenKey } from "@/config";
import { getApi, postApi, putApi } from "../api";
import { deleteCookie, setCookie } from "../cookies";
import { revalidateTag } from "next/cache";

export const logout = async () => {
  await deleteCookie(tokenKey);
  await deleteCookie(refreshTokenKey);
};

export const login = async (data: {
  email: string;
  password: string;
  recaptcha?: string;
}) => {
  try {
    const body: Record<string, string> = {
      email: data?.email,
      password: data?.password,
    };
    if (data?.recaptcha) {
      body.recaptcha = data.recaptcha;
    }
    // console.log("body", body);
    const res: any = await postApi("auth/customer/login", body);

    // console.log("auth/customer/login = ", res?.data);
    // console.log("res?.data?.status = ", res?.data?.status);

    if (res?.data?.status == "success") {
      // console.log("res?.data?.data?.accessToken = ", res?.data?.data?.accessToken);

      if (res?.data?.data?.accessToken) {
        setCookie(tokenKey, res?.data?.data?.accessToken);
        setCookie(refreshTokenKey, res?.data?.data?.refreshToken);
        // Redirect logic here or return a success status
        return { status: 200, message: "Login successful" };
      }
    } else {
      return { status: 403, message: "Something went wrong" };
    }
  } catch (error: any) {
    if (error?.response?.status === 404) {
      return { status: 403, message: error.response.data.message };
    } else if (error?.response?.status === 401) {
      return { status: 403, message: "Invalid email or password" };
    }
    return { status: 500, message: "Server error, please try again later." };
  }
};
export const moverLogin = async (data: { email: string; password: string }) => {
  try {
    const body = {
      email: data?.email,
      password: data?.password,
      role: "mover"
    };
    const res: any = await postApi("auth/mover/login", body);
    if (res?.data?.status == "success") {
      if (res?.data?.data?.accessToken) {
        try {
          setCookie(tokenKey, res?.data?.data?.accessToken);
          setCookie(refreshTokenKey, res?.data?.data?.refreshToken);
        } catch (cookieError) {
          console.error("Error setting cookies:", cookieError);
        }
        // Return user data for navigation
        return {
          status: 200,
          message: "Mover login successful",
          data: {
            user: res?.data?.data?.user,
            token: res?.data?.data?.accessToken,
            refreshToken: res?.data?.data?.refreshToken
          }
        };
      }
    } else {
      return { status: 403, message: "Something went wrong" };
    }
  } catch (error: any) {
    if (error?.response?.status === 404) {
      return { status: 403, message: error.response.data.message };
    } else if (error?.response?.status === 401) {
      return { status: 403, message: "Invalid email or password" };
    }
    return { status: 500, message: "Server error, please try again later." };
  }
};
export const signup = async (data: {
  email: string;
  name: string;
  phone: string;
  password: string;
  companyName?: string;
  userType?: string;
  recaptcha?: string;
}) => {
  try {
    const res: any = await postApi("auth/customer/register", data);
    // console.log("1111111111111111", res);
    // if (res.status === 201) {
    //   return { status: 201, message: res.data.message };
    // }
    console.log("1111111111111111", res?.data?.data?.accessToken);
    if (res?.data?.data?.accessToken) {
      setCookie(tokenKey, res?.data?.data?.accessToken);
      setCookie(refreshTokenKey, res?.data?.data?.refreshToken);
      return { status: 201, message: res.data.message };
    }
  } catch (error: any) {
    if (error?.response?.status === 500) {
      return { status: 500, message: "Server error, please try again later." };
    }

    return {
      status: error?.response?.status,
      message: error.response.data.message,
    };
  }
};

export async function updateAuthUser(data: unknown) {
  const res = await putApi("auth/profile", data);

  if (res.status === 201) {
    revalidateTag("auth/profile");
    return { status: res.status, message: res.data.message };
  } else {
    return { status: 500, message: "Server error, please try again later." };
  }
}
export const getProfile = async () => {
  // Check if user is a mover by decoding the token
  try {
    const { getCookie } = await import("../cookies");
    const token = await getCookie(tokenKey);
    
    if (token && typeof token === 'string') {
      try {
        // Decode JWT token to check role
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        const role = payload?.role;
        
        // If user is a mover, use movers/profile endpoint
        if (role === 'mover') {
          const moverData = await getApi("movers/profile", [], token);
          // Normalize the response structure to match customer profile format
          // movers/profile might return { user: {...} } or { data: { user: {...} } }
          if (moverData?.user) {
            return { user: moverData.user };
          } else if (moverData?.data?.user) {
            return { user: moverData.data.user };
          }
          // If structure is different, try to extract user from the response
          return moverData;
        }
      } catch (decodeError) {
        // If token decode fails, fall back to customer profile
        console.error("Error decoding token:", decodeError);
      }
    }
  } catch (error) {
    // If any error, fall back to customer profile
    console.error("Error checking token:", error);
  }
  
  // Default to customer profile
  return await getApi("customers/profile");
};

export const resetPassword = async (data: any) => {
  try {
    const res: any = await postApi("auth/change-password", data);
    if (res.status === 200) {
      return { status: 200, message: res.data.message };
    } else {
      return { status: res.status || 500, message: res.data?.message || "Getting issue in reset password" };
    }
  } catch (error: any) {
    if (error?.response?.status === 400) {
      return { status: 400, message: error.response.data?.message || "Invalid request" };
    } else if (error?.response?.status === 401) {
      return { status: 401, message: error.response.data?.message || "Unauthorized" };
    } else if (error?.response?.status === 404) {
      return { status: 404, message: error.response.data?.message || "Resource not found" };
    }
    return { status: 500, message: error?.response?.data?.message || "Server error, please try again later." };
  }
};

export const sendOtpPhone = async (data: { phone: string, userType: string }) => {
  try {
    const res: any = await postApi("auth/send-otp-phone", data);
    if (res.status === 200) {
      return {
        status: 200,
        message: "OTP send successfuly",
        otp: res.data.otp,
      };
    } else {
      return res;
    }
  } catch (error) {
    return { status: 500, message: "Server error, please try again later." };
  }
};
export const forgotPassword = async (data: any) => {
  try {
    const res: any = await postApi("auth/forgot-password", data);

    if (res.status === 200) {
      return {
        status: 200,
        message: res?.data?.message,
      };
    } else {
      return res;
    }
  } catch (error) {
    return { status: 500, message: "Server error, please try again later." };
  }
};
export const sendOtpEmail = async (data: { email: string, userType: string }) => {
  try {
    const res: any = await postApi("auth/send-otp-email", data);
    if (res.status === 200) {
      return {
        status: 200,
        message: "OTP send successfuly",
        otp: res.data.otp,
      };
    } else {
      return res;
    }
  } catch (error) {
    return { status: 500, message: "Server error, please try again later." };
  }
};

export const sendForgotPasswordEmail = async (data: { email: string, role: string }) => {
  try {
    const res: any = await postApi("auth/forgot-password", data);
    
    if (res?.data?.status === "success") {
      return {
        status: "success",
        message: res?.data?.message || "Reset password link sent successfully",
      };
    } else {
      return {
        status: "error",
        message: res?.data?.message || "Failed to send reset link",
      };
    }
  } catch (error: any) {
    return { 
      status: "error", 
      message: error?.response?.data?.message || "Server error, please try again later." 
    };
  }
};

export const resetPasswordWithToken = async (data: { password: string, role: string, token: string }) => {
  try {
    const res: any = await postApi(`auth/reset-password`, data);
    if (res?.data?.status === "success") {
      return {
        status: "success",
        message: res?.data?.message || "Password reset successfully",
      };
    } else {
      return {
        status: "error",
        message: res?.data?.message || "Failed to reset password",
      };
    }
  } catch (error: any) {
    return { 
      status: "error", 
      message: error?.response?.data?.message || "Server error, please try again later." 
    };
  }
};
export const getServiceArea = async () => {
  try {
    const res: any = await getApi("service-areas");
    // console.log("121212121212", res);
    if (res) {
      return {
        status: 200,
        data: res,
      };
    } else {
      return res;
    }
  } catch (error) {
    return { status: 500, message: "Server error, please try again later." };
  }
};
export const addDeviceToken = async (data: { deviceToken: string, topic: string[] }) => {
  try {
    const res: any = await postApi("auth/add-device-token", data);
    if (res.status === 200) {
      return {
        status: 200,
        message: "Device token added successfully",
      };
    }
  } catch (error) {
    return { status: 500, message: "Server error, please try again later." };
  }
};



export const getAvailableRequirements = async () => {
  try {
    const res: any = await getApi("config/team-pricing/active");

    if (res.status === "success") {
      return {
        status: 200,
        data: res.data,
      };
    } else {
      return res;
    }
  } catch (error) {
    return { status: 500, message: "Server error, please try again later." };
  }
};