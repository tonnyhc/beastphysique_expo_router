import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import StackHeader from "@/components/common/StackHeader";

export default function MoreLayout() {
  return (
    <Stack>
        <Stack.Screen name="index" options={{
            header: () => <StackHeader headerTitle="More"/>
        }}/>
    </Stack>
  );
}

const styles = StyleSheet.create({});
