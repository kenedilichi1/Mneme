import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
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
import Pdf from "react-native-pdf";

import { theme, typography } from "@/constant/theme";
import { extractDocumentPreview } from "../services/documentPreview";
import type { ItemCategory } from "../types/library.type";
import {
  documentLabel,
  extractBookTitle,
  formatFileSize,
  getExtension,
} from "../utils/fileName";

const CATEGORIES: readonly ItemCategory[] = ["Books", "Audio", "Videos", "Notes"];

export default function ConfirmBookDetailsScreen() {
  const params = useLocalSearchParams<{
    fileName?: string | string[];
    fileSize?: string | string[];
    fileUri?: string | string[];
  }>();

  const fileName = firstParam(params.fileName, "Selected book");
  const fileSize = firstParam(params.fileSize, "");
  const fileUri = firstParam(params.fileUri, "");
  const isPdf = getExtension(fileName) === "pdf";

  // Derived, with the user's edit taking precedence. A `useState(initialTitle)`
  // initialiser would keep the previous file's title if this screen is reached
  // again with different params, and syncing it via an effect would cascade a
  // second render.
  const [titleEdit, setTitleEdit] = useState<string | null>(null);
  const title = titleEdit ?? extractBookTitle(fileName);

  const [author, setAuthor] = useState("");
  const [coverUri, setCoverUri] = useState<string | null>(null);
  const [category, setCategory] = useState<ItemCategory>("Books");

  // The label used to read "PDF" for every upload, including EPUB and MOBI.
  const label = documentLabel(fileName);
  const fileSizeLabel = fileSize
    ? `${formatFileSize(Number(fileSize))} · ${label}`
    : `${label} document`;

  useEffect(() => {
    // `extractDocumentPreview` takes no abort signal, so there is nothing to
    // cancel — this flag only stops a late result from setting state after
    // unmount. An AbortController here implied cancellation that never existed.
    let cancelled = false;

    (async () => {
      if (!fileUri) return;
      try {
        const previewUri = await extractDocumentPreview(fileUri, fileName);
        if (!cancelled) setCoverUri(previewUri);
      } catch {
        if (!cancelled) setCoverUri(null);
      }
    })();

    return () => {
      cancelled = true;
    };
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

        <DetailField label="Title" value={title} onChangeText={setTitleEdit} />
        <DetailField
          label="Author"
          value={author}
          onChangeText={setAuthor}
          placeholder="Add author"
        />

        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryRow}>
          {CATEGORIES.map((option) => {
            const isSelected = option === category;
            return (
              <Pressable
                key={option}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
                onPress={() => setCategory(option)}
                style={[
                  styles.categoryChip,
                  isSelected && styles.categoryChipSelected,
                ]}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    isSelected && styles.categoryChipTextSelected,
                  ]}
                >
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.dismissTo("/(tabs)/library")}
          style={styles.addButton}
        >
          {/* TODO: persist the book before dismissing — this currently
              discards the title, author and category. */}
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

  return <Ionicons name="book-outline" size={38} color={theme.color.onBrand} />;
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
        accessibilityLabel={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.color.textSecondary}
        style={styles.input}
      />
    </View>
  );
}

function firstParam(value: string | string[] | undefined, fallback: string) {
  if (Array.isArray(value)) return value[0] ?? fallback;
  return value || fallback;
}

const styles = StyleSheet.create({
  container: { backgroundColor: theme.color.background, flex: 1 },
  content: {
    paddingBottom: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.xxl - 2,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    height: 112,
    justifyContent: "space-between",
  },
  backButton: {
    alignItems: "center",
    backgroundColor: theme.color.surfaceElevated,
    borderRadius: theme.radius.xxxl,
    height: 46,
    justifyContent: "center",
    width: 46,
  },
  headerTitle: typography.screenTitle,
  headerSpacer: { width: 46 },
  fileCard: {
    alignItems: "center",
    backgroundColor: theme.color.surfaceElevated,
    borderColor: theme.color.border,
    borderRadius: theme.radius.xxl,
    borderWidth: 1,
    flexDirection: "row",
    padding: theme.spacing.xl,
  },
  cover: {
    alignItems: "center",
    backgroundColor: theme.color.brand,
    borderRadius: theme.radius.sm,
    height: 100,
    justifyContent: "center",
    overflow: "hidden",
    width: 76,
  },
  coverImage: { height: "100%", width: "100%" },
  pdfCover: { height: "100%", width: "100%" },
  pdfPreviewContainer: { height: "100%", width: "100%" },
  fileInfo: { flex: 1, marginLeft: theme.spacing.xl },
  fileName: {
    color: theme.color.text,
    fontSize: theme.fontSize.xl,
    fontWeight: "700",
  },
  fileMetadata: {
    color: theme.color.textSecondary,
    fontSize: theme.fontSize.lg,
    marginTop: theme.spacing.sm,
  },
  field: { marginTop: theme.spacing.xxl },
  label: {
    color: theme.color.textSecondary,
    fontSize: theme.fontSize.xl,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.xxl,
  },
  input: {
    backgroundColor: theme.color.surfaceElevated,
    borderColor: theme.color.border,
    borderRadius: theme.radius.lg + 2,
    borderWidth: 1,
    color: theme.color.text,
    fontSize: theme.fontSize.xl,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.xl - 2,
  },
  // Was a tap-to-cycle Pressable behind a chevron-down, which read as a
  // dropdown and never revealed the available options.
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
  },
  categoryChip: {
    backgroundColor: theme.color.surfaceElevated,
    borderColor: theme.color.border,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  categoryChipSelected: {
    backgroundColor: theme.color.brand,
    borderColor: theme.color.brand,
  },
  categoryChipText: {
    color: theme.color.textSecondary,
    fontSize: theme.fontSize.lg,
    fontWeight: "600",
  },
  categoryChipTextSelected: {
    color: theme.color.onBrand,
  },
  addButton: {
    alignItems: "center",
    backgroundColor: theme.color.brand,
    borderRadius: theme.radius.xl,
    marginTop: theme.spacing.xxl + 4,
    paddingVertical: theme.spacing.xl - 2,
  },
  addButtonText: {
    color: theme.color.onBrand,
    fontSize: theme.fontSize.xxl,
    fontWeight: "700",
  },
  cancelButton: {
    alignItems: "center",
    borderColor: theme.color.border,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    marginTop: theme.spacing.lg,
    paddingVertical: theme.spacing.xl - 2,
  },
  cancelButtonText: {
    color: theme.color.text,
    fontSize: theme.fontSize.xxl,
    fontWeight: "700",
  },
});
