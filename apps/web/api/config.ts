const DEFAULT_API_BASE_URL = "http://localhost:4000";

export const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_BASE_URL,
  timeoutMs: 10000,
};

export { DEFAULT_API_BASE_URL };
