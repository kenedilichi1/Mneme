import { StyleSheet, Text, View } from "react-native";

import { theme } from "@/constant/theme";

/**
 * Stand-in for tabs that have no implementation yet. Replaces three
 * byte-identical screen files.
 */
export default function PlaceholderScreen({
  title,
  description,
}: {
  readonly title: string;
  readonly description?: string;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {!!description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: theme.color.background,
    flex: 1,
    gap: theme.spacing.sm,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.xl,
  },
  title: {
    color: theme.color.text,
    fontSize: theme.fontSize.xxl,
    fontWeight: "700",
  },
  description: {
    color: theme.color.textSecondary,
    fontSize: theme.fontSize.lg,
    textAlign: "center",
  },
});
