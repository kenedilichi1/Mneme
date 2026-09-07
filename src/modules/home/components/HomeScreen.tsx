import Header from "@/components/Header";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { homeContent } from "../data/homeContent";
import ContinueLearningCard from "./ContinueLearningCard";
import LibrarySection from "./LibrarySection";
import TodayProgressSection from "./TodayProgressSection";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Header
          primaryText={homeContent.userName}
          secondaryText="Good Morning"
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
