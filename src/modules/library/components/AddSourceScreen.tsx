import { theme } from "@/constant/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const sourceOptions = [
  {
    title: "Upload book or PDF",
    description: "eBooks, documents",
    icon: "document-outline" as const,
    route: "/library/upload" as const,
  },
  {
    title: "Upload audio",
    description: "Lectures, podcasts, talks",
    icon: "musical-notes-outline" as const,
  },
  {
    title: "Add video",
    description: "Upload a file or paste a link",
    icon: "play-outline" as const,
  },
  {
    title: "Add link",
    description: "Articles, blog posts, papers",
    icon: "link-outline" as const,
  },
  {
    title: "Record a voice note",
    description: "Capture your own thoughts",
    icon: "mic-outline" as const,
  },
  {
    title: "Scan a document",
    description: "Use your camera",
    icon: "scan-outline" as const,
  },
];

export default function AddSourceScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="Close add source"
          accessibilityRole="button"
          onPress={() => router.back()}
          style={styles.closeButton}
        >
          <Ionicons name="close" size={32} color={theme.color.textSecondary} />
        </Pressable>
        <Text style={styles.title}>Add a source</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View>
        {sourceOptions.map((option) => (
          <Pressable
            key={option.title}
            onPress={() => option.route && router.push(option.route)}
            style={styles.option}
          >
            <View style={styles.iconBox}>
              <Ionicons
                name={option.icon}
                size={28}
                color={theme.color.warning}
              />
            </View>
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={22}
              color={theme.color.textSecondary}
            />
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color.background,
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    height: 76,
    justifyContent: "space-between",
  },
  closeButton: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: 48,
  },
  headerSpacer: {
    width: 48,
  },
  title: {
    color: theme.color.text,
    fontSize: 28,
    fontWeight: "700",
  },
  option: {
    alignItems: "center",
    borderBottomColor: theme.color.border,
    borderBottomWidth: 1,
    flexDirection: "row",
    minHeight: 106,
    paddingVertical: 16,
  },
  iconBox: {
    alignItems: "center",
    backgroundColor: theme.color.surfaceElevated,
    borderRadius: 16,
    height: 68,
    justifyContent: "center",
    width: 68,
  },
  optionText: {
    flex: 1,
    marginLeft: 20,
  },
  optionTitle: {
    color: theme.color.text,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  optionDescription: {
    color: theme.color.textSecondary,
    fontSize: 15,
  },
});
