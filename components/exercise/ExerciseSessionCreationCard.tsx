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
import Input from "../common/Input";
import Button from "../common/Button";
import MoreDotsIcon from "@/icons/MoreDotsIcon";
import CopyIcon from "@/icons/CopyIcon";
import { dir } from "i18next";
import * as Haptics from "expo-haptics";

interface ExerciseSessionCreationCardProps {
  exercise: ExerciseSession;
  exerciseIndex: number;
}

const ExerciseSessionCreationCard: React.FC<
  ExerciseSessionCreationCardProps
> = ({ exerciseIndex, exercise }) => {
  const { colors } = useTheme();
  const {
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

  const renderRightSetActions = (setIndex: number, setId: number) => {
    return (
      <TouchableOpacity
        style={{ height: "100%", justifyContent: "flex-start" }}
        onPress={() => deleteSetFromExercise(exerciseIndex, setIndex, setId)}
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
              textAlign: "center",
            }}
          >
            Delete
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const renderLeftSetActions = (setIndex: number, setId: number) => {
    return (
      <TouchableOpacity
        style={{ height: "100%" }}
        onPress={() => duplicateExerciseSet(exerciseIndex, setIndex)}
      >
        <Animated.View
          style={{
            backgroundColor: "#F59300",
            justifyContent: "center",
            height: "100%",
            alignItems: "center",
            marginBottom: 16,
            paddingHorizontal: 48,
            marginRight: 48,
          }}
        >
          <CopyIcon size={24} color={colors.primaryText} />
        </Animated.View>
      </TouchableOpacity>
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
      // fontSize: 20,
      fontSize: 16,
      fontFamily: "RobotoMedium",
      color: colors.secondaryText,
    },
    exerciseName: {
      // fontSize: 20,
      fontSize: 16,
      fontFamily: "RobotoMedium",
      color: colors.primaryText,
    },
    setsWrapper: {
      gap: 20,
      flexGrow: 1,
    },
    setCard: {
      justifyContent: "space-between",
      flexDirection: "row",
      backgroundColor: colors.bg,
    },
    setProperty: {
      gap: 10,
    },
    proprtyText: {
      fontFamily: "RobotoMedium",
      color: colors.secondaryText,
      alignSelf: "center",
    },
  });

  return (
    <>
      <ExerciseSessionMoreModal
        visible={isMoreModalOpen}
        closeModal={() => closeMoreModal()}
        setIndex={setIndex as number | 0}
        exerciseIndex={exerciseIndex}
        exercise={exercise}
      />
      <ExerciseSessionRepRangeModal
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
            {exercise.sets?.map((item, index) => (
              <Swipeable
                renderRightActions={() =>
                  renderRightSetActions(index, item.id as number)
                }
                renderLeftActions={() =>
                  renderLeftSetActions(index, item.id as number)
                }
                overshootRight={true}
                overshootFriction={5}
                overshootLeft={true}
                onSwipeableOpen={(direction) =>
                  direction == "left"
                    ? duplicateExerciseSet(exerciseIndex, index)
                    : deleteSetFromExercise(exerciseIndex, index)
                }
                friction={1}
              >
                <View style={styles.setCard}>
                  <View style={styles.setProperty}>
                    <Text style={[styles.proprtyText, { flex: 1 }]}>Set</Text>
                    <Text style={[styles.proprtyText, { flex: 1 }]}>
                      {index + 1}
                    </Text>
                  </View>
                  {/* Reps */}
                  <View style={styles.setProperty}>
                    <Text style={styles.proprtyText}>Reps</Text>
                    {item.to_failure.toString() === "false" ? (
                      <Input
                        borderStyles={{
                          paddingLeft: 4,
                          paddingRight: 4,
                          justifyContent: "center",
                        }}
                        inputMode="numeric"
                        styles={{
                          width: 80,
                        }}
                        placeholder=""
                        onChange={(value: string) =>
                          editSetProperty(exerciseIndex, index, "reps", value)
                        }
                        value={item.reps.toString()}
                      />
                    ) : (
                      <Text
                        style={{
                          fontSize: 14,
                          color: colors.primaryText,
                          fontFamily: "RobotoMedium",
                        }}
                      >
                        FAILURE
                      </Text>
                    )}
                  </View>
                  {/* Weight */}
                  <View style={styles.setProperty}>
                    <Text style={styles.proprtyText}>Weight (kg)</Text>
                    {!item.bodyweight ? (
                      <Input
                        borderStyles={{
                          paddingLeft: 4,
                          paddingRight: 4,
                          justifyContent: "center",
                        }}
                        inputMode="decimal"
                        styles={{
                          minHeight: 48,
                          width: 80,
                        }}
                        placeholder=""
                        onChange={(value: string) =>
                          editSetProperty(exerciseIndex, index, "weight", value)
                        }
                        value={item.weight.toString()}
                      />
                    ) : (
                      <Text
                        style={{
                          fontSize: 14,
                          color: colors.primaryText,
                          fontFamily: "RobotoMedium",
                        }}
                      >
                        BODYWEIGHT
                      </Text>
                    )}
                  </View>
                  {/* Min Max Reps */}
                  <TouchableOpacity
                    onPress={() => openRepRangeModal(index)}
                    style={styles.setProperty}
                  >
                    <Text
                      style={[
                        styles.proprtyText,
                        { flex: item.to_failure.toString() === "true" ? 0 : 1 },
                      ]}
                    >
                      Rep Range
                    </Text>
                    {item.to_failure.toString() === "false" ? (
                      <>
                        <Text style={[styles.proprtyText, { flex: 1 }]}>
                          {item.min_reps.toString() || 0} -{" "}
                          {item.max_reps.toString() || 99}
                        </Text>
                      </>
                    ) : (
                      <Text
                        style={{
                          fontSize: 14,
                          color: colors.primaryText,
                          fontFamily: "RobotoMedium",
                        }}
                      >
                        FAILURE
                      </Text>
                    )}
                  </TouchableOpacity>
                  <View
                    style={[styles.setProperty, { justifyContent: "flex-end" }]}
                  >
                    <Button
                      type="text"
                      onPress={() => openMoreModal(index)}
                      rightIcon={
                        <MoreDotsIcon
                          fill={colors.secondaryText}
                          size={24}
                          color={colors.secondaryText}
                        />
                      }
                    />
                  </View>
                </View>
              </Swipeable>
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
