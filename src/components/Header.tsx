import { theme } from "@/constant/theme";
import { StyleSheet, Text, View } from "react-native";

type HomeHeaderProps = {
  readonly primaryText: string;
  readonly secondaryText: string;
  readonly subText?: string;
};

export default function HomeHeader({
  primaryText,
  secondaryText,
  subText,
}: HomeHeaderProps) {
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
    display: "flex",
    flexDirection: "column",
    gap: 4,
    marginTop: 16,
    marginBottom: 16,
  },
  secondaryText: {
    color: theme.color.textSecondary,
    fontSize: 14,
  },
  primaryText: {
    color: theme.color.text,
    fontSize: 32,
    fontWeight: "bold",
  },
  subText: {
    color: theme.color.text,
  },
});
