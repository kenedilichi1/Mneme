import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

import { theme } from "@/constant/theme";
import { useLogout } from "../hooks/useLogout";

/**
 * The app previously had no sign-out path at all — `useLogout` existed but
 * nothing called it.
 */
export default function SignOutButton() {
  const { mutate: signOut, isPending } = useLogout();

  return (
    <Pressable
      accessibilityLabel="Sign out"
      accessibilityRole="button"
      accessibilityState={{ disabled: isPending, busy: isPending }}
      disabled={isPending}
      onPress={() => signOut()}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      {isPending ? (
        <ActivityIndicator color={theme.color.error} />
      ) : (
        <Text style={styles.label}>Sign out</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderColor: theme.color.border,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    paddingVertical: theme.spacing.lg + 2,
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    color: theme.color.error,
    fontSize: theme.fontSize.xl,
    fontWeight: "700",
  },
});
