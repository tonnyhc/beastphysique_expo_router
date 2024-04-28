import BackButton from "@/components/common/BackButton";
import Button from "@/components/common/Button";
import StackHeader from "@/components/common/StackHeader";
import {
  CreateWorkoutProvider,
  useCreateWorkoutContext,
} from "@/contexts/CreateWorkoutContext";
import { useTheme } from "@/contexts/ThemeContext";
import CloseIcon from "@/icons/CloseIcon";
import { Stack, router } from "expo-router";
import { useTranslation } from "react-i18next";

const CreateWorkoutLayout = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  return (
    <CreateWorkoutProvider>
      <Stack>
        <Stack.Screen
          options={{
            header: () => (
              <StackHeader
                headerTitle="Create workout"
                headerRight={
                  <Button
                    type="text"
                    text={t("common.done")}
                    onPress={() => {
                      const { submitCreate } = useCreateWorkoutContext();
                      submitCreate();
                    }}
                  />
                }
                headerLeft={
                  <Button
                    buttonStyles={{ alignSelf: "flex-start" }}
                    //   TODO: Add a modal to ask the user is he sure he wants to discard his changes
                    onPress={() => router.back()}
                    type="text"
                    text=""
                    leftIcon={
                      <CloseIcon size={24} color={colors.primaryText} />
                    }
                  />
                }
              />
            ),
          }}
          name="index"
        />
        <Stack.Screen
          options={{
            header: () => (
              <StackHeader
                headerTitle="Search exercise"
                headerLeft={<BackButton onPress={() => router.back()} />}
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
