import { focusManager, onlineManager } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import * as Network from "expo-network";
import { useEffect, type ReactNode } from "react";
import { AppState, Platform, type AppStateStatus } from "react-native";

import { persistOptions, queryClient } from "@/lib/queryClient";

/**
 * React Query assumes a browser: it reads `navigator.onLine` and listens for
 * window focus events, neither of which exist in React Native. These two
 * managers supply the native equivalents, otherwise `refetchOnReconnect` and
 * `refetchOnWindowFocus` silently never fire.
 */

// Registered at module scope so the manager is live before the first query runs.
onlineManager.setEventListener((setOnline) => {
  const apply = (state: Network.NetworkState) => {

    setOnline(state.isInternetReachable ?? state.isConnected ?? true);
  };

  
  Network.getNetworkStateAsync()
    .then(apply)
    .catch(() => setOnline(true));

  const subscription = Network.addNetworkStateListener(apply);
  return () => subscription.remove();
});

export function QueryProvider({ children }: { readonly children: ReactNode }) {
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (status: AppStateStatus) => {

        if (Platform.OS === "web") return;
        focusManager.setFocused(status === "active");
      },
    );

    return () => subscription.remove();
  }, []);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={persistOptions}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
