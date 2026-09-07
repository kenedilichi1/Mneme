import { theme } from "@/constant/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { CATEGORIES, MEDIA_DATA } from "../data/libraryData";
import { Category, MediaItem } from "../types/library.type";

function SeparatorLine() {
  return <View style={styles.separatorLine} />;
}

export default function LibraryFilterTab() {
  const [activeTab, setActiveTab] = useState<Category>("All");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const filteredData = MEDIA_DATA.filter((item) => {
    if (activeTab === "All") return true;
    return item.category === activeTab;
  });

  const renderIconSymbol = (type: MediaItem["type"]) => {
    switch (type) {
      case "Book":
        return "book-outline";
      case "Audio":
        return "musical-notes-outline";
      case "Video":
        return "play-circle-outline";
      case "Note":
        return "create-outline";
      default:
        return "document-outline";
    }
  };

  return (
    <View style={styles.screenBackground}>
      <View style={styles.tabBarContainer}>
        {CATEGORIES.map((tab) => {
          const isSelected = activeTab === tab;
          return (
            <Pressable
              key={tab}
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
        <Pressable
          accessibilityLabel="List view"
          accessibilityRole="button"
          onPress={() => setViewMode("list")}
          style={[
            styles.viewToggleButton,
            viewMode === "list" && styles.activeViewToggleButton,
          ]}
        >
          <Ionicons
            name="list-outline"
            size={20}
            color={
              viewMode === "list"
                ? styles.activeViewToggleIcon.color
                : styles.inactiveViewToggleIcon.color
            }
          />
        </Pressable>
        <Pressable
          accessibilityLabel="Grid view"
          accessibilityRole="button"
          onPress={() => setViewMode("grid")}
          style={[
            styles.viewToggleButton,
            viewMode === "grid" && styles.activeViewToggleButton,
          ]}
        >
          <Ionicons
            name="grid-outline"
            size={20}
            color={
              viewMode === "grid"
                ? styles.activeViewToggleIcon.color
                : styles.inactiveViewToggleIcon.color
            }
          />
        </Pressable>
      </View>

      <FlatList
        key={`${activeTab}-${viewMode}`}
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
              style={[
                styles.rowContainer,
                viewMode === "grid" && styles.gridItem,
              ]}
            >
              <View style={styles.iconBox}>
                <Ionicons
                  name={renderIconSymbol(item.type)}
                  style={styles.iconText}
                />
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
    marginTop: 18,
  },
  /* Tab Bar Styling */
  tabBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: theme.color.border,
    paddingTop: 16,
  },
  viewToggleContainer: {
    alignSelf: "flex-end",
    backgroundColor: theme.color.surfaceElevated,
    borderRadius: 8,
    flexDirection: "row",
    margin: 12,
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
    backgroundColor: theme.color.warning,
  },
  activeViewToggleIcon: {
    color: theme.color.background,
  },
  inactiveViewToggleIcon: {
    color: theme.color.textSecondary,
  },
  tabButton: {
    alignItems: "center",
    paddingBottom: 12,
    position: "relative",
  },
  tabText: {
    fontSize: 16,
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
    backgroundColor: theme.color.warning,
    borderRadius: 2,
  },
  listPadding: {
    paddingVertical: 8,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  gridColumnWrapper: {
    gap: 12,
    paddingHorizontal: 10,
  },
  gridItem: {
    alignItems: "flex-start",
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  iconBox: {
    width: 48,
    height: 48,
    backgroundColor: theme.color.surfaceElevated,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.color.border,
  },
  iconText: {
    fontSize: 16,
    color: theme.color.warning,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },
  gridContentContainer: {
    marginLeft: 0,
    marginTop: 12,
    width: "100%",
  },
  titleText: {
    color: theme.color.text,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },
  metadataText: {
    color: theme.color.textSecondary,
    fontSize: 13,
    fontWeight: "500",
  },
  statusContainer: {
    marginLeft: 12,
  },
  gridStatusContainer: {
    marginLeft: 0,
    marginTop: 10,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "700",
  },
  activeStatus: {
    color: theme.color.warning,
  },
  inactiveStatus: {
    color: theme.color.textSecondary,
  },
  separatorLine: {
    height: 1,
    backgroundColor: theme.color.border,
    marginHorizontal: 20,
  },
});
