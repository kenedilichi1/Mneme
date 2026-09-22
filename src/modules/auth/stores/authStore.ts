import { create } from "zustand";

import { setAccessToken } from "@/lib/api";
import * as tokenStorage from "../services/tokenStorage";

type AuthState = {
  readonly token: string | null;
  readonly isAuthenticated: boolean;
  /** False until SecureStore has been read once on launch. */
  readonly hasHydrated: boolean;
  readonly hydrate: () => Promise<void>;
  readonly signIn: (token: string) => Promise<void>;
  readonly signOut: () => Promise<void>;
};

/**
 * Holds the token in memory so `api.ts` can attach it synchronously, and
 * exposes `isAuthenticated` reactively for route guards. SecureStore is the
 * durable copy; TanStack Query owns the *user* data via `useSession`.
 */
export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  hasHydrated: false,

  hydrate: async () => {
    const token = await tokenStorage.getToken();
    setAccessToken(token);
    set({ token, isAuthenticated: token !== null, hasHydrated: true });
  },

  signIn: async (token) => {
    await tokenStorage.setToken(token);
    setAccessToken(token);
    set({ token, isAuthenticated: true });
  },

  signOut: async () => {
    await tokenStorage.clearToken();
    setAccessToken(null);
    set({ token: null, isAuthenticated: false });
  },
}));
