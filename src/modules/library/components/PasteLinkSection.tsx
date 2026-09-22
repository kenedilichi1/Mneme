import { StyleSheet, TextInput, View } from "react-native";

import SectionDivider from "@/components/SectionDivider";
import { theme } from "@/constant/theme";

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
        accessibilityLabel="Paste a link"
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

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.color.surfaceElevated,
    borderColor: theme.color.border,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    color: theme.color.text,
    fontSize: theme.fontSize.xl,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.xl - 2,
  },
});
