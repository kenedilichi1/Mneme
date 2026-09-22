import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import SearchBar from "@/components/SearchBar";
import { theme, typography } from "@/constant/theme";
import { libraryCategory } from "../data/libraryCategory";
import LibraryCategoryCard from "./LibraryCategoryCard";

export default function LibrarySection() {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Your Library</Text>

      <View style={styles.categories}>
        {libraryCategory.map((category) => (
          <View key={category.categoryName} style={styles.category}>
            <LibraryCategoryCard
              categoryName={category.categoryName}
              icon={
                <Ionicons
                  name={category.icon}
                  size={32}
                  color={theme.color.text}
                />
              }
              totalItems={category.totalItems}
            />
          </View>
        ))}
      </View>

      <SearchBar
        label="Ask your knowledge"
        placeholder="What do my books say about..."
        onPress={() => router.push("/(tabs)/ask")}
        trailingIcon={
          <Ionicons name="arrow-forward" size={22} color={theme.color.brand} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: theme.spacing.lg,
    marginTop: theme.spacing.xxl,
  },
  title: typography.sectionTitle,
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing.lg,
  },
  category: {
    flex: 1,
  },
});
