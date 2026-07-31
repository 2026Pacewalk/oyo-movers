import { log } from "console";
import { getApi, postApi, putApi } from "../api";

export const createMover = async (body: any) => {
  try {
    // TODO: Replace with real API call when backend is ready
    const res = await postApi("onboarding/mover/register", body);


    // Mock implementation for development
    // const res = await mockCreateMover(body);

    if (res.status === 201) {
      return {
        status: res.status,
        message: res.data.message,
        data: res.data,
      };
    }
  } catch (error: any) {
    return { status: 500, message: error?.response?.data?.message || error.message };
  }
};

export const updateMover = async (body: any) => {
  try {
    const res = await postApi("movers/update", body);

    if (res.status === 200) {
      return {
        status: res.status,
      };
    }
  } catch (error: any) {
    return { status: 500, message: error?.response?.data?.message };
  }
};


export const completeMoverProfile = async (body: any) => {
  try {
    // Extract token from body if provided, otherwise postApi will try to get it from cookies
    const res = await postApi("onboarding/mover/complete-profile", body);

    if (res.status === 200) {
      return {
        status: res.status,
        message: res.data.message,
        data: res.data,
      };
    }
  } catch (error: any) {
    return { status: 500, message: error?.response?.data?.message || error.message };
  }
};

export const submitAbnDetails = async (body: any) => {
  try {
    const res = await postApi("onboarding/mover/abn-details", body);

    if (res.status === 200) {
      return {
        status: res.status,
        message: res.data.message,
        data: res.data,
      };
    }
  } catch (error: any) {
    return { status: 500, message: error?.response?.data?.message || error.message };
  }
};

export const submitDrivingLicense = async (body: any) => {
  try {
    const res = await postApi("onboarding/mover/driver-license", body);
    console.log("res2", res);

    if (res.status === 200) {
      return {
        status: res.status,
        message: res.data.message,
        data: res.data,
      };
    }
  } catch (error: any) {
    console.log("error2", error);
    return { status: 500, message: error?.response?.data?.message || error.message };
  }
};

export const submitVevoCheck = async (body: any) => {
  try {
    const res = await postApi("onboarding/mover/vevo-check", body);

    if (res.status === 200) {
      return {
        status: res.status,
        message: res.data.message,
        data: res.data,
      };
    }
  } catch (error: any) {
    return { status: 500, message: error?.response?.data?.message || error.message };
  }
};

export const submitVehicleDetails = async (body: any) => {
  try {
    const res = await postApi("onboarding/mover/vehicle-details", body);

    if (res.status === 200) {
      return {
        status: res.status,
        message: res.data.message,
        data: res.data,
      };
    }
  } catch (error: any) {
    return { status: 500, message: error?.response?.data?.message || error.message };
  }
};

export const submitLiabilityInsurance = async (body: any) => {
  try {
    const res = await postApi("onboarding/mover/liability-insurance", body);
    if (res.status === 200) {
      return {
        status: res.status,
        message: res.data.message,
        data: res.data,
      };
    }
  } catch (error: any) {
    return { status: 500, message: error?.response?.data?.message || error.message };
  }
};

export const submitFinalApplication = async (body: any) => {
  try {
    // Ensure we ONLY send the required field agreeToTerms
    const res = await postApi("onboarding/mover/submit-application", body);
    if (res.status === 200) {
      return {
        status: res.status,
        message: res.data.message,
        data: res.data,
      };
    }
  } catch (error: any) {
    return { status: 500, message: error?.response?.data?.message || error.message };
  }
};

export const getMoverProfile = async (token?: string) => {
  try {
    const res: any = await getApi("movers/profile", [], token);
    console.log("res1", res);
    return { status: 200, data: res as any };
  } catch (error: any) {
    return { status: 500, message: error?.response?.data?.message || error.message };
  }
};

export const resendVerificationEmail = async (email: string) => {
  try {
    const res = await postApi("onboarding/mover/resend-verification", { email });
    if (res.status === 200) {
      return { status: 200, message: res.data?.message || "Verification email sent" };
    }
    return { status: res.status, message: res.data?.message || "Failed to send verification email" };
  } catch (error: any) {
    return { status: 500, message: error?.response?.data?.message || error.message };
  }
};


export const verifyEmail = async (body: any) => {
  try {
    const res = await postApi("auth/verify-email", body);

    if (res.status === 200) {
      return {
        status: res.status,
        message: "Email is verified",
      };
    }
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};

export const getMoverStatus = async (token?: string) => {
  try {
    const res: any = await getApi("onboarding/mover/status", [], token);
    return { status: 200, data: res };
  } catch (error: any) {
    return { status: 500, message: error?.response?.data?.message || error.message };
  }
};

export const getRefreshLink = async (token?: string) => {
  try {
    const res: any = await getApi("onboarding/mover/refresh-link", [], token);
    return { status: 200, data: res };
  } catch (error: any) {
    return { status: 500, message: error?.response?.data?.message || error.message };
  }
};

export const getDashboardLink = async (token?: string) => {
  try {
    const res: any = await getApi("onboarding/mover/dashboard-link", [], token);
    return { status: 200, data: res };
  } catch (error: any) {
    return { status: 500, message: error?.response?.data?.message || error.message };
  }
};