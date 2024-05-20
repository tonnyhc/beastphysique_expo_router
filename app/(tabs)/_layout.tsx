import React from "react";
import { Tabs } from "expo-router";

import { useColorScheme } from "@/components/useColorScheme";
import DumbbellIcon from "@/icons/DumbbellIcon";
import HomeIcon from "@/icons/HomeIcon";
import MoreIcon from "@/icons/MoreIcon";
import { useTheme } from "@/contexts/ThemeContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { colors } = useTheme();

  return (
    <Tabs
      initialRouteName="workouts"
      screenOptions={{
        tabBarActiveTintColor: colors.primaryText,
        tabBarStyle: {
          backgroundColor: colors.bg,
          borderTopWidth: 0,
          paddingTop: 18,
        },
        tabBarItemStyle: {
          width: 24,
          height: 24,
        },
        tabBarShowLabel: false,

        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        // headerShown: useClientOnlyValue(false, true),
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Workouts",
          tabBarIcon: ({ focused, color, size }) => (
            <DumbbellIcon
              size={size}
              color={color}
              fill={focused ? color : "none"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ focused, color, size }) => (
            <MoreIcon
              size={size}
              color={color}
              fill={focused ? color : "none"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
