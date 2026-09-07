import SearchBar from "@/components/SearchBar";
import { libraryCategory } from "@/constant/data/libraryCategory";
import { theme } from "@/constant/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";
import LibrarySummaryCard from "./LibraryCategoryCard";

export default function LibrarySection() {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Your Library</Text>
      <View style={styles.categories}>
        {libraryCategory.map((category) => (
          <View key={category.categoryName} style={styles.category}>
            <LibrarySummaryCard
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
        // leadingIcon={
        //   <Ionicons
        //     name="search-outline"
        //     size={22}
        //     color={theme.color.textSecondary}
        //     onPress={() => {
        //   console.log("Search bar pressed");
        // }}
        //   />
        // }
        trailingIcon={
          <View style={styles.trailingIcons}>
            {/* <Ionicons name="mic-outline" size={22} color={theme.color.accent} /> */}
            <Ionicons
              name="arrow-forward"
              size={22}
              color={theme.color.primary}
            />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
    marginTop: 32,
  },
  title: {
    color: theme.color.text,
    fontSize: 18,
    fontWeight: "bold",
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  category: {
    flex: 1,
  },
  trailingIcons: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
});
