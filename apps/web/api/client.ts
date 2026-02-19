import axios from "axios";
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

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeApiError(error))
);
