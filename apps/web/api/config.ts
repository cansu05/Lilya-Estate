const DEFAULT_API_BASE_URL = "http://localhost:4000";
const DEFAULT_API_TIMEOUT_MS = 8000;

function parseTimeoutMs(value: string | undefined): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : DEFAULT_API_TIMEOUT_MS;
}

export const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_BASE_URL,
  timeoutMs: parseTimeoutMs(process.env.NEXT_PUBLIC_API_TIMEOUT_MS),
};

export { DEFAULT_API_BASE_URL, DEFAULT_API_TIMEOUT_MS, parseTimeoutMs };
