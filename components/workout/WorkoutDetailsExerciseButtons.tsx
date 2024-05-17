import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import TimelineIcon from "@/icons/TimelineIcon";
import GearIcon from "@/icons/GearIcon";
import InfoIcon from "@/icons/InfoIcon";
import { useTheme } from "@/contexts/ThemeContext";
import { router } from "expo-router";

interface WorkoutDetailsExerciseButtonsProps {
  onModify: () => void;
}

const WorkoutDetailsExerciseButtons: React.FC<
  WorkoutDetailsExerciseButtonsProps
> = ({ onModify }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    buttonsWrapper: {
      flexDirection: "row",
      gap: 30,
      paddingHorizontal: 8,
    },
    button: {
      gap: 4,
    },
    buttonText: {
      color: colors.button,
      fontSize: 16,
    },
  });

  return (
    <View style={styles.buttonsWrapper}>
      <TouchableOpacity
        // onPress={() => navigation.navigate("ExerciseProgress")}
        style={styles.button}
      >
        <TimelineIcon size={22} color={colors.button} />
        <Text style={styles.buttonText}>Progress</Text>
      </TouchableOpacity>
      <TouchableOpacity

        onPress={() => onModify()}
        style={styles.button}
      >
        <GearIcon size={22} color={colors.button} />
        <Text style={styles.buttonText}>Modify</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <InfoIcon size={22} color={colors.button} />
        </View>
        <Text style={styles.buttonText}>Info</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WorkoutDetailsExerciseButtons;
