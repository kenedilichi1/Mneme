import { theme } from "@/constant/theme";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.color.background },
        animation: "fade",
      }}
    >
      <Stack.Screen name="authentication" />
      <Stack.Screen name="verifyotp" />
      <Stack.Screen name="complete-profile" />
    </Stack>
  );
}
