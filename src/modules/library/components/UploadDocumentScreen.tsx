import Ionicons from "@expo/vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { theme, typography } from "@/constant/theme";
import PasteLinkSection from "./PasteLinkSection";
import RecentFilesSection from "./RecentFilesSection";
import UploadSection from "./UploadSection";

export default function UploadDocumentScreen() {
  const [link, setLink] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isChoosingFile, setIsChoosingFile] = useState(false);

  const chooseFile = useCallback(async () => {
    if (isChoosingFile) return;

    setIsChoosingFile(true);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "application/epub+zip",
          "application/x-mobipocket-ebook",
        ],
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const file = result.assets[0];
        setSelectedFile(file.name);
        router.push({
          pathname: "/library/confirm-details",
          params: {
            fileName: file.name,
            fileUri: file.uri,
            fileSize: file.size?.toString() ?? "",
          },
        });
      }
    } finally {
      setIsChoosingFile(false);
    }
  }, [isChoosingFile]);

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
            {/* Was a raw "←" glyph, which renders inconsistently per platform. */}
            <Ionicons
              name="arrow-back"
              size={24}
              color={theme.color.textSecondary}
            />
          </Pressable>
          <Text style={styles.headerTitle}>Upload book</Text>
          <View style={styles.headerSpacer} />
        </View>

        <UploadSection
          selectedFile={selectedFile}
          onChooseFile={chooseFile}
          isChoosingFile={isChoosingFile}
        />
        <PasteLinkSection value={link} onChangeText={setLink} />
        <RecentFilesSection />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color.background,
    flex: 1,
  },
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
  headerSpacer: {
    width: 46,
  },
});
