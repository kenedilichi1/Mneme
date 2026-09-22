import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, Tabs } from "expo-router";
import type { ComponentProps } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import type { ColorValue } from "react-native";

import { theme } from "@/constant/theme";
import { useAuthStore } from "@/modules/auth";

type TabIconProps = {
  readonly color: ColorValue;
  readonly focused: boolean;
  readonly focusedName: ComponentProps<typeof Ionicons>["name"];
  readonly unfocusedName: ComponentProps<typeof Ionicons>["name"];
};

function TabIcon({ color, focused, focusedName, unfocusedName }: TabIconProps) {
  return (
    <Ionicons
      name={focused ? focusedName : unfocusedName}
      color={color}
      size={24}
    />
  );
}

export default function TabLayout() {
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // The guard lives here rather than in the splash screen so that deep links
  // (the app registers the `mneme://` scheme) and back-navigation can't reach
  // the tabs unauthenticated.
  if (!hasHydrated) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={theme.color.brand} />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/authentication" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: theme.color.background },
        headerStyle: { backgroundColor: theme.color.background },
        headerShadowVisible: false,
        headerTintColor: theme.color.text,
        tabBarStyle: {
          backgroundColor: theme.color.background,
          borderTopColor: theme.color.border,
          borderTopWidth: 1,
          paddingTop: 6,
        },
        tabBarActiveTintColor: theme.color.brand,
        tabBarInactiveTintColor: theme.color.textSecondary,
        tabBarLabelStyle: { fontSize: 11 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              focused={focused}
              focusedName="home-sharp"
              unfocusedName="home-outline"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          sceneStyle: {
            backgroundColor: theme.color.surface,
            paddingHorizontal: theme.spacing.lg,
          },
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              focused={focused}
              focusedName="library-sharp"
              unfocusedName="library-outline"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="learn"
        options={{
          title: "Learn",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              focused={focused}
              focusedName="school"
              unfocusedName="school-outline"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="ask"
        options={{
          title: "Ask",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              focused={focused}
              focusedName="chatbubble"
              unfocusedName="chatbubble-outline"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              focused={focused}
              focusedName="person"
              unfocusedName="person-outline"
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  loading: {
    alignItems: "center",
    backgroundColor: theme.color.background,
    flex: 1,
    justifyContent: "center",
  },
});
