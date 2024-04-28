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

const CreateWorkoutScreen: React.FC = () => {
  const { workout, changeWorkoutName } = useCreateWorkoutContext();
  const { colors } = useTheme();
  return (
    <Screen>
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        style={{ flex: 1 }}
        contentContainerStyle={{ gap: 35, flexGrow: 1, paddingBottom: 250 }}
      >
        <Input
          leftIcon={<BoardIcon size={24} color={colors.helperText} />}
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
