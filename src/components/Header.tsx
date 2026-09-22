import { StyleSheet, Text, View } from "react-native";

import { theme } from "@/constant/theme";

type HeaderProps = {
  readonly primaryText: string;
  readonly secondaryText: string;
  readonly subText?: string;
};

export default function Header({
  primaryText,
  secondaryText,
  subText,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.secondaryText}>{secondaryText}</Text>
      <Text style={styles.primaryText}>{primaryText}</Text>
      {!!subText && <Text style={styles.subText}>{subText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: theme.spacing.xs,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  secondaryText: {
    color: theme.color.textSecondary,
    fontSize: theme.fontSize.md,
  },
  primaryText: {
    color: theme.color.text,
    fontSize: theme.fontSize.xxxl + 4,
    fontWeight: "700",
  },
  subText: {
    color: theme.color.text,
    fontSize: theme.fontSize.md,
  },
});
