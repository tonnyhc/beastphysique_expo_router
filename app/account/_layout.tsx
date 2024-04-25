import BackButton from "@/components/common/BackButton";
import StackHeader from "@/components/common/StackHeader";
import { Stack, router } from "expo-router";
import { useTranslation } from "react-i18next";

const AccountLayout: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          header: () => (
            <StackHeader
              headerLeft={<BackButton onPress={() => router.back()} />}
              headerTitle={t("screens.more.account")}
            />
          ),
        }}
      />
      <Stack.Screen
        name="nameSettings"
        options={{
          header: () => (
            <StackHeader
              headerTitle={t("common.name")}
              headerLeft={<BackButton onPress={() => router.back()} />}
            />
          ),
        }}
      />
      <Stack.Screen
        name="usernameSettings"
        options={{
          header: () => (
            <StackHeader
              headerTitle={t("common.username")}
              headerLeft={<BackButton onPress={() => router.back()} />}
            />
          ),
        }}
      />
      <Stack.Screen
        name="bioSettings"
        options={{
          header: () => (
            <StackHeader
              headerTitle={t("common.bio")}
              headerLeft={<BackButton onPress={() => router.back()} />}
            />
          ),
        }}
      />
      <Stack.Screen
        name="birthdaySettings"
        options={{
          header: () => (
            <StackHeader
              headerTitle={t("common.birthday")}
              headerLeft={<BackButton onPress={() => router.back()} />}
            />
          ),
        }}
      />
    </Stack>
  );
};
export default AccountLayout;
