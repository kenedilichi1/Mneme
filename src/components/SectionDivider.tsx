import { StyleSheet, Text, View } from "react-native";

import { theme } from "@/constant/theme";

/**
 * Labelled horizontal rule. Previously exported from inside
 * `PasteLinkSection.tsx` and imported by a sibling, which hid a shared
 * primitive inside a feature file.
 */
export default function SectionDivider({
  label,
}: {
  readonly label: string;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.rule} />
      <Text style={styles.label}>{label}</Text>
      <View style={styles.rule} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    gap: theme.spacing.xl - 4,
    marginVertical: theme.spacing.xxl,
  },
  rule: {
    backgroundColor: theme.color.border,
    flex: 1,
    height: 1,
  },
  label: {
    color: theme.color.textSecondary,
    fontSize: theme.fontSize.xl,
  },
});
