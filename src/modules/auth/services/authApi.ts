import { api } from "@/lib/api";
import type {
  AuthUser,
  RequestOtpPayload,
  RequestOtpResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
  UpdateProfilePayload,
} from "../types/auth.type";

export type {
  AuthUser,
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  RequestOtpPayload,
  RequestOtpResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
  UpdateProfilePayload,
} from "../types/auth.type";

export function requestOtp(
  payload: RequestOtpPayload,
): Promise<RequestOtpResponse> {
  return api.post<RequestOtpResponse>("/auth/request-otp", payload);
}

export function verifyOtp(
  payload: VerifyOtpPayload,
): Promise<VerifyOtpResponse> {
  return api.post<VerifyOtpResponse>("/auth/verify-otp", payload);
}

export function updateProfile(
  payload: UpdateProfilePayload,
): Promise<AuthUser> {
  return api.patch<AuthUser>("/auth/profile", payload);
}

export function fetchSession(): Promise<AuthUser> {
  return api.get<AuthUser>("/auth/me");
}

export function logout(): Promise<null> {
  return api.post<null>("/auth/logout");
}
