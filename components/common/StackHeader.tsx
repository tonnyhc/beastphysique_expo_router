import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { useTheme } from "../../contexts/ThemeContext";

interface StackHeaderProps {
  headerLeft?: ReactNode;
  headerTitle: string;
  headerRight?: ReactNode;
}

const StackHeader: React.FC<StackHeaderProps> = ({
  headerLeft,
  headerTitle,
  headerRight,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    safeArea: {
      backgroundColor: colors.bg,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 12,
      minHeight: 50,
    },
    headerTitle: {
      fontSize: 18,
      fontFamily: "RobotoMedium",
      color: colors.primaryText,
      textAlign: "center",
      flex: 1,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={{ flex: .5 }}>{headerLeft}</View>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
        <View style={{ flex: .5 }}>{headerRight}</View>
      </View>
    </SafeAreaView>
  );
};

export default StackHeader;
