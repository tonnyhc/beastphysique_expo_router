import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface FitnessGoalCardProps {
  heading: string;
  helperText: string;
  isActive: boolean;
  onPress: (name: string) => void;
}

const FitnessGoalCard: React.FC<FitnessGoalCardProps> = ({
  isActive,
  heading,
  helperText,
  onPress,
}) => {
  const { colors, theme } = useTheme();
  const styles = StyleSheet.create({
    card: {
      backgroundColor: isActive ? colors.button : "transparent",
      borderColor: colors.helperText,
      borderWidth: 2,
      borderRadius: 8,
      padding: 20,
    },
    headingText: {
      fontSize: 20,
      color: isActive ? "#FFF" : colors.primaryText,
      fontWeight: "600",
      fontFamily: "RobotoSlabBold",
      marginBottom: 10,
    },
    subText: {
      fontFamily: "RobotoRegular",
      color: colors.helperText,
      letterSpacing: 0.25,
    },
  });
  return (
    <TouchableOpacity onPress={() => onPress(heading)} style={styles.card}>
      <Text style={styles.headingText}>{heading}</Text>
      <Text style={styles.subText}>{helperText}</Text>
    </TouchableOpacity>
  );
};

export default FitnessGoalCard;
