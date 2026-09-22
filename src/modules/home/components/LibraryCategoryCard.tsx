import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { theme } from "@/constant/theme";

type LibraryCategoryCardProps = {
  readonly categoryName: string;
  readonly icon: ReactNode;
  readonly totalItems: number;
};

export default function LibraryCategoryCard({
  categoryName,
  icon,
  totalItems,
}: LibraryCategoryCardProps) {
  return (
    <View
      accessible
      accessibilityLabel={`${categoryName}, ${totalItems} items`}
      style={styles.container}
    >
      <View style={styles.icon}>{icon}</View>
      <Text style={styles.categoryName}>{categoryName}</Text>
      <Text style={styles.totalItems}>{totalItems} items</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  icon: {
    marginBottom: theme.spacing.sm,
  },
  categoryName: {
    color: theme.color.text,
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
  },
  totalItems: {
    color: theme.color.textSecondary,
    fontSize: theme.fontSize.xs,
  },
});
