import { useCreateWorkoutPlanContext } from "@/contexts/CreateWorkoutPlanContext";
import { useTheme } from "@/contexts/ThemeContext";
import { ExerciseSession, Workout } from "@/types/fitnessTypes";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";

import Modal from "react-native-modal";
import Button from "../common/Button";
import { Swipeable } from "react-native-gesture-handler";
import { router } from "expo-router";

interface CreateWorkoutPlanWorkoutCardProps {
  workout: Workout;
  workoutIndex: number;
}

const CreateWorkoutPlanWorkoutCard: React.FC<
  CreateWorkoutPlanWorkoutCardProps
> = ({ workout, workoutIndex }) => {
  const { colors } = useTheme();
  const { deleteWorkout } = useCreateWorkoutPlanContext();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const onDeleteWorkout = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    setDeleteModal(true);
  };

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 12,
      // borderWidth: 1,
      borderColor: colors.cardBackground,
      paddingVertical: 10,
    },
    cardContent: {
      gap: 10,
    },
    workoutName: {
      fontSize: 18,
      color: colors.primaryText,
      fontFamily: "RobotoMedium",
    },
    exerciseNameWrapper: {
      flex: 1,
      paddingVertical: 10,
      flexDirection: "row",
      gap: 10,
    },
    exerciseName: {
      fontFamily: "RobotoMedium",
      fontSize: 16,
      color: colors.secondaryText,
    },
    exerciseSetsCount: {
      fontFamily: "RobotoMedium",
      fontSize: 16,
      color: colors.secondaryText,
    },
    cardAction: {},
    deleteModal: {
      backgroundColor: colors.bg,
      borderRadius: 20,
      padding: 30,
    },
  });
  const renderRightActions = () => {
    return (
      <TouchableOpacity
        style={{
          height: "100%",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        onPress={() => onDeleteWorkout()}
      >
        <Animated.View
          style={{
            backgroundColor: colors.error,
            justifyContent: "center",
            height: "100%",
            flex: 1,
            alignItems: "center",
            paddingHorizontal: 48,
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "RobotoRegular",
              color: colors.white,
            }}
          >
            Delete
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Modal
        onBackdropPress={() => setDeleteModal(false)}
        isVisible={deleteModal}
      >
        <View style={styles.deleteModal}>
          <Text
            style={{
              fontFamily: "RobotoMedium",
              fontSize: 16,
              textAlign: "center",
              color: colors.primaryText,
            }}
          >
            Are you sure you want to delete{" "}
            {workout?.name ? workout.name : "this workout"}?
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              marginTop: 20,
              justifyContent: "center",
            }}
          >
            <Button
              buttonStyles={{
                backgroundColor: colors.error,
                borderColor: colors.error,
              }}
              onPress={() => deleteWorkout(workoutIndex)}
              text="Delete"
            />
            <Button
              onPress={() => setDeleteModal(false)}
              type="outlined"
              text="Cancel"
            />
          </View>
        </View>
      </Modal>

      <Swipeable
        friction={1}
        renderRightActions={renderRightActions}
        overshootRight={true}
        onSwipeableWillOpen={() => onDeleteWorkout()}
      >
        <TouchableWithoutFeedback
          onPress={() =>
            router.push({
              pathname: "/create-workout/",
              params: {
                workoutToEditIndex: workoutIndex.toString(),
                makeRequest: workout.id ? "true" : "false",
                editWorkout: "true",
              },
            })
          }
        >
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.workoutName}>
                {workout?.name ? workout.name : `Workout ${workoutIndex + 1}`}
              </Text>
              <View>
                {workout.exercises.length === 0 ? (
                  <Text>Add exercises</Text>
                ) : null}
                {workout.exercises.map(
                  (item: ExerciseSession, index: number) => (
                    <View style={styles.exerciseNameWrapper} key={item.id}>
                      <Text style={styles.exerciseName}>
                        {item.exercise.name}
                      </Text>
                      <Text
                        style={{ fontSize: 16, color: colors.secondaryText }}
                      >
                        {" "}
                        -{" "}
                      </Text>
                      <Text style={styles.exerciseSetsCount}>
                        {item.sets.length} sets
                      </Text>
                    </View>
                  )
                )}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Swipeable>
    </>
  );
};

export default CreateWorkoutPlanWorkoutCard;
