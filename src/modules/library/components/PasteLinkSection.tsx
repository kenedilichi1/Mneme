import { theme } from "@/constant/theme";
import { StyleSheet, Text, TextInput, View } from "react-native";

type PasteLinkSectionProps = {
  readonly value: string;
  readonly onChangeText: (value: string) => void;
};

export default function PasteLinkSection({
  value,
  onChangeText,
}: PasteLinkSectionProps) {
  return (
    <View>
      <SectionDivider label="or paste a link" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="https://..."
        placeholderTextColor={theme.color.textSecondary}
        autoCapitalize="none"
        keyboardType="url"
        style={styles.input}
      />
    </View>
  );
}

export function SectionDivider({ label }: { readonly label: string }) {
  return (
    <View style={styles.dividerLabel}>
      <View style={styles.divider} />
      <Text style={styles.dividerText}>{label}</Text>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  dividerLabel: {
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
    marginVertical: 32,
  },
  divider: { backgroundColor: theme.color.border, flex: 1, height: 1 },
  dividerText: { color: theme.color.textSecondary, fontSize: 18 },
  input: {
    backgroundColor: theme.color.surfaceElevated,
    borderColor: theme.color.border,
    borderRadius: 20,
    borderWidth: 1,
    color: theme.color.text,
    fontSize: 18,
    paddingHorizontal: 24,
    paddingVertical: 22,
  },
});
