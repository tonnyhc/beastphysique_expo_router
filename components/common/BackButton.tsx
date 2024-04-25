import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import ChevronLeft from "@/icons/ChevronLeft";

interface BackButtonProps {
  onPress: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({});
  return (
    <TouchableOpacity testID="backButton" onPress={onPress}>
      <ChevronLeft size={24} color={colors.primaryText} />
    </TouchableOpacity>
  );
};

export default BackButton;
