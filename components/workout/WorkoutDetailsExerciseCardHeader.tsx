import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface WorkoutDetailsExerciseCardHeaderProps {
  isExpanded: boolean;
  exerciseName: string;
  index: number;
  setsCount: number;
  cardClickHandler: () => void;

}

const WorkoutDetailsExerciseCardHeader: React.FC<
  WorkoutDetailsExerciseCardHeaderProps
> = ({ isExpanded, exerciseName, index, setsCount, cardClickHandler }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    headingWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    heading: {
      color: colors.primaryText,
      fontSize: 18,
      fontFamily: "RobotoBold",
    },
    subheader: {
      fontSize: 16,
      color: colors.secondaryText,
      //   fontWeight: "500",
      fontFamily: "RobotoMedium",
    },
  });

  return (
    <TouchableOpacity onPress={cardClickHandler}>
      <View style={styles.headingWrapper}>
        <Text style={styles.heading}>
          {index + 1}. {exerciseName}
        </Text>
        {!isExpanded ? (
          <Text style={styles.subheader}>{setsCount} sets</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default WorkoutDetailsExerciseCardHeader;
