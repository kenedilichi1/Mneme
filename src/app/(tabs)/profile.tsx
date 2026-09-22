import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { theme, typography } from "@/constant/theme";
import { SignOutButton, useSession } from "@/modules/auth";

export default function ProfileRoute() {
  const { user, isResolving } = useSession();

  const fullName =
    [user?.first_name, user?.last_name].filter(Boolean).join(" ") || "Unknown";

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.card}>
        <Text style={styles.name}>
          {isResolving ? "Loading…" : fullName}
        </Text>
        {!!user?.email && <Text style={styles.email}>{user.email}</Text>}
      </View>

      <View style={styles.footer}>
        <SignOutButton />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color.background,
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
  },
  title: {
    ...typography.screenTitle,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  card: {
    backgroundColor: theme.color.surfaceElevated,
    borderColor: theme.color.border,
    borderRadius: theme.radius.xxl,
    borderWidth: 1,
    gap: theme.spacing.sm,
    padding: theme.spacing.xl,
  },
  name: {
    color: theme.color.text,
    fontSize: theme.fontSize.xl,
    fontWeight: "700",
  },
  email: {
    color: theme.color.textSecondary,
    fontSize: theme.fontSize.md,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: theme.spacing.xxl,
  },
});
