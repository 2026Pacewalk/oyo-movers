"use server";

import { revalidateTag } from "next/cache";
import { deleteApi, getApi, postApi, putApi } from "../api";
import { apiUrl, tokenKey } from "@/config";
import { getCookie } from "../cookies";
export const createBookingNonLogin = async (body: any) => {
  try {
    const res = await postApi("quotation/preUser", { ...body, isUserLoged: false });
    if (res.status === 200 || res.status === 201) {
      return { status: res.status, message: res.data.message, data: res.data };
    }
  } catch (error: any) {
    console.log("error", error);
    if (error?.response?.data?.message) {
      return { status: error?.response.status, message: error?.response?.data?.message };
    }
    return { status: 500, message: error?.message };
  }
};
export const createBooking = async (body: any) => {
  try {
    const res = await postApi("quotations", body);
    if (res.status === 201) {
      return {
        status: res?.status,
        message: res?.data?.message,
        data: res?.data,
      };
    }
  } catch (error: any) {
    return { status: 500, message: error?.message };
  }
};

export const createPayment = async (body: any) => {
  try {
    const res = await postApi("quotations/create-payments", body);

    if (res.status === 200) {
      return { status: res.status, message: res.data.message, data: res.data };
    }
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};

export const verifyPayment = async (body: any) => {
  try {
    const res = await getApi(`quotations/deposit/${body.paymentIntentId}`);
    if (!res) {
      return {
        status: 500,
        message: "Failed to verify payment - no response from server",
        data: null
      };
    }

    const quotation = res?.quotation;
    const paymentRecord = res?.paymentRecord;

    if (!paymentRecord) {
      return {
        status: 400,
        message: "Payment record not found",
        data: quotation || null,
      };
    }

    // Check if payment is succeeded using the new response structure
    const paymentDone = paymentRecord?.stripePaymentIntentId === body.paymentIntentId &&
      paymentRecord?.status === "succeeded";

    if (paymentDone) {
      return {
        status: 200,
        message: "Payment completed successfully",
        data: {
          ...quotation,
          paymentRecord: paymentRecord,
        },
      };
    } else {
      return {
        status: 400,
        message: paymentRecord?.status === "pending"
          ? "Payment is still processing"
          : "Payment not completed",
        data: {
          ...quotation,
          paymentRecord: paymentRecord,
        },
      };
    }
  } catch (error: any) {
    return {
      status: 500,
      message: error?.message || "Failed to verify payment",
      data: null
    };
  }
};


export const getCustomerJobs = async () => {
  try {
    const res = await getApi(`customers/jobs`);
    return res.jobs;
  } catch (error: any) {
    return { status: 500, message: "something went worng" };
  }
};


export const createReview = async (body: any) => {
  try {
    const res = await postApi("reviews", body);
    if (res.status === 200) {
      revalidateTag("booking-jobs");
      return {
        status: res.status,
        message: res.data.message,
        data: res.data,
      };
    }
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};

export const updateQuotation = async (id: string, data: any) => {
  try {
    const res = await putApi(`quotations/${id}/cancel`, data);
    if (res.status === 200) {
      revalidateTag("booking-jobs");
      return { status: res.status, message: res.data.message, data: res.data };
    }
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};

export const applyCoupon = async (name: any) => {
  try {
    const res = await getApi(`customers/promo-codes/validate?code=${name}`);
    console.log("res", res);
    // The response structure may vary, handle both cases
    if (res?.status === 200 || (res?.code && res?.valid !== undefined)) {
      // If res has code and valid properties, it's the coupon data itself
      if (res?.code && res?.valid !== undefined) {
        return { status: 200, message: "Coupon validated successfully", data: res };
      }
      // Otherwise, try to extract data from response
      return { status: res?.status || 200, message: res?.message || "Success", data: res?.data || res };
    }
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};

export const getQuotationById = async (id: string, token?: string) => {
  try {
    const res = await getApi(`quotations/${id}`, [], token);

    if (res) {
      return res;
    }
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};

export async function createQuotationBooking(data: any) {
  return postApi(`fast-booking`, data).then((res) => {
    if (res.status === 201) {
      return { status: 200, message: "Booking created successfuly" };
    } else {
      return { status: res?.status, message: "Something went worng" };
    }
  });
}

export const updateDrafQuotation = async (id: string, data: any) => {
  try {
    const res = await putApi(`quotations/${id}/`, data);
    if (res.status === 200) {
      return { status: res.status, message: res.data.message, data: res.data };
    }
  } catch (error: any) {
    return { status: 500, message: error.message };
  }
};
export const deleteQuotation = async (id: string, reason?: string) => {
  try {
    const body = reason ? { reason } : {};
    const res = await postApi(`quotations/${id}/reject`, body);
    if (res.status === 200) {
      revalidateTag("booking-jobs");
      return { status: res.status, message: "Job deleted successfully", data: res.data };
    }
  } catch (error: any) {
    console.log("Delete quotation API error:", error);
    return { status: 500, message: error.message || "Something went wrong" };
  }
};

export const acceptQuotation = async (quotationId: string, paymentMethodId: string, selectedDepositOption: any) => {
  try {
    const res = await postApi(`quotations/${quotationId}/accept`, {
      paymentMethodId,
      selectedDepositOption
    });
    // console.log("Accept quotation API response:", res);

    if (res.status === 200) {
      return { status: res.status, message: res.data?.message || "Success", data: res.data };
    } else {
      return { status: res.status, message: res.data?.message || "Failed to accept quotation", data: res.data };
    }
  } catch (error: any) {
    // console.error("Accept quotation API error:", error);
    return { status: 500, message: error.message || "Something went wrong" };
  }
};

export const getJobByQuotationId = async (quotationId: string) => {
  try {
    const res = await getApi(`customers/jobs/${quotationId}`);
    if (res?.job) {
      return { status: 200, data: res.job };
    } else {
      return { status: 404, message: "Job not found" };
    }
  } catch (error: any) {
    console.error("Error fetching job:", error);
    return { status: 500, message: error?.message || "Failed to fetch job" };
  }
};
const getHeaders = async (tokenData?: string) => {
  const token = tokenData ? tokenData : await getCookie(tokenKey);
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};
export const getCancellationPolicy = async (jobId: string) => {
  try {
    const headers = await getHeaders();
    const res = await fetch(`${apiUrl}/customers/jobs/${jobId}/cancel-policy`, {
      next: { revalidate: 0 },
      ...headers,
    }).then((res) => res.json());
    console.log("11111111111111111111111111111", res.status);
    if (res.status == "success") {
      return { status: 200, data: res.data || res };
    } else {
      return { status: 400, message: res.message || "Failed to get cancellation policy" };
    }
  } catch (error: any) {
    console.error("Get cancellation policy API error:", error);
    return { status: 500, message: error?.response?.data?.message || error?.message || "Something went wrong" };
  }
};

export const cancelJob = async (jobId: string, reason?: string) => {
  try {
    const body = reason ? { reason } : {};
    const res = await postApi(`customers/jobs/${jobId}/cancel`, body);
    if (res.status === 200) {
      revalidateTag("booking-jobs");
      return { status: res.status, message: res.data?.data?.message || "Job cancelled successfully", data: res.data };
    } else {
      return { status: res.status, message: res.data?.message || "Failed to cancel job", data: res.data };
    }
  } catch (error: any) {
    console.error("Cancel job API error:", error);
    return { status: 500, message: error?.response?.data?.message || error?.message || "Something went wrong" };
  }
};

export const rateJob = async (jobId: string, rating: number, comment: string) => {
  try {
    const body = { rating, comment };
    const res = await postApi(`customers/jobs/${jobId}/rate`, body);
    if (res.status === 200) {
      revalidateTag("booking-jobs");
      return { status: res.status, message: res.data?.message || "Review submitted successfully", data: res.data };
    } else {
      return { status: res.status, message: res.data?.message || "Failed to submit review", data: res.data };
    }
  } catch (error: any) {
    console.error("Rate job API error:", error);
    return { status: 500, message: error?.response?.data?.message || error?.message || "Something went wrong" };
  }
};