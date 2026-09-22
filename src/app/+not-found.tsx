import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { theme } from "@/constant/theme";

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page not found</Text>
      <Text style={styles.subtitle}>
        That link doesn&apos;t lead anywhere in Mneme.
      </Text>
      <Link href="/(tabs)" replace style={styles.link}>
        Go to my library
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: theme.color.background,
    flex: 1,
    gap: theme.spacing.md,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.xl,
  },
  title: {
    color: theme.color.text,
    fontSize: theme.fontSize.xxl,
    fontWeight: "700",
  },
  subtitle: {
    color: theme.color.textSecondary,
    fontSize: theme.fontSize.lg,
    textAlign: "center",
  },
  link: {
    color: theme.color.brand,
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    marginTop: theme.spacing.sm,
  },
});
