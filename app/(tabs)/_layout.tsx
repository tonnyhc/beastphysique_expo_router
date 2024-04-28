import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import DumbbellIcon from "@/icons/DumbbellIcon";
import HomeIcon from "@/icons/HomeIcon";
import UserIcon from "@/icons/UserIcon";
import MoreIcon from "@/icons/MoreIcon";
import { useTheme } from "@/contexts/ThemeContext";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { colors } = useTheme();

  return (
    <Tabs
      // initialRouteName="index"
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
          title: "Dashboard",
          tabBarIcon: ({ focused, color, size }) => (
            <HomeIcon
              size={size}
              color={color}
              fill={focused ? color : "none"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
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
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color, size }) => (
            <UserIcon
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
