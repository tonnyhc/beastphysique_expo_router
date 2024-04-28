import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface SetupScreenHeaderProps {
  header: string;
  subheader: string;
}

const SetupScreenHeader: React.FC<SetupScreenHeaderProps> = ({
  header,
  subheader,
}) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      fontFamily: "RobotoBold",
      color: colors.primaryText,
    },
    subtitle: {
      fontSize: 14,
      fontFamily: "RobotoRegular",
      color: colors.primaryText,
    },
  });
  return (
    <View style={{ gap: 8 }}>
      <Text style={styles.title}>{header}</Text>
      <Text style={styles.subtitle}>{subheader}</Text>
    </View>
  );
};

export default SetupScreenHeader;