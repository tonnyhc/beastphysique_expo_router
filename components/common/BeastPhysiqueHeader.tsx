import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LogoIcon from "@/icons/LogoIcon";
import { useTheme } from "@/contexts/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

const BeastPhysiqueHeader = () => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    logoWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 12,
      backgroundColor: colors.bg,
    },
    logoText: {
      fontFamily: "IntegralRegular",
      color: colors.primaryText,
      fontSize: 20,
      textTransform: "uppercase",
    },
  });
  return (
    <SafeAreaView style={styles.logoWrapper}>
      <LogoIcon size={32} color={colors.primaryText} />
      <Text style={styles.logoText}>BeastPhysique</Text>
    </SafeAreaView>
  );
};

export default BeastPhysiqueHeader;
