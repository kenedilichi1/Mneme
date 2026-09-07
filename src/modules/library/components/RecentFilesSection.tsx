import { theme } from "@/constant/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";
import { SectionDivider } from "./PasteLinkSection";

const recentFiles = [
  { name: "kafka-definitive-guide.pdf", location: "On this device" },
  { name: "sre-book-google.epub", location: "iCloud Drive" },
];

export default function RecentFilesSection() {
  return (
    <View>
      <SectionDivider label="recent files" />
      {recentFiles.map((file) => (
        <View key={file.name} style={styles.file}>
          <View style={styles.iconBox}>
            <Ionicons
              name="book-outline"
              size={32}
              color={theme.color.warning}
            />
          </View>
          <View>
            <Text style={styles.name}>{file.name}</Text>
            <Text style={styles.location}>{file.location}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  file: {
    alignItems: "center",
    borderBottomColor: theme.color.border,
    borderBottomWidth: 1,
    flexDirection: "row",
    gap: 20,
    paddingVertical: 18,
  },
  iconBox: {
    alignItems: "center",
    backgroundColor: theme.color.surfaceElevated,
    borderRadius: 16,
    height: 64,
    justifyContent: "center",
    width: 64,
  },
  name: { color: theme.color.text, fontSize: 18, fontWeight: "700" },
  location: { color: theme.color.textSecondary, fontSize: 16, marginTop: 4 },
});
