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
      <Stack initialRouteName="index">
        <Stack.Screen
          options={{
            headerShown: false
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
