/**
 * Every query key in the app lives here so invalidation stays greppable.
 *
 * Keys are hierarchical — invalidating `queryKeys.library.all` also matches
 * every list and detail underneath it.
 */
export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    session: () => [...queryKeys.auth.all, "session"] as const,
  },
  library: {
    all: ["library"] as const,
    lists: () => [...queryKeys.library.all, "list"] as const,
    list: (filters: Readonly<Record<string, unknown>> = {}) =>
      [...queryKeys.library.lists(), filters] as const,
    details: () => [...queryKeys.library.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.library.details(), id] as const,
  },
} as const;

/** Namespace of keys that must never be written to unencrypted storage. */
export const SENSITIVE_KEY_ROOTS: readonly string[] = [queryKeys.auth.all[0]];
