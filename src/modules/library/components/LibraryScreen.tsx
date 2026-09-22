import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchBar from "@/components/SearchBar";
import { theme } from "@/constant/theme";
import LibraryHeader from "./LibraryHeader";
import LibraryList from "./LibraryList";

export default function LibraryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LibraryHeader onAddResource={() => router.push("/library/add-source")} />
      <SearchBar
        placeholder="Search your knowledge"
        leadingIcon={
          <Ionicons
            name="search-outline"
            size={22}
            color={theme.color.textSecondary}
          />
        }
        trailingIcon={
          <View style={styles.trailingIcons}>
            <Ionicons name="mic-outline" size={22} color={theme.color.accent} />
          </View>
        }
      />

      <LibraryList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.surface,
  },
  trailingIcons: {
    alignItems: "center",
    flexDirection: "row",
    gap: theme.spacing.md,
  },
});
