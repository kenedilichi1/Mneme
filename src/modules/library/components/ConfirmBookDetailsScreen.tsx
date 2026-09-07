import { theme } from "@/constant/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import Pdf from "react-native-pdf";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { extractDocumentPreview } from "../services/documentPreview";
import { extractBookTitle } from "../utils/bookTitle";

const categories = ["Books", "Articles", "Notes"] as const;

export default function ConfirmBookDetailsScreen() {
  const params = useLocalSearchParams<{
    fileName?: string | string[];
    fileSize?: string | string[];
    fileUri?: string | string[];
  }>();
  const fileName = getParam(params.fileName, "Selected book");
  const fileSize = getParam(params.fileSize, "");
  const fileUri = getParam(params.fileUri, "");
  const isPdf = getExtension(fileName) === "pdf";
  const initialTitle = extractBookTitle(fileName);
  const [title, setTitle] = useState(initialTitle);
  const [author, setAuthor] = useState("");
  const [coverUri, setCoverUri] = useState<string | null>(null);
  const [category, setCategory] =
    useState<(typeof categories)[number]>("Books");

  const fileSizeLabel = fileSize
    ? `${formatFileSize(Number(fileSize))} · PDF`
    : "PDF document";

  useEffect(() => {
    const controller = new AbortController();

    async function loadPreview() {
      try {
        if (!fileUri) return;
        const previewUri = await extractDocumentPreview(fileUri, fileName);
        if (!controller.signal.aborted) setCoverUri(previewUri);
      } catch {
        if (!controller.signal.aborted) setCoverUri(null);
      }
    }

    void loadPreview();

    return () => controller.abort();
  }, [fileName, fileUri]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            accessibilityLabel="Back"
            accessibilityRole="button"
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={theme.color.textSecondary}
            />
          </Pressable>
          <Text style={styles.headerTitle}>Confirm details</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.fileCard}>
          <View style={styles.cover}>
            <CoverPreview fileUri={fileUri} isPdf={isPdf} coverUri={coverUri} />
          </View>
          <View style={styles.fileInfo}>
            <Text style={styles.fileName} numberOfLines={1}>
              {fileName}
            </Text>
            <Text style={styles.fileMetadata}>{fileSizeLabel}</Text>
          </View>
        </View>

        <DetailField label="Title" value={title} onChangeText={setTitle} />
        <DetailField
          label="Author"
          value={author}
          onChangeText={setAuthor}
          placeholder="Add author"
        />

        <Text style={styles.label}>Category</Text>
        <Pressable
          onPress={() => setCategory(nextCategory(category))}
          style={styles.categoryInput}
        >
          <Text style={styles.inputText}>{category}</Text>
          <Ionicons
            name="chevron-down"
            size={22}
            color={theme.color.textSecondary}
          />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.dismissTo("/(tabs)/library")}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>Add to library</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.back()}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function CoverPreview({
  fileUri,
  isPdf,
  coverUri,
}: {
  readonly fileUri: string;
  readonly isPdf: boolean;
  readonly coverUri: string | null;
}) {
  if (isPdf && fileUri) {
    return (
      <View pointerEvents="none" style={styles.pdfPreviewContainer}>
        <Pdf
          source={{ uri: fileUri, cache: true }}
          page={1}
          singlePage
          fitPolicy={2}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.pdfCover}
        />
      </View>
    );
  }

  if (coverUri) {
    return <Image source={{ uri: coverUri }} style={styles.coverImage} />;
  }

  return (
    <Ionicons name="book-outline" size={38} color={theme.color.primaryLight} />
  );
}

function DetailField({
  label,
  value,
  placeholder,
  onChangeText,
}: {
  readonly label: string;
  readonly value: string;
  readonly placeholder?: string;
  readonly onChangeText: (value: string) => void;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.color.textSecondary}
        style={styles.input}
      />
    </View>
  );
}

function getParam(value: string | string[] | undefined, fallback: string) {
  if (Array.isArray(value)) return value[0] ?? fallback;
  return value || fallback;
}

function formatFileSize(bytes: number) {
  if (!bytes) return "Unknown size";
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function getExtension(fileName: string) {
  const extensionIndex = fileName.lastIndexOf(".");
  return extensionIndex === -1
    ? ""
    : fileName.slice(extensionIndex + 1).toLowerCase();
}

function nextCategory(category: (typeof categories)[number]) {
  const index = categories.indexOf(category);
  return categories[(index + 1) % categories.length];
}

const styles = StyleSheet.create({
  container: { backgroundColor: theme.color.background, flex: 1 },
  content: { paddingBottom: 32, paddingHorizontal: 30 },
  header: {
    alignItems: "center",
    flexDirection: "row",
    height: 112,
    justifyContent: "space-between",
  },
  backButton: {
    alignItems: "center",
    backgroundColor: theme.color.surfaceElevated,
    borderRadius: 28,
    height: 46,
    justifyContent: "center",
    width: 46,
  },
  headerTitle: { color: theme.color.text, fontSize: 28, fontWeight: "700" },
  headerSpacer: { width: 46 },
  fileCard: {
    alignItems: "center",
    backgroundColor: theme.color.surfaceElevated,
    borderColor: theme.color.border,
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: "row",
    padding: 24,
  },
  cover: {
    alignItems: "center",
    backgroundColor: theme.color.primary,
    borderRadius: 8,
    height: 100,
    justifyContent: "center",
    width: 76,
  },
  coverImage: {
    borderRadius: 8,
    height: "100%",
    width: "100%",
  },
  pdfCover: {
    height: "100%",
    width: "100%",
  },
  pdfPreviewContainer: {
    height: "100%",
    width: "100%",
  },
  fileInfo: { flex: 1, marginLeft: 24 },
  fileName: { color: theme.color.text, fontSize: 18, fontWeight: "700" },
  fileMetadata: {
    color: theme.color.textSecondary,
    fontSize: 17,
    marginTop: 8,
  },
  field: { marginTop: 32 },
  label: { color: theme.color.textSecondary, fontSize: 18, marginBottom: 12 },
  input: {
    backgroundColor: theme.color.surfaceElevated,
    borderColor: theme.color.border,
    borderRadius: 18,
    borderWidth: 1,
    color: theme.color.text,
    fontSize: 20,
    paddingHorizontal: 24,
    paddingVertical: 22,
  },
  categoryInput: {
    alignItems: "center",
    backgroundColor: theme.color.surfaceElevated,
    borderColor: theme.color.border,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 22,
  },
  inputText: { color: theme.color.text, fontSize: 20 },
  addButton: {
    alignItems: "center",
    backgroundColor: theme.color.warning,
    borderRadius: 20,
    marginTop: 36,
    paddingVertical: 22,
  },
  addButtonText: {
    color: theme.color.background,
    fontSize: 24,
    fontWeight: "700",
  },
  cancelButton: {
    alignItems: "center",
    borderColor: theme.color.border,
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 16,
    paddingVertical: 22,
  },
  cancelButtonText: {
    color: theme.color.text,
    fontSize: 22,
    fontWeight: "700",
  },
});
