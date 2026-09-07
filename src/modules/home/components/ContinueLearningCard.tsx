import { theme } from "@/constant/theme";
import { StyleSheet, Text, View } from "react-native";

type ContinueLearningCardProps = {
  readonly title: string;
  readonly progress: number;
  readonly chapter: string;
};

export default function ContinueLearningCard({
  title,
  progress,
  chapter,
}: ContinueLearningCardProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Continue Learning</Text>
      <View style={styles.card}>
        <View style={styles.bookCover} />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.subtitle}>
            {progress}% · {chapter}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    color: theme.color.text,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  card: {
    alignItems: "center",
    backgroundColor: theme.color.surfaceElevated,
    borderRadius: 24,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  bookCover: {
    backgroundColor: theme.color.primary,
    borderRadius: 8,
    height: 68,
    width: 48,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 16,
  },
  title: {
    color: theme.color.text,
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 24,
    marginBottom: 4,
  },
  subtitle: {
    color: theme.color.textSecondary,
    fontSize: 14,
    fontWeight: "500",
  },
});
