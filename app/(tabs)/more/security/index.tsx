import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import SettingsNavigationCard, {
  SettingsNavigationCardProps,
} from "@/components/more/SettingsNavigationCard";
import { useTheme } from "@/contexts/ThemeContext";
import LockIcon from "@/icons/LockIcon";
import ChevronRight from "@/icons/ChevronRight";
import EmailIcon from "@/icons/EmailIcon";
import Screen from "@/components/common/Screen";
import { router } from "expo-router";

const BaseSecuritySettingsScreen: React.FC = () => {
  const { t } = useTranslation();

  const { colors } = useTheme();
  const cards: SettingsNavigationCardProps[] = [
    {
      title: t("common.password"),
      icon: <LockIcon size={24} color={colors.primaryText} />,
      action: <ChevronRight size={24} color={colors.primaryText} />,
      navigate: () => router.push('/(tabs)/more/security/password'),
    },
    // {
    //   title: t("common.email"),
    //   icon: <EmailIcon size={24} color={colors.primaryText} />,
    //   action: <ChevronRight size={24} color={colors.primaryText} />,
    //   navigate: () => navigation.navigate("ChangePassword"),
    // },
  ];
  return (
    <Screen>
      <View style={{ gap: 16 }}>
        {cards.map((item) => (
          <SettingsNavigationCard
            key={item.title}
            title={item.title}
            action={item.action}
            icon={item.icon}
            navigate={() => item.navigate()}
          />
        ))}
      </View>
    </Screen>
  );
};

export default BaseSecuritySettingsScreen;

const styles = StyleSheet.create({});
