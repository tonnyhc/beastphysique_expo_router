import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useCreateWorkoutContext } from "@/contexts/CreateWorkoutContext";
import Input from "../common/Input";
import { ExerciseSet } from "@/types/fitnessTypes";

interface ExerciseSessionRepRangeModalProps {
  visible: boolean;
  closeModal: () => void;
  setIndex: number;
  exerciseIndex: number;
  //
  set: ExerciseSet;
  editSetProperty: (
    exerciseIndex: number,
    setIndex: number,
    propertyName: string,
    value: any
  ) => void;
}

const ExerciseSessionRepRangeModal: React.FC<
  ExerciseSessionRepRangeModalProps
> = ({ visible, closeModal, exerciseIndex, setIndex, set, editSetProperty }) => {
  const { colors } = useTheme();


  const styles = StyleSheet.create({
    modal: {
      zIndex: 1000,
    },
    content: {
      padding: 25,
      borderRadius: 20,
      backgroundColor: colors.bg,
      justifyContent: "center",
      alignItems: "center",
    },
    formWrapper: {
      gap: 10,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 22,
      color: colors.primaryText,
      fontFamily: "RobotoMedium",
      marginBottom: 18,
    },
  });

  return (
    <Modal
      onBackdropPress={closeModal}
      propagateSwipe={true}
      swipeDirection="down"
      isVisible={visible}
      animationIn="slideInUp"
      style={styles.modal}
      onSwipeComplete={closeModal}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Edit Rep range</Text>
        <View style={styles.formWrapper}>
          <View>
            <Input
              label="Min Reps"
              inputMode="numeric"
              value={set?.min_reps.toString()}
              onChange={(value: string) =>
                editSetProperty(
                  exerciseIndex,
                  setIndex as number,
                  "min_reps",
                  value
                )
              }
              placeholder=""
            />
          </View>
          <View>
            <Text
              style={{
                fontFamily: "RobotoRegular",
                fontSize: 26,
                color: colors.secondaryText,
              }}
            >
              ---
            </Text>
          </View>
          <View>
            <Input
              label="Max Reps"
              value={set?.max_reps.toString()}
              inputMode="numeric"
              onChange={(value: string) =>
                editSetProperty(
                  exerciseIndex,
                  setIndex as number,
                  "max_reps",
                  value
                )
              }
              placeholder=""
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ExerciseSessionRepRangeModal;
