import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { theme } from "@/constant/theme";
import { useHydrateAuth } from "@/modules/auth";
import { QueryProvider } from "@/providers/QueryProvider";

export default function RootLayout() {
  // Reads the stored token into memory before any query sends a request.
  useHydrateAuth();

  return (
    <QueryProvider>
      <SafeAreaProvider>
        {/* `headerShown` is set once here rather than repeated per screen. */}
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: theme.color.background },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
        <StatusBar style="light" />
      </SafeAreaProvider>
    </QueryProvider>
  );
}
