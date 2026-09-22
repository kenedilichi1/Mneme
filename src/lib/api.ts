import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

/**
 * Axios instance used by every queryFn / mutationFn in the app.
 *
 * Set EXPO_PUBLIC_API_URL in `.env` to point at your backend. Expo inlines any
 * EXPO_PUBLIC_* variable at build time, so it is readable from `process.env`.
 */

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "";

export class ApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, message: string, body?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }

  get isUnauthorized(): boolean {
    return this.status === 401 || this.status === 403;
  }

  /** 4xx means the request itself was wrong — retrying will not help. */
  get isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }
}

/**
 * Kept in memory so requests can attach it synchronously. SecureStore holds the
 * durable copy; the auth store is the only thing that writes here.
 */
let accessToken: string | null = null;

export function setAccessToken(token: string | null): void {
  accessToken = token;
}

const http = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  timeout: 15_000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// ── Request interceptor ──────────────────────────────────────────────────────
// Attach the Bearer token to every outgoing request.
http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// ── Response interceptor ─────────────────────────────────────────────────────
// Unwrap axios envelope and normalize errors into ApiError.
http.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    if (error.response) {
      const { status, data } = error.response;
      const message = data?.message ?? `Request failed with status ${status}`;
      throw new ApiError(status, message, data);
    }

    if (error.request) {
      throw new ApiError(0, "Network error — please check your connection.");
    }

    throw new ApiError(0, error.message);
  },
);

// ── Typed helpers ────────────────────────────────────────────────────────────

async function unwrap<T>(promise: Promise<{ data: T }>): Promise<T> {
  const { data } = await promise;
  return data;
}

export const api = {
  get: <T>(path: string) => unwrap<T>(http.get<T>(path)),
  post: <T>(path: string, body?: unknown) =>
    unwrap<T>(http.post<T>(path, body)),
  patch: <T>(path: string, body?: unknown) =>
    unwrap<T>(http.patch<T>(path, body)),
  delete: <T>(path: string) => unwrap<T>(http.delete<T>(path)),
};
