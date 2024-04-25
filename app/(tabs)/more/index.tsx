import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import React from "react";
// import SettingsFrameWrapper, {
//   SettingsFrameWrapperProps,
// } from "../../components/more-screen/SettingsFrameWrapper";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import UserIcon from "@/icons/UserIcon";
import DumbbellIcon from "@/icons/DumbbellIcon";
import ChevronRight from "./ChevronRight";
import ScaleIcon from "./ScaleIcon";
import EditIcon from "@/icons/EditIcon";
import NotificationIcon from "./NotificationIcon";
import LanguageIcon from "./LanguageIcon";
import ShieldIcon from "./ShieldIcon";
import MoonIcon from "./MoonIcon";
import FlagIcon from "./FlagIcon";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import Screen from "@/components/common/Screen";
import Button from "@/components/common/Button";
import LogoutIcon from "@/icons/LogoutIcon";
import SettingsNavigationCard, {
  SettingsNavigationCardProps,
} from "@/components/more/SettingsNavigationCard";

const generateCategories = (
  colors: Colors,
  toggleDarkMode: () => void,
  theme: string,
  t: (key: string) => string
) => {
  const categories: {
    categoryName: string;
    properties: SettingsNavigationCardProps[];
  }[] = [
    // Health & Fitness
    {
      categoryName: t("screens.more.health_fitness"),
      properties: [
        // Exercises
        {
          title: t("screens.more.exercises"),
          icon: <DumbbellIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
          navigate: () => router.replace("/(tabs)/more"),
        },
        // Workouts
        {
          title: t("screens.more.workouts"),
          icon: <DumbbellIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
          navigate: () => router.replace("/(tabs)/more"),
        },
        // Weight
        {
          title: t("screens.more.weight"),
          icon: <ScaleIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
          navigate: () => router.replace("/(tabs)/more"),
        },
        // Goal
        {
          title: t("screens.more.goal"),
          icon: <EditIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
          navigate: () => router.replace("/(tabs)/more"),
        },
      ],
    },
    // Settings & Preferences
    {
      categoryName: t("screens.more.settings_preferences"),
      properties: [
        // Account
        {
          title: t("screens.more.account"),
          icon: <UserIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
          navigate: () => router.replace("/(tabs)/more"),
        },

        // Notifications
        {
          title: t("screens.more.notifications"),
          icon: <NotificationIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
          navigate: () => {},
        },
        // Language
        {
          title: t("screens.more.language"),
          icon: <LanguageIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
          navigate: () => router.replace("/(tabs)/more"),
        },
        // Security
        {
          title: t("screens.more.security"),
          icon: <ShieldIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
          navigate: () => router.replace("/(tabs)/more"),
        },
        // Dark mode
        {
          title: t("screens.more.darkMode"),
          icon: <MoonIcon size={24} color={colors.primaryText} />,
          action: (
            <Switch
              value={theme === "dark" ? true : false}
              onChange={() => toggleDarkMode()}
            />
          ),
          navigate: () => toggleDarkMode(),
        },
      ],
    },
    // Support
    {
      categoryName: t("screens.more.support"),
      properties: [
        // Help center
        {
          title: t("screens.more.helpCenter"),
          icon: <NotificationIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
        },
        // Report a bug
        {
          title: t("screens.more.reportBug"),
          icon: <FlagIcon size={24} color={colors.primaryText} />,
          action: <ChevronRight size={24} color={colors.primaryText} />,
        },
      ],
    },
  ];

  return categories;
};

const BaseMoreScreen: React.FC = () => {
  const { t } = useTranslation();
  const { colors, toggleTheme, theme } = useTheme();
  const { onLogout } = useAuth();
  const categories = generateCategories(colors, toggleTheme, theme, t);

  const styles = StyleSheet.create({
    frame: {
      gap: 16,
      paddingBottom: 24,
      borderBottomWidth: 1,
      borderBottomColor: colors.secondaryText,

      paddingTop: 10,
    },
    title: {
      fontSize: 18,
      color: colors.primaryText,
      fontFamily: "RobotoMedium",
    },
    properties: {
      gap: 18,
    },
  });

  return (
    <Screen>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: 30,
          gap: 10,
          flex: 1,
        }}
      >
        {categories.map((cat, index) => (
          <View style={styles.frame} key={index}>
            <Text style={styles.title}>{cat.categoryName}</Text>
            <View style={styles.properties}>
              {cat.properties.map((prop, index) => (
                <SettingsNavigationCard
                  title={prop.title}
                  icon={prop.icon}
                  action={prop.action}
                  navigate={prop.navigate}
                />
              ))}
            </View>
          </View>
        ))}
        <View style={{ alignItems: "flex-start" }}>
          <Button
            textStyles={{ color: colors.error }}
            onPress={() => (onLogout ? onLogout() : null)}
            leftIcon={<LogoutIcon size={24} color={colors.error} />}
            type="text"
            text={t("screens.more.logOut")}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

export default BaseMoreScreen;
