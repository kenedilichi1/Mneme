import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import type { PersistQueryClientOptions } from "@tanstack/react-query-persist-client";
import Constants from "expo-constants";

import { ApiError } from "./api";
import { SENSITIVE_KEY_ROOTS } from "./queryKeys";

const MINUTE = 1000 * 60;
const DAY = MINUTE * 60 * 24;

/** How long a restored cache stays usable. `gcTime` must be >= this. */
const CACHE_MAX_AGE = DAY;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: MINUTE,
      gcTime: CACHE_MAX_AGE,
      // A 4xx will fail the same way every time, so only retry transient errors.
      retry: (failureCount, error) => {
        if (error instanceof ApiError && error.isClientError) return false;
        return failureCount < 2;
      },
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
      // Both are driven by the managers wired up in QueryProvider.
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
});

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: "mneme.query-cache",
  // Coalesce writes so a burst of queries doesn't thrash AsyncStorage.
  throttleTime: 1000,
});

export const persistOptions: Omit<PersistQueryClientOptions, "queryClient"> = {
  persister,
  maxAge: CACHE_MAX_AGE,
  // Cache shape may change between releases; drop it on app version change.
  buster: Constants.expoConfig?.version ?? "dev",
  dehydrateOptions: {
    shouldDehydrateQuery: (query) => {
      // AsyncStorage is not encrypted — never let session/user data land there.
      const root = query.queryKey[0];
      if (typeof root === "string" && SENSITIVE_KEY_ROOTS.includes(root)) {
        return false;
      }
      // Writing errored or pending queries back would replay stale failures.
      return query.state.status === "success";
    },
  },
};

/**
 * Wipes the on-disk cache. Call on sign-out so the next account never sees the
 * previous one's data.
 */
export async function clearPersistedCache(): Promise<void> {
  await persister.removeClient();
}
