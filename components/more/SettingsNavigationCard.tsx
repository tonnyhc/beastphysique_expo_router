import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { ReactNode } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export type SettingsNavigationCardProps = {
    title: string;
    icon: ReactNode;
    action: ReactNode;
    navigate: () => void;
  };

const SettingsNavigationCard: React.FC<SettingsNavigationCardProps> = ({
  icon,
  title,
  action,
  navigate,
}) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      gap: 8,
      paddingVertical: 12,
      paddingHorizontal: 12,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    icon_and_text: {
      flexDirection: "row",
      gap: 12,
      alignItems: "center",
    },
    title: {
      fontSize: 18,
      fontFamily: "RobotoRegular",
      color: colors.primaryText,
    },
    action: {
      alignSelf: "flex-end",
    },
  });

  return (
    <TouchableOpacity onPress={() => navigate()} style={styles.card}>
      {/* Icon */}
      <View style={styles.icon_and_text}>
        {icon}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.action}>{action}</View>
    </TouchableOpacity>
  );
};

export default SettingsNavigationCard;