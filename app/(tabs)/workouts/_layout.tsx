import BackButton from "@/components/common/BackButton";
import Button from "@/components/common/Button";
import StackHeader from "@/components/common/StackHeader";
import { CreateWorkoutProvider } from "@/contexts/CreateWorkoutContext";
import { useTheme } from "@/contexts/ThemeContext";
import LogoIcon from "@/icons/LogoIcon";
import { Link, Stack, router } from "expo-router";
import { t } from "i18next";
import { View, Text } from "react-native";

const WorkoutsLayout: React.FC = () => {
  const { colors } = useTheme();
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        options={{
          gestureEnabled: false,
          header: () => (
            <StackHeader
              headerLeft={<LogoIcon size={42} color={colors.primaryText} />}
              headerTitle={t("workout.workoutPlans")}
              headerRight={
                <View style={{ alignSelf: "flex-end" }}>
                  <Button
                    text={t('common.create')}
                    type="text"
                    onPress={() => router.replace("/create-workout-plan/")}
                  />
                </View>
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
              headerLeft={<BackButton onPress={() => router.back()} />}
              headerTitle="Workout Plan"
            />
          ),
        }}
        name="workout-plan"
      />
    </Stack>
  );
};

export default WorkoutsLayout;
