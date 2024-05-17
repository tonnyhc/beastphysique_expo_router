import { Alert, StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { ExerciseSession, ExerciseSet } from "@/types/fitnessTypes";
import Button from "@/components/common/Button";
import { useTheme } from "@/contexts/ThemeContext";
import Modal from "react-native-modal";
import StackHeader from "../common/StackHeader";
import CloseButton from "../common/CloseButton";
import { emptySet } from "@/utils/mapData";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Haptics from "expo-haptics";
import ExerciseSessionRepRangeModal from "../exercise/ExerciseSessionRepRangeModal";
import ExerciseSessionSetCreationCard from "../exercise/ExerciseSessionSetCreationCard";
import { useMutation } from "@tanstack/react-query";
import useExerciseSessionService from "@/hooks/service/useExerciseSessionServices";
import { useUtilityContext } from "@/contexts/UtilityContext";
import TickIcon from "@/icons/TickIcon";
import ExerciseSessionMoreModal from "../exercise/ExerciseSessionMoreModal";

interface EditExerciseSessionModalProps {
  session: ExerciseSession;
  visible: boolean;
  closeModal: () => void;
}

const EditExerciseSessionModal: React.FC<EditExerciseSessionModalProps> = ({
  session,
  visible,
  closeModal,
}) => {
  const { colors } = useTheme();
  const { updateSession } = useExerciseSessionService();
  const { setToast } = useUtilityContext();
  const [exerciseSession, setExerciseSession] =
    useState<ExerciseSession>(session);
  const [repRangeModal, setRepRangeModal] = useState<{
    set: ExerciseSet | null;
    visible: boolean;
    setIndex: number;
  }>({
    set: null,
    visible: false,
    setIndex: 0,
  });
  const [moreModal, setMoreModal] = useState<{
    set: ExerciseSet | null;
    visible: boolean;
    setIndex: number;
  }>({
    set: null,
    visible: false,
    setIndex: 0,
  });

  const [disabledSubmit, setDisabledSubmit] = useState<boolean>(true);
  useEffect(() => {
    if (exerciseSession != session) {
      setDisabledSubmit(false);
    }
  }, [exerciseSession]);

  // const { addSetToExerciseSession } = useExerciseSessionService();
  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: () => updateSession(session.id, { sets: exerciseSession.sets }),
    onSuccess: (data) => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      closeModal();
      setToast({
        type: "success",
        text1: "Success",
        text2: data,
        icon: <TickIcon size={24} color={colors.green} />,
      });
    },
    onError: (error: string) => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    },
  });

  const addSetToState = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setExerciseSession((oldSession) => ({
      ...oldSession,
      sets: [...oldSession.sets, emptySet],
    }));
  };

  const deleteSetFromState = (setIndex: number) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    const newSets = exerciseSession.sets.filter(
      (set, index) => index !== setIndex
    );
    setExerciseSession((oldSession) => ({
      ...oldSession,
      sets: [...newSets],
    }));
  };

  const duplicateSet = (exerciseIndex: 0, setIndex: number) => {
    const setToDuplicate = { ...session.sets[setIndex] };
    setExerciseSession((oldSession) => ({
      ...oldSession,
      sets: [...oldSession.sets, setToDuplicate],
    }));
  };

  const changeSetProperty = (
    exerciseIndex = 0,
    setIndex: number,
    propName: string,
    value: any
  ) => {
    const setsCopy = [...exerciseSession.sets];
    const setToChange = setsCopy[setIndex];
    if (propName == "to_failure" || propName == "bodyweight") {
      setToChange[propName] = !setToChange[propName];
    } else {
      setToChange[propName] = value;
    }
    setExerciseSession((oldSession) => ({
      ...oldSession,
      sets: [...setsCopy],
    }));
  };

  const onCloseModal = () => {
    if (session == exerciseSession) {
      return closeModal();
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert("Discard changes", "You have unsaved changes", [
      {
        text: "Discard",
        style: "destructive",
        onPress: () => {
          closeModal();
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const styles = StyleSheet.create({
    modal: {
      justifyContent: "flex-end",
      margin: 0,
    },
    modalWrapper: {
      flex: 0.8,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
      backgroundColor: colors.bg,
    },
    modalHeader: {
      paddingVertical: 20,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.secondaryText,
    },
    modalBody: {
      paddingHorizontal: 18,
      marginBottom: 50,
      flexGrow: 1,
      flex: 1,
      gap: 16,
    },
    heading: {
      fontSize: 22,
      fontFamily: "RobotoMedium",
      alignSelf: "center",
      color: colors.primaryText,
    },
    subheading: {
      fontSize: 20,
      fontFamily: "RobotoRegular",
      alignSelf: "center",
      color: colors.primaryText,
    },
    errorMessage: {
      fontFamily: "RobotoMedium",
      fontSize: 16,
      color: colors.error,
    },
  });

  return (
    <Modal
      propagateSwipe={true}
      isVisible={visible}
      animationIn="slideInUp"
      style={styles.modal}
    >
      <ExerciseSessionRepRangeModal
        set={repRangeModal.set ? repRangeModal.set : emptySet}
        editSetProperty={changeSetProperty}
        visible={repRangeModal.visible}
        closeModal={() =>
          setRepRangeModal({
            set: null,
            visible: false,
            setIndex: 0,
          })
        }
        setIndex={repRangeModal.setIndex}
        exerciseIndex={0}
      />
      <ExerciseSessionMoreModal
        editSetProperty={changeSetProperty}
        deleteSetFromExercise={() => deleteSetFromState(moreModal.setIndex)}
        set={moreModal.set ? moreModal.set : emptySet}
        visible={moreModal.visible}
        exerciseIndex={0}
        setIndex={0}
        closeModal={() =>
          setMoreModal({
            set: null,
            visible: false,
            setIndex: 0,
          })
        }
      />
      <View style={styles.modalWrapper}>
        <View style={styles.modalBody}>
          <StackHeader
            textStyles={{ fontSize: 20 }}
            headerStyles={{ marginTop: 0, paddingHorizontal: 0 }}
            headerLeft={<CloseButton onPress={() => onCloseModal()} />}
            headerTitle={session.exercise.name}
            headerRight={
              <Button
                loading={isPending}
                disabled={disabledSubmit}
                type="text"
                text="Done"
                onPress={() => mutate()}
              />
            }
          />
          <KeyboardAwareScrollView
            automaticallyAdjustKeyboardInsets
            style={{ marginTop: 20 }}
            contentContainerStyle={{
              gap: 24,
              flexGrow: 1,
              paddingBottom: 50,
            }}
          >
            {isError ? <Text style={styles.errorMessage}>{error}</Text> : null}
            {exerciseSession.sets.map((set, index) => (
              <ExerciseSessionSetCreationCard
                key={set.id ? set.id : index}
                set={set}
                setIndex={index}
                exerciseIndex={0}
                openRepRangeModal={() =>
                  setRepRangeModal({
                    visible: true,
                    set: set,
                    setIndex: index,
                  })
                }
                openMoreModal={() =>
                  setMoreModal({
                    visible: true,
                    set: set,
                    setIndex: index,
                  })
                }
                duplicateExerciseSet={() => duplicateSet(0, index)}
                deleteSetFromExercise={() => deleteSetFromState(index)}
                editSetProperty={changeSetProperty}
              />
            ))}
            <Button
              type="text"
              text="Add set"
              onPress={() => addSetToState()}
            />
          </KeyboardAwareScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default EditExerciseSessionModal;
