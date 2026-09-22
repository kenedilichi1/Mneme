import { StyleSheet, Text, View } from "react-native";

import { theme, typography } from "@/constant/theme";

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
      <View
        accessible
        accessibilityLabel={`${title}, ${progress}% complete, ${chapter}`}
        style={styles.card}
      >
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
    marginTop: theme.spacing.xxl,
  },
  sectionTitle: {
    ...typography.sectionTitle,
    marginBottom: theme.spacing.sm,
  },
  card: {
    alignItems: "center",
    backgroundColor: theme.color.surfaceElevated,
    borderRadius: theme.radius.xxl,
    flexDirection: "row",
    paddingHorizontal: theme.spacing.xl - 4,
    paddingVertical: theme.spacing.lg + 2,
  },
  bookCover: {
    backgroundColor: theme.color.brand,
    borderRadius: theme.radius.sm,
    height: 68,
    width: 48,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: theme.spacing.lg,
  },
  title: {
    color: theme.color.text,
    fontSize: theme.fontSize.xl,
    fontWeight: "700",
    lineHeight: 24,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    color: theme.color.textSecondary,
    fontSize: theme.fontSize.md,
    fontWeight: "500",
  },
});
