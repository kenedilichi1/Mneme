import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { ApiError } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { fetchSession } from "../services/authApi";
import { useAuthStore } from "../stores/authStore";

/**
 * The signed-in user. Never persisted to disk (see `shouldDehydrateQuery` in
 * queryClient.ts) — it is refetched from the token on each launch.
 */
export function useSession() {
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const signOut = useAuthStore((state) => state.signOut);

  const query = useQuery({
    queryKey: queryKeys.auth.session(),
    queryFn: fetchSession,
    // No point asking who we are before the token is loaded, or without one.
    enabled: hasHydrated && isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });

  // A rejected token is not a transient failure — drop it so the UI falls back
  // to the unauthenticated state instead of retrying forever.
  useEffect(() => {
    if (query.error instanceof ApiError && query.error.isUnauthorized) {
      signOut();
    }
  }, [query.error, signOut]);

  return {
    ...query,
    user: query.data ?? null,
    isAuthenticated,
    /** True while either the token or the user is still being resolved. */
    isResolving: !hasHydrated || (isAuthenticated && query.isPending),
  };
}
