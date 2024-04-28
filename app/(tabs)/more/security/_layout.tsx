import BackButton from "@/components/common/BackButton";
import StackHeader from "@/components/common/StackHeader";
import { Stack, router } from "expo-router";
import { useTranslation } from "react-i18next";

const SecurityLayout: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        options={{
          header: () => (
            <StackHeader
              headerTitle={t("screens.more.security")}
              headerLeft={<BackButton onPress={() => router.back()} />}
            />
          ),
        }}
        name="index"
      />
      <Stack.Screen
        options={{
          header: () => (
            <StackHeader
              headerTitle={t("screens.change_password.change_password")}
              headerLeft={<BackButton onPress={() => router.back()} />}
            />
          ),
        }}
        name="password"
      />
    </Stack>
  );
};

export default SecurityLayout;
