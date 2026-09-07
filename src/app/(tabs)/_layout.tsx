import { theme } from "@/constant/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import type { ComponentProps } from "react";
import type { ColorValue } from "react-native";

type TabIconProps = {
  color: ColorValue;
  focused: boolean;
  focusedName: ComponentProps<typeof Ionicons>["name"];
  unfocusedName: ComponentProps<typeof Ionicons>["name"];
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
  return (
    <Tabs
      screenOptions={{
        sceneStyle: {
          backgroundColor: theme.color.background,
        },

        headerStyle: {
          backgroundColor: theme.color.background,
        },

        headerShadowVisible: false,

        headerTintColor: theme.color.text,

        tabBarStyle: {
          backgroundColor: theme.color.background,
          borderTopColor: theme.color.border,
          borderTopWidth: 1,
          paddingTop: 6,
        },

        tabBarActiveTintColor: theme.color.warning,
        tabBarInactiveTintColor: theme.color.textSecondary,

        tabBarLabelStyle: {
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
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
          headerShown: false,
          sceneStyle: {
            backgroundColor: theme.color.surface,
            paddingHorizontal: 16,
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
