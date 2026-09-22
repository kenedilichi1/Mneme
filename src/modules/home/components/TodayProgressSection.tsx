import { StyleSheet, Text, View } from "react-native";

import ProgressBarCard from "@/components/ProgressBarCard";
import { theme, typography } from "@/constant/theme";

type TodayProgressSectionProps = {
  readonly progress: number;
};

export default function TodayProgressSection({
  progress,
}: TodayProgressSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Today&apos;s Progress</Text>
      <ProgressBarCard progress={progress} />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: theme.spacing.xxl,
  },
  title: {
    ...typography.sectionTitle,
    marginBottom: theme.spacing.sm,
  },
});
