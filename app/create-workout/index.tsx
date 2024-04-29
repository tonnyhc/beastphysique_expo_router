import { View } from "react-native";

import { useTheme } from "@/contexts/ThemeContext";
import Screen from "@/components/common/Screen";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useCreateWorkoutContext } from "@/contexts/CreateWorkoutContext";
import { ExerciseSession } from "@/types/fitnessTypes";
import ExerciseSessionCreationCard from "@/components/exercise/ExerciseSessionCreationCard";
import BoardIcon from "@/icons/BoardIcon";
import { router } from "expo-router";
import StackHeader from "@/components/common/StackHeader";
import { t } from "i18next";
import CloseIcon from "@/icons/CloseIcon";

const CreateWorkoutScreen: React.FC = () => {
  const { workout, changeWorkoutName, submitCreate } = useCreateWorkoutContext();
  const { colors } = useTheme();
  return (
    <Screen styles={{paddingTop: 0}}>
      <StackHeader
      headerStyles={{paddingHorizontal: 0}}
        headerTitle="Create workout"
        headerRight={
          <Button
          buttonStyles={{alignSelf: 'flex-end', paddingRight: 0}}
            type="text"
            text={t("common.done")}
            onPress={() => submitCreate()}
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
          leftIcon={<BoardIcon size={18} color={colors.helperText} />}
          onChange={(value: string) => changeWorkoutName(value)}
          value={workout.name}
          placeholder="Workout name"
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
          text="Add Exercises"
          onPress={() => router.push("/create-workout/searchExercise")}
        />
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default CreateWorkoutScreen;
