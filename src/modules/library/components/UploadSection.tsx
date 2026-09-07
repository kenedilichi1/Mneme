import { theme } from "@/constant/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
        <Ionicons name="book-outline" size={38} color={theme.color.warning} />
      </View>
      <Text style={styles.title}>Choose a file to upload</Text>
      <Text style={styles.description}>PDF, EPUB, or MOBI · up to 200MB</Text>
      <Pressable
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
    borderColor: theme.color.border,
    borderRadius: 28,
    borderStyle: "dashed",
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  documentIconBox: {
    alignItems: "center",
    backgroundColor: theme.color.surfaceElevated,
    borderRadius: 24,
    height: 80,
    justifyContent: "center",
    marginBottom: 28,
    width: 92,
  },
  title: {
    color: theme.color.text,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  description: {
    color: theme.color.textSecondary,
    fontSize: 14,
    marginTop: 12,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: theme.color.warning,
    borderRadius: 20,
    marginTop: 58,
    paddingVertical: 22,
    width: "100%",
  },
  buttonText: {
    color: theme.color.background,
    fontSize: 18,
    fontWeight: "700",
  },
  disabledButton: {
    opacity: 0.7,
  },
  selectedFile: {
    color: theme.color.textSecondary,
    fontSize: 13,
    marginTop: 12,
    maxWidth: "100%",
  },
});
