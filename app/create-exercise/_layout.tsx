import StackHeader from "@/components/common/StackHeader";
import { CreateExerciseProvider } from "@/contexts/CreateExerciseContext";
import { useTheme } from "@/contexts/ThemeContext";
import CloseIcon from "@/icons/CloseIcon";
import { Stack, useGlobalSearchParams } from "expo-router";
import { t } from "i18next";

const CreateExerciseLayout = () => {
  const { callback } = useGlobalSearchParams();
  const { colors } = useTheme();

  return (
    <CreateExerciseProvider>
      <Stack>
        <Stack.Screen
          initialParams={{
            callback: callback,
          }}
          options={{
            header: () => (
              <StackHeader
                headerTitle={t('screens.create_exercise.create_exercise')}
                headerLeft={<CloseIcon size={24} color={colors.primaryText} />}
              />
            ),
          }}
          name="index"
        />
        <Stack.Screen
          initialParams={{
            callback: callback,
          }}
          options={{
            header: () => (
              <StackHeader
                headerTitle={t('screens.create_exercise.publish_exercise')}
                headerLeft={<CloseIcon size={24} color={colors.primaryText} />}
              />
            ),
          }}
          name="publish"
        />
      </Stack>
    </CreateExerciseProvider>
  );
};

export default CreateExerciseLayout;
