import { View } from "react-native";

import { useTheme } from "@/contexts/ThemeContext";
import Screen from "@/components/common/Screen";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useCreateWorkoutContext } from "@/contexts/CreateWorkoutContext";
import { ExerciseSession, Workout } from "@/types/fitnessTypes";
import ExerciseSessionCreationCard from "@/components/exercise/ExerciseSessionCreationCard";
import BoardIcon from "@/icons/BoardIcon";
import { router, useLocalSearchParams } from "expo-router";
import StackHeader from "@/components/common/StackHeader";
import { t } from "i18next";
import CloseIcon from "@/icons/CloseIcon";
import { useCreateWorkoutPlanContext } from "@/contexts/CreateWorkoutPlanContext";
import { useEffect, useState } from "react";

const CreateWorkoutScreen: React.FC = () => {
  const { workout, changeWorkoutName, validateWorkout } =
    useCreateWorkoutContext();
  const params = useLocalSearchParams();
  const { workoutToEditIndex } = params;
  const { colors } = useTheme();
  const { addWorkout, editWorkout } = useCreateWorkoutPlanContext();
  const [enabledSubmit, setEnabledSubmit] = useState<boolean>(false);
  useEffect(() => {
    setEnabledSubmit(validateWorkout());
  }, [workout]);
  
  // a hook for creating a workout in the server
  // const { createWorkout } = useWorkoutService();
  // const { mutate, data, isPending, isError, error } = createWorkout;

  const handleSubmit = (workout: Workout) => {
    if (workoutToEditIndex) {
      editWorkout(Number(workoutToEditIndex), workout);
      return router.back();
    }
    addWorkout(workout);
    router.back();
  };



  return (
    <Screen styles={{ paddingTop: 0 }}>
      <StackHeader
        headerStyles={{ paddingHorizontal: 0 }}
        headerTitle={t('screens.create_workout.title')}
        headerRight={
          <Button
            buttonStyles={{ alignSelf: "flex-end", paddingRight: 0 }}
            type="text"
            disabled={!enabledSubmit}
            text={t("common.done")}
            onPress={() => handleSubmit(workout as Workout)}
          />
        }
        headerLeft={
          <Button
            buttonStyles={{ alignSelf: "flex-start" }}
            //   TODO: Add a modal to ask the user is he sure he wants to discard his changes
            onPress={() => router.back()}
            type="text"
            text=""
            leftIcon={<CloseIcon size={24} color={colors.primaryText} />}
          />
        }
      />

      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        style={{ flex: 1, marginTop: 20 }}
        contentContainerStyle={{ gap: 35, flexGrow: 1, paddingBottom: 250 }}
      >
        <Input
        label={t('screens.create_workout.workoutNameLabel')}
          leftIcon={<BoardIcon size={18} color={colors.helperText} />}
          onChange={(value: string) => changeWorkoutName(value)}
          value={workout.name}
          placeholder="Best legs workout..."
        />

        <View>
          <View>
            {workout?.exercises.map(
              (exercise: ExerciseSession, index: number) => (
                <ExerciseSessionCreationCard
                  key={exercise.id}
                  exerciseIndex={index}
                  exercise={exercise}
                />
              )
            )}
          </View>
        </View>
        <Button
          text={t("screens.create_workout.addExercises")}
          onPress={() => router.push("/create-workout/searchExercise")}
        />
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default CreateWorkoutScreen;
