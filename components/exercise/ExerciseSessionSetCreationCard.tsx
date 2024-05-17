import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { ExerciseSet } from "@/types/fitnessTypes";
import Input from "../common/Input";
import Button from "../common/Button";
import MoreDotsIcon from "@/icons/MoreDotsIcon";
import { Swipeable } from "react-native-gesture-handler";
import CopyIcon from "@/icons/CopyIcon";

interface ExerciseSessionSetCreationCardProps {
  set: ExerciseSet;
  setIndex: number;
  exerciseIndex: number;
  openRepRangeModal: (setIndex: number) => void;
  openMoreModal: (setIndex: number) => void;
  deleteSetFromExercise: (
    exerciseIndex: number,
    setIndex: number,
    setId: number
  ) => void;
  duplicateExerciseSet: (exerciseIndex: number, setIndex: number) => void;
  editSetProperty: (
    exerciseIndex: number,
    setIndex: number,
    propertyName: string,
    value: any
  ) => void;
}

const ExerciseSessionSetCreationCard: React.FC<
  ExerciseSessionSetCreationCardProps
> = ({
  set,
  setIndex,
  exerciseIndex,
  editSetProperty,
  openRepRangeModal,
  openMoreModal,
  deleteSetFromExercise,
  duplicateExerciseSet,
}) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
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

  return (
    <Swipeable
      renderRightActions={() =>
        renderRightSetActions(setIndex, set.id as number)
      }
      renderLeftActions={() => renderLeftSetActions(setIndex, set.id as number)}
      overshootRight={true}
      overshootFriction={5}
      overshootLeft={true}
      onSwipeableOpen={(direction) =>
        direction == "left"
          ? duplicateExerciseSet(exerciseIndex, setIndex)
          : deleteSetFromExercise(exerciseIndex, setIndex, set.id as number)
      }
      friction={1}
    >
      <View style={styles.setCard}>
        <View style={styles.setProperty}>
          <Text style={[styles.proprtyText, { flex: 1 }]}>Set</Text>
          <Text style={[styles.proprtyText, { flex: 1 }]}>{setIndex + 1}</Text>
        </View>
        {/* Reps */}
        <View style={styles.setProperty}>
          <Text style={styles.proprtyText}>Reps</Text>
          {set.to_failure.toString() === "false" ? (
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
                editSetProperty(exerciseIndex, setIndex, "reps", value)
              }
              value={set.reps.toString()}
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
          {!set.bodyweight ? (
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
                editSetProperty(exerciseIndex, setIndex, "weight", value)
              }
              value={set.weight.toString()}
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
          onPress={() => openRepRangeModal(setIndex)}
          style={styles.setProperty}
        >
          <Text
            style={[
              styles.proprtyText,
              { flex: set.to_failure.toString() === "true" ? 0 : 1 },
            ]}
          >
            Rep Range
          </Text>
          {set.to_failure.toString() === "false" ? (
            <>
              <Text style={[styles.proprtyText, { flex: 1 }]}>
                {set.min_reps.toString() || 0} - {set.max_reps.toString() || 99}
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
        <View style={[styles.setProperty, { justifyContent: "flex-end" }]}>
          <Button
            type="text"
            onPress={() => openMoreModal(setIndex)}
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
  );
};

export default ExerciseSessionSetCreationCard;
