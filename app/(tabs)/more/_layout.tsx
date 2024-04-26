import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot, Stack, router } from "expo-router";
import StackHeader from "@/components/common/StackHeader";
import BackButton from "@/components/common/BackButton";
import { useTranslation } from "react-i18next";

export default function MoreLayout() {
  const { t } = useTranslation();
  return (
    <>
      <Stack initialRouteName="index">
        <Stack.Screen
          name="index"
          options={{
            header: () => (
              <StackHeader headerTitle={t("screens.more.headerTitle")} />
            ),
          }}
        />
        <Stack.Screen
          name="weight"
          options={{
            header: () => (
              <StackHeader
                headerLeft={<BackButton onPress={() => router.back()} />}
                headerTitle={t("screens.more.weight")}
              />
            ),
          }}
        />
        <Stack.Screen
          name="goal"
          options={{
            header: () => (
              <StackHeader
                headerLeft={<BackButton onPress={() => router.back()} />}
                headerTitle={t("screens.more.goal")}
              />
            ),
          }}
        />
                <Stack.Screen
          name="language"
          options={{
            header: () => (
              <StackHeader
                headerLeft={<BackButton onPress={() => router.back()} />}
                headerTitle={t("screens.more.language")}
              />
            ),
          }}
        />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({});
