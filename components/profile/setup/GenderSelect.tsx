import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { useTheme } from "@/contexts/ThemeContext";
import GenderMan from "@/icons/GenderMan";
import GenderWoman from "@/icons/GenderWoman";

interface GenderSelectProps {
  gender: "Man" | "Woman";
  onChange: (value: "Man" | "Woman") => void;
}

const GenderSelect: React.FC<GenderSelectProps> = ({ gender, onChange }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    wrapper: {
      gap: 44,
      justifyContent: "center",
      alignItems: "center",
    },
    circle: {
      width: 140,
      height: 140,
      backgroundColor: colors.helperText,
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
      gap: 12,
    },
    selectedCircle: {
      backgroundColor: colors.button,
    },
    text: {
      fontFamily: "RobotoMedium",
      fontSize: 15,
      color: colors.white,
    },
    selectedText: {
      color: colors.white,
    },
  });

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={() => onChange("Man")}
        style={[styles.circle, gender === "Man" ? styles.selectedCircle : null]}
      >
        <GenderMan size={48} color={colors.white} />
        <Text
          style={[styles.text, gender === "Man" ? styles.selectedText : null]}
        >
          Male
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onChange("Woman")}
        style={[
          styles.circle,
          gender === "Woman" ? styles.selectedCircle : null,
        ]}
      >
        <GenderWoman size={48} color={colors.white} />
        <Text
          style={[styles.text, gender === "Woman" ? styles.selectedText : null]}
        >
          Female
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GenderSelect;
