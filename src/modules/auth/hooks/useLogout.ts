import { useMutation, useQueryClient } from "@tanstack/react-query";

import { clearPersistedCache } from "@/lib/queryClient";
import { logout } from "../services/authApi";
import { useAuthStore } from "../stores/authStore";

export function useLogout() {
  const queryClient = useQueryClient();
  const signOut = useAuthStore((state) => state.signOut);

  return useMutation({
    mutationFn: async () => {
      try {
        await logout();
      } catch {
        // Revoking server-side is best effort — a network failure must not
        // trap the user in a signed-in state.
      }
    },
    // onSettled, not onSuccess: the local session is cleared either way.
    onSettled: async () => {
      await signOut();
      // Every cached query belonged to the previous account, including the
      // copy already written to AsyncStorage.
      queryClient.removeQueries();
      await clearPersistedCache();
    },
  });
}
