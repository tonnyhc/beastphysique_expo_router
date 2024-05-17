import { useCreateWorkoutContext } from "@/contexts/CreateWorkoutContext";
import { useTheme } from "@/contexts/ThemeContext";
import { ExerciseSession } from "@/types/fitnessTypes";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import ExerciseSessionMoreModal from "./ExerciseSessionMoreModal";
import ExerciseSessionRepRangeModal from "./ExerciseSessionRepRangeModal";
import ExerciseSessionNotesModal from "./ExerciseSessionNotesModal";

import Button from "../common/Button";

import * as Haptics from "expo-haptics";
import ExerciseSessionSetCreationCard from "./ExerciseSessionSetCreationCard";

interface ExerciseSessionCreationCardProps {
  exercise: ExerciseSession;
  exerciseIndex: number;
}

const ExerciseSessionCreationCard: React.FC<
  ExerciseSessionCreationCardProps
> = ({ exerciseIndex, exercise }) => {
  const { colors } = useTheme();
  const {
    workout,
    addSetToExercise,
    deleteSetFromExercise,
    editSetProperty,
    deleteExercise,
    editExerciseNotes,
    duplicateExerciseSet,
  } = useCreateWorkoutContext();
  const [isMoreModalOpen, setIsMoreModalOpen] = useState<boolean>(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState<boolean>(false);
  const [isRepRangeModalOpen, setIsRepRangeModalOpen] =
    useState<boolean>(false);
  const [setIndex, setSetIndex] = useState<number | null>(null);

  const deleteExerciseAlert = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert(
      `Delete "${exercise.exercise.name}"`,
      `Are you sure you want to delete this exercise?`,
      [
        {
          text: "Delete",
          onPress: () => deleteExercise(exerciseIndex),
          style: "destructive",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  const renderRightExerciseActions = () => {
    return (
      <TouchableOpacity
        style={{ height: "100%", justifyContent: "flex-end" }}
        onPress={() => deleteExerciseAlert()}
      >
        <Animated.View
          style={{
            backgroundColor: colors.error,
            justifyContent: "center",
            height: "100%",
            alignItems: "center",
            marginBottom: 16,
            paddingHorizontal: 48,
            marginLeft: 24,
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
  const openRepRangeModal = (setIndex: number) => {
    setIsRepRangeModalOpen(true);
    setSetIndex(setIndex);
  };
  const closeRepRangeModal = () => {
    setIsRepRangeModalOpen(false);
    setSetIndex(null);
  };

  const openMoreModal = (setIndex: number) => {
    setIsMoreModalOpen(true);
    setSetIndex(setIndex);
  };

  const closeMoreModal = () => {
    setIsMoreModalOpen(false);
    setSetIndex(null);
  };

  const styles = StyleSheet.create({
    card: {
      paddingTop: 20,
      paddingBottom: 25,
      gap: 20,
      backgroundColor: colors.bg,
      borderBottomWidth: 0.5,
      borderColor: colors.secondaryText,
    },
    headingRow: {
      flexDirection: "row",
      gap: 15,
    },
    exerciseIndex: {
      fontSize: 16,
      fontFamily: "RobotoMedium",
      color: colors.secondaryText,
    },
    exerciseName: {
      fontSize: 16,
      fontFamily: "RobotoMedium",
      color: colors.primaryText,
    },
    setsWrapper: {
      gap: 20,
      flexGrow: 1,
    },
  });

  return (
    <>
      <ExerciseSessionMoreModal
        visible={isMoreModalOpen}
        closeModal={() => closeMoreModal()}
        setIndex={setIndex as number | 0}
        exerciseIndex={exerciseIndex}
        editSetProperty={editSetProperty}
        deleteSetFromExercise={() =>
          deleteSetFromExercise(exerciseIndex, setIndex as unknown as number)
        }
        set={exercise.sets[setIndex ? setIndex : 0]}
      />
      <ExerciseSessionRepRangeModal
        set={workout.exercises[exerciseIndex].sets[setIndex ? setIndex : 0]}
        editSetProperty={editSetProperty}
        exerciseIndex={exerciseIndex}
        setIndex={setIndex as number}
        visible={isRepRangeModalOpen}
        closeModal={closeRepRangeModal}
      />
      <ExerciseSessionNotesModal
        setData={(value: string) => editExerciseNotes(exerciseIndex, value)}
        data={exercise.notes}
        visible={isNotesModalOpen}
        closeModal={() => setIsNotesModalOpen(false)}
      />
      <Swipeable
        containerStyle={{
          backgroundColor: colors.bg,
        }}
        renderRightActions={renderRightExerciseActions}
        friction={1}
        onSwipeableOpen={() => deleteExerciseAlert()}
      >
        <View style={styles.card}>
          <View style={styles.headingRow}>
            <Text style={styles.exerciseIndex}>{exerciseIndex + 1}</Text>
            <Text style={styles.exerciseName}>{exercise.exercise.name}</Text>
          </View>
          <View style={styles.setsWrapper}>
            {exercise.sets.map((item, index) => (
              <ExerciseSessionSetCreationCard
                set={item}
                setIndex={index}
                exerciseIndex={exerciseIndex}
                editSetProperty={editSetProperty}
                openRepRangeModal={openRepRangeModal}
                openMoreModal={openMoreModal}
                deleteSetFromExercise={deleteSetFromExercise}
                duplicateExerciseSet={duplicateExerciseSet}
              />
            ))}

            <View>
              <Button
                text="Add set"
                type="text"
                onPress={() => addSetToExercise(exerciseIndex)}
              />
              <Button
                text="Notes"
                type="text"
                onPress={() => setIsNotesModalOpen(true)}
              />
            </View>
          </View>
        </View>
      </Swipeable>
    </>
  );
};

export default ExerciseSessionCreationCard;
