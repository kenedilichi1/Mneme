import { theme } from "@/constant/theme";
import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

type LibraryCategoryCardProps = {
  readonly categoryName: string;
  readonly icon: ReactNode;
  readonly totalItems: number;
};

export default function LibrarySummaryCard({
  categoryName,
  icon,
  totalItems,
}: LibraryCategoryCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>{icon}</View>
      <Text style={styles.categoryName}>{categoryName}</Text>
      <Text style={styles.totalItems}>{totalItems} items</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 8,
  },
  icon: {
    marginBottom: 8,
  },
  categoryName: {
    color: theme.color.text,
    fontSize: 16,
    fontWeight: "bold",
  },
  totalItems: {
    color: theme.color.textSecondary,
    fontSize: 12,
  },
});
