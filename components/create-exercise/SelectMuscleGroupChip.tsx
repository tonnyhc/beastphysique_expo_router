import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import CloseIcon from "@/icons/CloseIcon";
import { TouchableOpacity } from "react-native-gesture-handler";

interface SelectMuscleGroupChipProps {
  name: string;
  remove: (name: string) => void;
}

const SelectMuscleGroupChip: React.FC<SelectMuscleGroupChipProps> = ({
  name,
  remove,
}) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    muscleGroupChip: {
      paddingVertical: 8,
      paddingHorizontal: 14,
      backgroundColor: colors.helperText,
      borderRadius: 40,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      gap: 4,
    },
    muscleGroupChipText: {
      fontFamily: "RobotoRegular",
      fontSize: 18,
      color: colors.white,
    },
  });

  return (
    <View style={styles.muscleGroupChip}>
      <Text style={styles.muscleGroupChipText}>{name}</Text>
      <TouchableOpacity onPress={() => remove(name)}>
        <CloseIcon size={18} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default SelectMuscleGroupChip;
