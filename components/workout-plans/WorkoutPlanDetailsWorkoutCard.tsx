import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Workout } from "@/types/fitnessTypes";
import { useTheme } from "@/contexts/ThemeContext";

interface WorkoutPlanDetailsWorkoutCardProps {
  workout: Workout;
}

const WorkoutPlanDetailsWorkoutCard: React.FC<
  WorkoutPlanDetailsWorkoutCardProps
> = ({ workout }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    card: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      gap: 10,
      backgroundColor: colors.cardBackground,
      borderRadius: 4,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    cardBody: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    cardTitle: {
      fontSize: 20,
      color: colors.primaryText,
      padding: 10,
      fontFamily: "RobotoMedium",
    },
    cardSubtitle: {
      fontFamily: "RobotoRegular",
      fontSize: 16,
      color: colors.secondaryText,
      padding: 10,
    },
    exercisesWrapper: {
      gap: 12,
    },
    exerciseName: {
      fontSize: 16,
      fontFamily: "RobotoMedium",
      color: colors.primaryText,
    },
    textSmall: {
      fontSize: 13,
      color: colors.secondaryText,
      fontFamily: "RobotoMedium",
      letterSpacing: 0.25,
    },
  });

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.push("WorkoutDetails", { workoutSessionId: workout.id })
      }
      style={styles.card}
    >
      {/* workout name and exc count */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{workout.name}</Text>
        <Text style={styles.cardSubtitle}>
          Exercises: <Text>{workout.exercises.length}</Text>
        </Text>
      </View>
      {/* exercises and total volumes wrapper */}
      <View style={styles.cardBody}>
        {/* exerciseWrapper */}
        <View style={styles.exercisesWrapper}>
          {/* ExerciseCard */}
          {workout.exercises.map((exercise, index) => (
            <View key={exercise.id}>
              <Text style={styles.exerciseName}>
                <Text>{index + 1}. </Text>
                <Text>{exercise.name}</Text>
              </Text>
            </View>
          ))}
        </View>
        {/* total volume wrapper */}
        <View>
          <View>
            <Text style={styles.textSmall}>
              Total sets: <Text>20</Text>
            </Text>
          </View>
          <View>
            <Text style={styles.textSmall}>
              Total weight volume: <Text>1000kg</Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WorkoutPlanDetailsWorkoutCard;
