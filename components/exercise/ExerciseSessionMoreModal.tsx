import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import React from "react";
import { ExerciseSession, ExerciseSet } from "@/types/fitnessTypes";
import { useTheme } from "@/contexts/ThemeContext";
import { useCreateWorkoutContext } from "@/contexts/CreateWorkoutContext";
import BouncyCheckbox from "react-native-bouncy-checkbox/build/dist/BouncyCheckbox";
import Button from "../common/Button";

interface ExerciseSessionMoreModalProps {
  visible: boolean;
  exerciseIndex: number;
  closeModal: () => void;
  setIndex: number;
  editSetProperty: (
    exerciseIndex: number,
    setIndex: number,
    propertyName: string,
    value: any
  ) => void;
  deleteSetFromExercise: () => void

  set: ExerciseSet;
}

const ExerciseSessionMoreModal: React.FC<ExerciseSessionMoreModalProps> = ({
  visible,
  exerciseIndex,
  closeModal,
  setIndex,
  editSetProperty,
  deleteSetFromExercise,
  set,
}) => {
  const { colors } = useTheme();
  // const { deleteSetFromExercise } = useCreateWorkoutContext();

  const styles = StyleSheet.create({
    modal: {
      justifyContent: "flex-end",
      zIndex: 1000,
      margin: 0,
    },
    content: {
      backgroundColor: colors.bg,
      zIndex: 100,
      flex: 0.5,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
    },
    separator: {
      borderBottomWidth: 0.5,
      borderBottomColor: colors.secondaryText,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 15,
    },
  });

  return (
    <Modal
      onBackdropPress={closeModal}
      swipeDirection="down"
      isVisible={visible}
      animationIn="slideInUp"
      style={styles.modal}
      onSwipeComplete={closeModal}
    >
      <View style={styles.content}>
        <View style={styles.separator}>
          <BouncyCheckbox
            isChecked={
              set && set.to_failure.toString() === "true" ? true : false
            }
            style={{
              flexDirection: "row-reverse",
              gap: 18,
            }}
            textStyle={{
              fontSize: 24,
              color: colors.primaryText,
              textDecorationLine: "none",
            }}
            text="To failure"
            onPress={(value) => {
              editSetProperty(
                exerciseIndex,
                setIndex,
                "to_failure",
                value.toString()
              );
            }}
          />
        </View>

        <View style={styles.separator}>
          <BouncyCheckbox
            isChecked={
              set && set.bodyweight.toString() === "true" ? true : false
            }
            style={{
              flexDirection: "row-reverse",
              gap: 18,
            }}
            textStyle={{
              fontSize: 24,
              color: colors.primaryText,
              textDecorationLine: "none",
            }}
            text="Bodyweight"
            onPress={(value) =>
              editSetProperty(exerciseIndex, setIndex, "bodyweight", value)
            }
          />
        </View>
        <View style={[styles.separator, { paddingVertical: 0 }]}>
          <Button
            textStyles={{ color: colors.error, fontSize: 24 }}
            type="text"
            text="Delete"
            onPress={() => {
              deleteSetFromExercise()
              closeModal();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ExerciseSessionMoreModal;
