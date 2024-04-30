import BackButton from "@/components/common/BackButton";
import Button from "@/components/common/Button";
import DiscardChangesModal from "@/components/common/DiscardChangesModal";
import StackHeader from "@/components/common/StackHeader";
import CreateWorkoutPlanProvider, {
  useCreateWorkoutPlanContext,
} from "@/contexts/CreateWorkoutPlan";
import { useTheme } from "@/contexts/ThemeContext";
import useWorkoutPlanServices from "@/hooks/service/useWorkoutPlanServices";
import CloseIcon from "@/icons/CloseIcon";
import { useMutation } from "@tanstack/react-query";
import { Stack, router } from "expo-router";
import { t } from "i18next";
import { useState } from "react";

const CreateWorkoutPlanLayout: React.FC = () => {
  const { colors } = useTheme();
  const { workoutPlan, resetContextState } = useCreateWorkoutPlanContext();
  const { createWorkoutPlan } = useWorkoutPlanServices();
  const [discardChangesModal, setDiscardChangesModal] =
    useState<boolean>(false);
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: () => createWorkoutPlan(workoutPlan),
    onSuccess: () => {
      console.log("Created YAY!"), resetContextState();
    },
  });

  const closeCreateWorkoutPlanLayout = () => {
    if (!workoutPlan.planName && workoutPlan.workouts.length <= 0) {
      return router.back();
    }
    return setDiscardChangesModal(true);
  };

  return (
    <>
      <DiscardChangesModal
        onDiscard={() => {
          resetContextState();
          router.back();
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
                headerTitle="Create workout plan"
                headerRight={
                  <Button
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
