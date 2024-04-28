import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import useProfileSetup from "@/hooks/service/useProfileSetup";
import Screen from "@/components/common/Screen";
import SetupScreenHeader from "@/components/profile/setup/SetupScreenHeader";
import SetupScreenFooterBtns from "@/components/profile/setup/SetupScreenFooter";
import { router } from "expo-router";
import FitnessGoalCard from "@/components/fitnessGoal/FitnessGoalCard";

const activityMap = [
  {
    label: "Sedentary",
    value: "Sedentary",
    helperText: "(little or no exercise)",
  },
  {
    label: "Lightly active",
    value: "Light",
    helperText: "(light exercise/sports 1-3 days/week",
  },
  {
    label: "Moderate active",
    value: "Moderate",
    helperText: "(moderate exercise/sports 3-5 days/week)",
  },
  {
    label: "Very active",
    value: "Very",
    helperText: "(hard exercise/sports 6-7 days/week)",
  },
  {
    label: "Extreme active",
    value: "Extreme",
    helperText: "(very hard exercise/sports & physical job)",
  },
];

const ActivitySetup: React.FC = () => {
  const { colors } = useTheme();
  const [data, setData] = useState<string>("");
  const { mutate, isPending } = useProfileSetup({
    url: "health/fitness/activity/edit/",
    onSuccessFn: () => router.push("/profile-setup/fitnessGoal"),
  });
  const styles = StyleSheet.create({
    activityCard: {
      backgroundColor: "transparent",
      gap: 8,
      paddingHorizontal: 8,
      paddingVertical: 8,
      width: 160,
      height: 100,
      borderRadius: 20,

      borderColor: colors.helperText,
      borderWidth: 2,
      padding: 20,
    },
    activityCardTitle: {
      fontFamily: "RobotoSlabBold",
      fontSize: 16,
      color: colors.primaryText,
    },
    activityCardtext: {
      fontFamily: "RobotoRegular",
      color: colors.helperText,
    },
    activeCard: {
      backgroundColor: colors.button,
    },
  });

  return (
    <Screen>
      <ScrollView>
        <SetupScreenHeader
          header="How active are you?"
          subheader="Based on your activity level we can calculate your base calorie needs."
        />
        <View
          style={{
            gap: 16,
            marginTop: 20,
          }}
        >
          {activityMap.map((item, index) => (
            <FitnessGoalCard
              key={item.label + index}
              heading={item.label}
              helperText={item.helperText}
              onPress={() => setData(item.value)}
              isActive={item.value === data}
            />
          ))}
        </View>
        <View style={{ marginTop: 30 }}>
          <SetupScreenFooterBtns
            disabledSubmit={data === ""}
            submitFn={() => mutate(data)}
            pendingSubmit={isPending}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

export default ActivitySetup;
