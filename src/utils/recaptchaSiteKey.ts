/** Google reCAPTCHA v2 test key — works on localhost and LAN IPs for development */
export const RECAPTCHA_TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

const LOCAL_HOST_PATTERNS = [
  /^localhost$/i,
  /^127\.0\.0\.1$/,
  /^192\.168\.\d{1,3}\.\d{1,3}$/,
  /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
  /^172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}$/,
  /\.local$/i,
];

export const isLocalRecaptchaHost = (hostname?: string): boolean => {
  if (!hostname) return false;
  return LOCAL_HOST_PATTERNS.some((pattern) => pattern.test(hostname));
};

/** Use test key on localhost / LAN so mobile dev (e.g. http://192.168.x.x:3000) works */
export const getRecaptchaSiteKey = (): string => {
  const envKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim();
  if (typeof window === "undefined") {
    return envKey || RECAPTCHA_TEST_SITE_KEY;
  }
  if (isLocalRecaptchaHost(window.location.hostname)) {
    return RECAPTCHA_TEST_SITE_KEY;
  }
  return envKey || RECAPTCHA_TEST_SITE_KEY;
};

export const shouldBypassRecaptchaValidation = (): boolean => {
  if (typeof window === "undefined") return false;
  return isLocalRecaptchaHost(window.location.hostname);
};
