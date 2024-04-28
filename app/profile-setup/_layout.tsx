import AuthStackHeader from "@/components/auth/AuthStackHeader";
import { Stack } from "expo-router";

const ProfileSetupLayout = () => {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        options={{
          header: () => <AuthStackHeader />,
        }}
        name="index"
      />
      <Stack.Screen
        options={{
          header: () => <AuthStackHeader />,
        }}
        name="measures"
      />
      <Stack.Screen
        options={{
          header: () => <AuthStackHeader />,
        }}
        name="gender"
      />
      <Stack.Screen
        options={{
          header: () => <AuthStackHeader />,
        }}
        name="age"
      />
      <Stack.Screen
        options={{
          header: () => <AuthStackHeader />,
        }}
        name="activity"
      />
      <Stack.Screen
        options={{
          header: () => <AuthStackHeader />,
        }}
        name="fitnessGoal"
      />
    </Stack>
  );
};

export default ProfileSetupLayout;
