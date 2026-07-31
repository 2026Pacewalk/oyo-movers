export const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export const tokenKey = process.env.NEXT_PUBLIC_TOKEN || "devToken";
export const refreshTokenKey =
  process.env.NEXT_PUBLIC_REFRESH_TOKEN || "devRefreshToken";
export const s3ImageBaseUrl = process.env.NEXT_PUBLIC_S3_BUCKET_BASE_URL || "";