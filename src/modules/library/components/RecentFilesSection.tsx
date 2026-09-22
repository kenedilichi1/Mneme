import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

import SectionDivider from "@/components/SectionDivider";
import { theme } from "@/constant/theme";
import { RECENT_FILES } from "../data/libraryData";

export default function RecentFilesSection() {
  return (
    <View>
      <SectionDivider label="recent files" />
      {RECENT_FILES.map((file) => (
        <View key={file.name} style={styles.file}>
          <View style={styles.iconBox}>
            <Ionicons name="book-outline" size={32} color={theme.color.brand} />
          </View>
          <View style={styles.details}>
            <Text style={styles.name} numberOfLines={1}>
              {file.name}
            </Text>
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
    gap: theme.spacing.xl - 4,
    paddingVertical: theme.spacing.lg + 2,
  },
  iconBox: {
    alignItems: "center",
    backgroundColor: theme.color.surfaceElevated,
    borderRadius: theme.radius.lg,
    height: 64,
    justifyContent: "center",
    width: 64,
  },
  details: {
    flex: 1,
  },
  name: {
    color: theme.color.text,
    fontSize: theme.fontSize.xl,
    fontWeight: "700",
  },
  location: {
    color: theme.color.textSecondary,
    fontSize: theme.fontSize.lg,
    marginTop: theme.spacing.xs,
  },
});
