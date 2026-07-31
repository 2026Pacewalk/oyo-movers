import { apiUrl, tokenKey } from "@/config";
import { getCookie } from "../cookies";
import axios from "axios";

// Client-side cookie reading function
const getClientCookie = (name: string) => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

const getHeaders = async (tokenData?: string): Promise<{ headers: Record<string, string> }> => {
  let token: string | undefined = tokenData;
  
  if (!token) {
    // Try to get token from URL params (for mobile/onboarding flow)
    if (typeof window !== 'undefined') {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get('token');
        if (urlToken) {
          token = urlToken;
        }
      } catch (error) {
        // Silent fail
      }
    }
    
    // If not in URL, try cookies
    if (!token) {
      const clientToken = getClientCookie(tokenKey);
      
      if (clientToken) {
        token = clientToken;
      } else {
        // Fallback to server-side cookie
        const serverToken = await getCookie(tokenKey) as string;
        token = serverToken;
      }
    }
  }
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  return { headers };
};

export async function getApi(url: string, tags: string[] = [], token?: string) {
  const headers = await getHeaders(token);
  try {
    const res = await fetch(apiUrl + "/" + url, {
      next: { revalidate: 0, tags },
      ...headers,
    });

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      // Non-JSON (e.g., HTML error/redirect). Avoid crashing the app.
      return {} as any;
    }

    const data = await res.json();
    return (data as any)?.data ?? data ?? {};
  } catch (e) {
    // Network/parse error. Return empty object to keep UI stable.
    return {} as any;
  }
}

export async function postApi(url: string, data?: any) {
  const headers = await getHeaders(data?.token);
  delete data?.token;
  
  // Check if data is FormData
  if (data instanceof FormData) {
    // For FormData, don't set Content-Type - let the browser set it with boundary
    const { ["Content-Type"]: _omit, ...headersWithoutContentType } = headers.headers as Record<string, string>;
    headers.headers = headersWithoutContentType as Record<string, string>;
  }
  
  const fullUrl = `${apiUrl}/${url}`;
  console.log("fullUrl", fullUrl);
  return axios.post(fullUrl, data, headers);
}

export async function putApi(url: string, data: unknown) {
  const headers = await getHeaders();
  return axios.put(apiUrl + "/" + url, data, headers);
}

export async function deleteApi(url: string, data?: any, token?: string) {
  const headers = await getHeaders(token);
  return axios.delete(apiUrl + "/" + url, { ...headers, data });
}
