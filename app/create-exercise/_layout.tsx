import BackButton from "@/components/common/BackButton";
import CloseButton from "@/components/common/CloseButton";
import StackHeader from "@/components/common/StackHeader";
import { CreateExerciseProvider } from "@/contexts/CreateExerciseContext";
import { useTheme } from "@/contexts/ThemeContext";
import CloseIcon from "@/icons/CloseIcon";
import { Stack, router, useGlobalSearchParams } from "expo-router";
import { t } from "i18next";
import { TouchableOpacity } from "react-native-gesture-handler";

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
                headerTitle={t("screens.create_exercise.create_exercise")}
                headerLeft={<CloseButton onPress={() => router.back()} />}
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
                headerTitle={t("screens.create_exercise.publish_exercise")}
                headerLeft={<CloseButton onPress={() => router.back()} />}
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
