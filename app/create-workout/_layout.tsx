import BackButton from "@/components/common/BackButton";
import Button from "@/components/common/Button";
import StackHeader from "@/components/common/StackHeader";
import { CreateWorkoutProvider } from "@/contexts/CreateWorkoutContext";
import { useCreateWorkoutPlanContext } from "@/contexts/CreateWorkoutPlan";
import { useTheme } from "@/contexts/ThemeContext";
import { Stack, router, useGlobalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";

const CreateWorkoutLayout = () => {
  const { t } = useTranslation();
  const params = useGlobalSearchParams();
  const { callback, makeRequest, workoutToEditIndex } = params;
  const { addWorkout } = useCreateWorkoutPlanContext();

  return (
    <CreateWorkoutProvider
      workoutToEditIndex={workoutToEditIndex as string}
      makeCreateRequest={makeRequest === "true" ? true : false}
      callbackFn={addWorkout}
    >
      <Stack initialRouteName="index">
        <Stack.Screen
          initialParams={{
            editWorkout: workoutToEditIndex ? "true" : "false",
          }}
          options={{
            headerShown: false,
          }}
          name="index"
        />
        <Stack.Screen
          options={{
            header: () => (
              <StackHeader
                headerTitle="Search exercise"
                headerLeft={<BackButton onPress={() => router.back()} />}
                headerRight={
                  <Button
                    buttonStyles={{ alignSelf: "flex-end", paddingRight: 0 }}
                    type="text"
                    text={t("common.create")}
                    onPress={() => router.push("/create-exercise/")}
                  />
                }
              />
            ),
          }}
          name="searchExercise"
        />
      </Stack>
    </CreateWorkoutProvider>
  );
};

export default CreateWorkoutLayout;
