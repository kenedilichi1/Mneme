import { useEffect } from "react";

import { useAuthStore } from "../stores/authStore";

/**
 * Reads the stored token once on launch. Call this in the root layout, above
 * anything that reads `isAuthenticated`, and hold navigation until
 * `hasHydrated` is true so you don't bounce the user to the login screen while
 * a valid token is still being read off disk.
 */
export function useHydrateAuth(): boolean {
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    if (!hasHydrated) {
      hydrate();
    }
  }, [hasHydrated, hydrate]);

  return hasHydrated;
}
