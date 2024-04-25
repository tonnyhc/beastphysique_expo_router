import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import StackHeader from "@/components/common/StackHeader";
import BackButton from "@/components/common/BackButton";

export default function MoreLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <StackHeader headerTitle="More" />,
        }}
      />
      <Stack.Screen
        name="weight"
        options={{
          header: () => (
            <StackHeader
              headerLeft={<BackButton onPress={() => router.back()} />}
              headerTitle="Weight"
            />
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({});
