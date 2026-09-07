import { Stack } from "expo-router";

export default function LibraryLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="add-source"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="upload"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="confirm-details"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
