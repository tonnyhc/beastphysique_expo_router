import { SafeAreaView, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { ReactNode } from "react";
import { useTheme } from "../../contexts/ThemeContext";

interface StackHeaderProps {
  headerLeft?: ReactNode;
  headerTitle: string;
  headerRight?: ReactNode;
  headerStyles?: ViewStyle,
}

const StackHeader: React.FC<StackHeaderProps> = ({
  headerLeft,
  headerTitle,
  headerRight,
  headerStyles
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
      ...headerStyles
    },
    headerTitle: {
      fontSize: 16,
      fontFamily: "RobotoMedium",
      color: colors.primaryText,
      textAlign: "center",
      flex: 1.5,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={{ flex: 1, alignItems: 'flex-start' }}>{headerLeft}</View>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>{headerRight}</View>
      </View>
    </SafeAreaView>
  );
};

export default StackHeader;
