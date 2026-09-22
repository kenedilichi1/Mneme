import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/Header";
import { useSession } from "@/modules/auth";
import { homeContent } from "../data/homeContent";
import ContinueLearningCard from "./ContinueLearningCard";
import LibrarySection from "./LibrarySection";
import TodayProgressSection from "./TodayProgressSection";

function greetingForHour(hour: number): string {
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

export default function HomeScreen() {
  const { user } = useSession();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Header
          primaryText={user?.first_name ?? "Welcome"}
          secondaryText={greetingForHour(new Date().getHours())}
        />
        <ContinueLearningCard {...homeContent.currentBook} />
        <TodayProgressSection progress={homeContent.todayProgress} />
        <LibrarySection />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 16,
  },
});
