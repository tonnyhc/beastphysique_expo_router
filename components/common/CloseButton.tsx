import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CloseIcon from "@/icons/CloseIcon";
import { useTheme } from "@/contexts/ThemeContext";

const CloseButton = ({ onPress }: { onPress: () => void }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <CloseIcon size={24} color={colors.primaryText} />
    </TouchableOpacity>
  );
};

export default CloseButton;

