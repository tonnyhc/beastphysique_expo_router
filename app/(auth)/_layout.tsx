import AuthStackHeader from "@/components/auth/AuthStackHeader";
import BackButton from "@/components/common/BackButton";
import BeastPhysiqueHeader from "@/components/common/BeastPhysiqueHeader";
import StackHeader from "@/components/common/StackHeader";
import { ForgottenPasswordProvider } from "@/contexts/ForgottenPasswordContext";
import { Stack, router } from "expo-router";
import { useTranslation } from "react-i18next";

const AuthLayout: React.FC = () => {
  const { t } = useTranslation();
  return (
    <ForgottenPasswordProvider>
      <Stack initialRouteName="onboarding">
        <Stack.Screen
          name="onboarding"
          options={{ header: () => <BeastPhysiqueHeader /> }}
        />
        <Stack.Screen
          name="login"
          options={{ header: () => <AuthStackHeader /> }}
        />
        <Stack.Screen
          name="register"
          options={{
            header: () => <AuthStackHeader />,
          }}
        />
        <Stack.Screen
          name="forgotPassword"
          options={{
            header: () => (
              <StackHeader
                headerTitle={t("screens.forgotPass.headerTitle")}
                headerLeft={
                  <BackButton
                    onPress={() => {
                      router.back();
                    }}
                  />
                }
              />
            ),
          }}
        />
        <Stack.Screen
          name="forgotPasswordVerification"
          options={{
            header: () => (
              <StackHeader
                headerTitle={t("screens.forgotPass.verification")}
                headerLeft={
                  <BackButton
                    onPress={() => {
                      router.back();
                    }}
                  />
                }
              />
            ),
          }}
        />
        <Stack.Screen
          name="resetPassword"
          options={{
            header: () => (
              <StackHeader
                headerTitle={t("screens.resetPass.headerTitle")}
                headerLeft={
                  <BackButton
                    onPress={() => {
                      router.back();
                    }}
                  />
                }
              />
            ),
          }}
        />
        <Stack.Screen
          name="successPasswordReset"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ForgottenPasswordProvider>
  );
};
export default AuthLayout;
