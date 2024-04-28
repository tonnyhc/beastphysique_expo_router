import Button from "@/components/common/Button";
import StackHeader from "@/components/common/StackHeader";
import { CreateWorkoutProvider } from "@/contexts/CreateWorkoutContext";
import { useTheme } from "@/contexts/ThemeContext";
import LogoIcon from "@/icons/LogoIcon";
import { Link, Stack, router } from "expo-router";
import { View, Text } from "react-native";

const WorkoutsLayout: React.FC = () => {
  const { colors } = useTheme();
  return (
    <Stack>
      <Stack.Screen
        options={{
          header: () => (
            <StackHeader
              headerLeft={<LogoIcon size={42} color={colors.primaryText} />}
              headerTitle="Workout plans"
              headerRight={
                <View style={{ alignSelf: "flex-end" }}>
                  <Button
                    text="Create"
                    type="text"
                    onPress={() => router.push("/create-workout/")}
                  />
                </View>
              }
            />
          ),
        }}
        name="index"
      />
    </Stack>
  );
};

export default WorkoutsLayout;
