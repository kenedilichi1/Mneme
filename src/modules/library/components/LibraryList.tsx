import Ionicons from "@expo/vector-icons/Ionicons";
import { useMemo, useState, type ComponentProps } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { theme } from "@/constant/theme";
import { CATEGORIES, MEDIA_DATA } from "../data/libraryData";
import {
  categoryOf,
  type Category,
  type MediaType,
} from "../types/library.type";

type ViewMode = "list" | "grid";
type IconName = ComponentProps<typeof Ionicons>["name"];

const ICON_BY_TYPE: Record<MediaType, IconName> = {
  Book: "book-outline",
  Audio: "musical-notes-outline",
  Video: "play-circle-outline",
  Note: "create-outline",
};

function SeparatorLine() {
  return <View style={styles.separatorLine} />;
}

export default function LibraryList() {
  const [activeTab, setActiveTab] = useState<Category>("All");
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const filteredData = useMemo(
    () =>
      activeTab === "All"
        ? MEDIA_DATA
        : MEDIA_DATA.filter((item) => categoryOf(item) === activeTab),
    [activeTab],
  );

  return (
    <View style={styles.screenBackground}>
      <View accessibilityRole="tablist" style={styles.tabBarContainer}>
        {CATEGORIES.map((tab) => {
          const isSelected = activeTab === tab;
          return (
            <Pressable
              key={tab}
              accessibilityRole="tab"
              accessibilityState={{ selected: isSelected }}
              onPress={() => setActiveTab(tab)}
              style={styles.tabButton}
            >
              <Text
                style={[
                  styles.tabText,
                  isSelected ? styles.activeTabText : styles.inactiveTabText,
                ]}
              >
                {tab}
              </Text>
              {isSelected && <View style={styles.activeIndicatorLine} />}
            </Pressable>
          );
        })}
      </View>

      <View style={styles.viewToggleContainer}>
        {(["list", "grid"] as const).map((mode) => {
          const isSelected = viewMode === mode;
          return (
            <Pressable
              key={mode}
              accessibilityLabel={`${mode} view`}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              onPress={() => setViewMode(mode)}
              style={[
                styles.viewToggleButton,
                isSelected && styles.activeViewToggleButton,
              ]}
            >
              <Ionicons
                name={mode === "list" ? "list-outline" : "grid-outline"}
                size={20}
                color={
                  isSelected
                    ? styles.activeViewToggleIcon.color
                    : styles.inactiveViewToggleIcon.color
                }
              />
            </Pressable>
          );
        })}
      </View>

      <FlatList
        // Only `numColumns` requires a remount. Keying on activeTab as well
        // threw away scroll position and cell recycling on every tab press.
        key={viewMode}
        data={filteredData}
        numColumns={viewMode === "grid" ? 2 : 1}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={viewMode === "list" ? SeparatorLine : undefined}
        columnWrapperStyle={
          viewMode === "grid" ? styles.gridColumnWrapper : undefined
        }
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isStatusActive = !item.isCompleted;
          return (
            <Pressable
              accessibilityLabel={`${item.title}, ${item.metadata}, ${item.statusText}`}
              accessibilityRole="button"
              style={[
                styles.rowContainer,
                viewMode === "grid" && styles.gridItem,
              ]}
            >
              <View style={styles.iconBox}>
                <Ionicons name={ICON_BY_TYPE[item.type]} style={styles.iconText} />
              </View>

              <View
                style={[
                  styles.contentContainer,
                  viewMode === "grid" && styles.gridContentContainer,
                ]}
              >
                <Text style={styles.titleText} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.metadataText}>{item.metadata}</Text>
              </View>

              <View
                style={[
                  styles.statusContainer,
                  viewMode === "grid" && styles.gridStatusContainer,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    isStatusActive
                      ? styles.activeStatus
                      : styles.inactiveStatus,
                  ]}
                >
                  {item.statusText}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenBackground: {
    flex: 1,
    marginTop: theme.spacing.lg + 2,
  },
  tabBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.xl - 4,
    borderBottomWidth: 1,
    borderColor: theme.color.border,
    paddingTop: theme.spacing.lg,
  },
  viewToggleContainer: {
    alignSelf: "flex-end",
    backgroundColor: theme.color.surfaceElevated,
    borderRadius: theme.radius.sm,
    flexDirection: "row",
    margin: theme.spacing.md,
    padding: 3,
  },
  viewToggleButton: {
    alignItems: "center",
    borderRadius: 6,
    height: 34,
    justifyContent: "center",
    width: 38,
  },
  activeViewToggleButton: {
    backgroundColor: theme.color.brand,
  },
  activeViewToggleIcon: {
    color: theme.color.onBrand,
  },
  inactiveViewToggleIcon: {
    color: theme.color.textSecondary,
  },
  tabButton: {
    alignItems: "center",
    paddingBottom: theme.spacing.md,
    position: "relative",
  },
  tabText: {
    fontSize: theme.fontSize.lg,
    fontWeight: "600",
    letterSpacing: -0.2,
  },
  activeTabText: {
    color: theme.color.text,
  },
  inactiveTabText: {
    color: theme.color.textSecondary,
  },
  activeIndicatorLine: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: theme.color.brand,
    borderRadius: 2,
  },
  listPadding: {
    paddingVertical: theme.spacing.sm,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md - 2,
  },
  gridColumnWrapper: {
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.md - 2,
  },
  gridItem: {
    alignItems: "flex-start",
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: theme.spacing.md + 2,
    paddingVertical: theme.spacing.md + 2,
  },
  iconBox: {
    width: 48,
    height: 48,
    backgroundColor: theme.color.surfaceElevated,
    borderRadius: theme.radius.md,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.color.border,
  },
  iconText: {
    fontSize: theme.fontSize.lg,
    color: theme.color.brand,
  },
  contentContainer: {
    flex: 1,
    marginLeft: theme.spacing.lg,
    justifyContent: "center",
  },
  gridContentContainer: {
    marginLeft: 0,
    marginTop: theme.spacing.md,
    width: "100%",
  },
  titleText: {
    color: theme.color.text,
    fontSize: theme.fontSize.md,
    fontWeight: "700",
    marginBottom: theme.spacing.xs,
  },
  metadataText: {
    color: theme.color.textSecondary,
    fontSize: theme.fontSize.sm,
    fontWeight: "500",
  },
  statusContainer: {
    marginLeft: theme.spacing.md,
  },
  gridStatusContainer: {
    marginLeft: 0,
    marginTop: theme.spacing.sm + 2,
  },
  statusText: {
    fontSize: theme.fontSize.md,
    fontWeight: "700",
  },
  activeStatus: {
    color: theme.color.brand,
  },
  inactiveStatus: {
    color: theme.color.textSecondary,
  },
  separatorLine: {
    height: 1,
    backgroundColor: theme.color.border,
    marginHorizontal: theme.spacing.xl - 4,
  },
});
