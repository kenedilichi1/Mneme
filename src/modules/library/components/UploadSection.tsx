import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { theme } from "@/constant/theme";

type UploadSectionProps = {
  readonly selectedFile: string | null;
  readonly onChooseFile: () => void;
  readonly isChoosingFile?: boolean;
};

export default function UploadSection({
  selectedFile,
  onChooseFile,
  isChoosingFile = false,
}: UploadSectionProps) {
  return (
    <View style={styles.panel}>
      <View style={styles.documentIconBox}>
        <Ionicons name="book-outline" size={38} color={theme.color.brand} />
      </View>
      <Text style={styles.title}>Choose a file to upload</Text>
      <Text style={styles.description}>PDF, EPUB, or MOBI · up to 200MB</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: isChoosingFile, busy: isChoosingFile }}
        disabled={isChoosingFile}
        onPress={onChooseFile}
        style={[styles.button, isChoosingFile && styles.disabledButton]}
      >
        <Text style={styles.buttonText}>
          {isChoosingFile ? "Opening files…" : "Choose file"}
        </Text>
      </Pressable>
      {selectedFile ? (
        <Text
          style={styles.selectedFile}
          numberOfLines={1}
          ellipsizeMode="middle"
        >
          {selectedFile}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    alignItems: "center",
  },
  documentIconBox: {
    alignItems: "center",
    backgroundColor: theme.color.surfaceElevated,
    borderRadius: theme.radius.xxl,
    height: 80,
    justifyContent: "center",
    marginBottom: theme.spacing.xl + 4,
    width: 92,
  },
  title: {
    color: theme.color.text,
    fontSize: theme.fontSize.xl,
    fontWeight: "700",
    textAlign: "center",
  },
  description: {
    color: theme.color.textSecondary,
    fontSize: theme.fontSize.md,
    marginTop: theme.spacing.md,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: theme.color.brand,
    borderRadius: theme.radius.xl,
    marginTop: theme.spacing.xxl + 26,
    paddingVertical: theme.spacing.xl - 2,
    width: "100%",
  },
  buttonText: {
    color: theme.color.onBrand,
    fontSize: theme.fontSize.xl,
    fontWeight: "700",
  },
  disabledButton: {
    opacity: 0.7,
  },
  selectedFile: {
    color: theme.color.textSecondary,
    fontSize: theme.fontSize.sm,
    marginTop: theme.spacing.md,
    maxWidth: "100%",
  },
});
