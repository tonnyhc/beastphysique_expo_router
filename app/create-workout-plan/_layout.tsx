import BackButton from "@/components/common/BackButton";
import Button from "@/components/common/Button";
import DiscardChangesModal from "@/components/common/DiscardChangesModal";
import StackHeader from "@/components/common/StackHeader";
import CreateWorkoutPlanProvider, {
  useCreateWorkoutPlanContext,
} from "@/contexts/CreateWorkoutPlanContext";
import { useTheme } from "@/contexts/ThemeContext";
import useWorkoutPlanServices from "@/hooks/service/useWorkoutPlanServices";
import CloseIcon from "@/icons/CloseIcon";
import { useMutation } from "@tanstack/react-query";
import { Stack, router, useNavigation } from "expo-router";
import { t } from "i18next";
import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

const CreateWorkoutPlanLayout: React.FC = () => {
  const { colors } = useTheme();
  const { workoutPlan, resetContextState, isWorkoutPlanValid } =
    useCreateWorkoutPlanContext();
  const { createWorkoutPlan } = useWorkoutPlanServices();
  const [discardChangesModal, setDiscardChangesModal] =
    useState<boolean>(false);
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: () => createWorkoutPlan(workoutPlan),
    onSuccess: () => {
      console.log("Created YAY!");
      resetContextState();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    },
    onError: (error) => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert("Error", error as unknown as string, [
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    },
  });

  const closeCreateWorkoutPlanLayout = () => {
    if (!workoutPlan.planName && workoutPlan.workouts.length <= 0) {
      return router.replace("/(tabs)");
    }
    return setDiscardChangesModal(true);
  };

  return (
    <>
      <DiscardChangesModal
        onDiscard={() => {
          resetContextState();
          router.navigate("/(tabs)");
        }}
        visible={discardChangesModal}
        closeModal={() => setDiscardChangesModal(false)}
      />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => (
              <StackHeader
                headerLeft={
                  <Button
                    type="text"
                    buttonStyles={{ alignSelf: "flex-start" }}
                    leftIcon={
                      <CloseIcon size={24} color={colors.primaryText} />
                    }
                    onPress={() => closeCreateWorkoutPlanLayout()}
                  />
                }
                headerTitle={t('screens.create_workout_plan.create_workout_plan')}
                headerRight={
                  <Button
                    disabled={!isWorkoutPlanValid}
                    type="text"
                    loading={isPending}
                    text={t("common.done")}
                    onPress={() => mutate()}
                  />
                }
              />
            ),
          }}
        />
      </Stack>
    </>
  );
};

export default CreateWorkoutPlanLayout;
