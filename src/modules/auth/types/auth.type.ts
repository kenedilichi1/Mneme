import { z } from "zod";

// ── Domain types ─────────────────────────────────────────────────────────────

/** Mirrors the backend's `UserPublic` schema, snake_case included. */
export type AuthUser = {
  readonly id: string;
  readonly email: string;
  readonly first_name: string | null;
  readonly last_name: string | null;
};

export type AuthResponse = {
  readonly token: string;
  readonly user: AuthUser;
};

export type LoginPayload = {
  readonly email: string;
  readonly password: string;
};

export type RegisterPayload = LoginPayload & {
  readonly name: string;
};

export type RequestOtpPayload = {
  readonly email: string;
};

export type RequestOtpResponse = {
  readonly message: string;
};

export type VerifyOtpPayload = {
  readonly email: string;
  readonly otp: string;
};

/**
 * `/auth/verify-otp` returns the bearer token and nothing else — the profile
 * comes from a follow-up `/auth/me`. See `useVerifyOtp`.
 */
export type VerifyOtpResponse = {
  readonly access_token: string;
  readonly token_type: string;
};

export type UpdateProfilePayload = {
  readonly name: string;
  readonly lastName?: string;
};

// ── Form schemas ─────────────────────────────────────────────────────────────

export const emailSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
});

export type EmailForm = z.infer<typeof emailSchema>;

export const profileSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name is too long"),
  lastName: z
    .string()
    .max(50, "Last name is too long")
    .optional()
    .or(z.literal("")),
});

export type ProfileForm = z.infer<typeof profileSchema>;
