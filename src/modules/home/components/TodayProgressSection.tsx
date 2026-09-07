import PremiumProgressCard from "@/components/ProgressBarCard";
import { theme } from "@/constant/theme";
import { StyleSheet, Text, View } from "react-native";

type TodayProgressSectionProps = {
  readonly progress: number;
};

export default function TodayProgressSection({
  progress,
}: TodayProgressSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Today&apos;s Progress</Text>
      <PremiumProgressCard progress={progress} />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 32,
  },
  title: {
    color: theme.color.text,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
