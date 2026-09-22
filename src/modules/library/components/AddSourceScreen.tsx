import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { theme, typography } from "@/constant/theme";
import { SOURCE_OPTIONS } from "../data/sourceOptions";

export default function AddSourceScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="Close add source"
          accessibilityRole="button"
          onPress={() => router.back()}
          style={styles.closeButton}
        >
          <Ionicons name="close" size={32} color={theme.color.textSecondary} />
        </Pressable>
        <Text style={styles.title}>Add a source</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {SOURCE_OPTIONS.map((option) => {
          const isAvailable = option.route !== undefined;
          return (
            <Pressable
              key={option.title}
              accessibilityLabel={
                isAvailable ? option.title : `${option.title}, coming soon`
              }
              accessibilityRole="button"
              accessibilityState={{ disabled: !isAvailable }}
              disabled={!isAvailable}
              onPress={() => option.route && router.push(option.route)}
              style={({ pressed }) => [
                styles.option,
                !isAvailable && styles.unavailable,
                pressed && styles.pressed,
              ]}
            >
              <View style={styles.iconBox}>
                <Ionicons
                  name={option.icon}
                  size={28}
                  color={theme.color.brand}
                />
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDescription}>
                  {isAvailable ? option.description : "Coming soon"}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={22}
                color={theme.color.textSecondary}
              />
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color.background,
    flex: 1,
    paddingHorizontal: theme.spacing.xl - 4,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    height: 76,
    justifyContent: "space-between",
  },
  closeButton: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: 48,
  },
  headerSpacer: {
    width: 48,
  },
  title: typography.screenTitle,
  option: {
    alignItems: "center",
    borderBottomColor: theme.color.border,
    borderBottomWidth: 1,
    flexDirection: "row",
    minHeight: 106,
    paddingVertical: theme.spacing.lg,
  },
  // Five of these six flows aren't built yet; the row used to look tappable
  // and silently do nothing.
  unavailable: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.7,
  },
  iconBox: {
    alignItems: "center",
    backgroundColor: theme.color.surfaceElevated,
    borderRadius: theme.radius.lg,
    height: 68,
    justifyContent: "center",
    width: 68,
  },
  optionText: {
    flex: 1,
    marginLeft: theme.spacing.xl - 4,
  },
  optionTitle: {
    color: theme.color.text,
    fontSize: theme.fontSize.xl,
    fontWeight: "700",
    marginBottom: theme.spacing.xs + 2,
  },
  optionDescription: {
    color: theme.color.textSecondary,
    fontSize: theme.fontSize.lg - 1,
  },
});
