import AuthStackHeader from "@/components/auth/AuthStackHeader";
import BackButton from "@/components/common/BackButton";
import BeastPhysiqueHeader from "@/components/common/BeastPhysiqueHeader";
import StackHeader from "@/components/common/StackHeader";
import { ForgottenPasswordProvider } from "@/contexts/ForgottenPasswordContext";
import { Stack, router } from "expo-router";

const AuthLayout: React.FC = () => {
  return (
    <ForgottenPasswordProvider>
      <Stack initialRouteName="onboarding">
        <Stack.Screen
          name="onboarding"
          options={{ header: () => <BeastPhysiqueHeader /> }}
        />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen
          name="register"
          options={{
            header: () => <AuthStackHeader />,
          }}
        />
        <Stack.Screen
          name="forgotPassword"
          options={{
            header: () => <StackHeader headerTitle="Forgot password" headerLeft={<BackButton onPress={() => {router.back()}}/>}/>,
          }}
        />
      </Stack>
    </ForgottenPasswordProvider>
  );
};
export default AuthLayout;
