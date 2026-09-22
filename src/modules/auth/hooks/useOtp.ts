import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";
import {
  requestOtp,
  verifyOtp,
  updateProfile,
  fetchSession,
  type AuthUser,
  type RequestOtpPayload,
  type VerifyOtpPayload,
  type UpdateProfilePayload,
} from "../services/authApi";
import { useAuthStore } from "../stores/authStore";

export function useRequestOtp() {
  return useMutation({
    mutationFn: (payload: RequestOtpPayload) => requestOtp(payload),
  });
}

export function useVerifyOtp() {
  const queryClient = useQueryClient();
  const signIn = useAuthStore((state) => state.signIn);

  return useMutation({
    mutationFn: async (payload: VerifyOtpPayload) => {
      const { access_token } = await verifyOtp(payload);
      await signIn(access_token);

      // Verify only hands back a token, so the profile takes a second call —
      // which is also what tells a fresh signup (no name yet) from a return
      // visit. A failure here is not fatal: the token is already stored and
      // `useSession` will fetch the user again on the next screen.
      let user: AuthUser | null = null;
      try {
        user = await fetchSession();
      } catch {
        // Fall through as a returning user; the session query will retry.
      }

      return { user, isNewUser: user ? !user.first_name : false };
    },
    onSuccess: ({ user }) => {
      if (user) {
        queryClient.setQueryData(queryKeys.auth.session(), user);
      }
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateProfile(payload),
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.auth.session(), user);
    },
  });
}
