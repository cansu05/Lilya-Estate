import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { apiConfig } from "./config";
import { ApiError, type ApiErrorCode } from "./types";

function mapStatusToCode(status?: number): ApiErrorCode {
  if (!status) return "UNKNOWN_ERROR";
  if (status === 400) return "BAD_REQUEST";
  if (status === 401) return "UNAUTHORIZED";
  if (status === 403) return "FORBIDDEN";
  if (status === 404) return "NOT_FOUND";
  if (status >= 500) return "SERVER_ERROR";
  return "UNKNOWN_ERROR";
}

function normalizeApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    if (error.code === "ECONNABORTED") {
      return new ApiError("Request timeout", "TIMEOUT");
    }

    if (!error.response) {
      return new ApiError("Network error", "NETWORK_ERROR");
    }

    const status = error.response.status;
    const code = mapStatusToCode(status);
    const message =
      (error.response.data as { message?: string })?.message ??
      `Request failed with status ${status}`;

    return new ApiError(message, code, status, error.response.data);
  }

  return new ApiError("Unexpected error", "UNKNOWN_ERROR");
}

export const apiClient = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeoutMs,
});

const RETRYABLE_STATUS_CODES = new Set([429, 500, 502, 503, 504]);
const MAX_RETRY_COUNT = 1;
const INITIAL_RETRY_DELAY_MS = 200;

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  __retryCount?: number;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shouldRetry(error: AxiosError, retryCount: number): boolean {
  if (retryCount >= MAX_RETRY_COUNT) return false;

  const method = error.config?.method?.toUpperCase();
  if (method && method !== "GET" && method !== "HEAD") return false;

  if (error.code === "ERR_CANCELED") return false;

  // Prevent long request chains on cold starts: retry network/timeouts only once.
  if (error.code === "ECONNABORTED") return retryCount === 0;
  if (!error.response) return retryCount === 0;

  return RETRYABLE_STATUS_CODES.has(error.response.status);
}

async function retryIfNeeded(error: AxiosError) {
  const requestConfig = error.config as RetryableRequestConfig | undefined;
  if (!requestConfig) {
    throw error;
  }

  const retryCount = requestConfig.__retryCount ?? 0;
  if (!shouldRetry(error, retryCount)) {
    throw error;
  }

  requestConfig.__retryCount = retryCount + 1;
  const delayMs = INITIAL_RETRY_DELAY_MS * Math.pow(2, retryCount);
  await sleep(delayMs);

  return apiClient.request(requestConfig);
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isAxiosError(error)) {
      try {
        return await retryIfNeeded(error);
      } catch (finalError) {
        return Promise.reject(normalizeApiError(finalError));
      }
    }

    return Promise.reject(normalizeApiError(error));
  }
);
