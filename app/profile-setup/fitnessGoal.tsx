import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import useProfileSetup from "@/hooks/service/useProfileSetup";
import Screen from "@/components/common/Screen";
import SetupScreenHeader from "@/components/profile/setup/SetupScreenHeader";
import FitnessGoalCard from "@/components/fitnessGoal/FitnessGoalCard";
import { generateFitnessGoals } from "@/utils/mapData";
import { useTranslation } from "react-i18next";
import SetupScreenFooterBtns from "@/components/profile/setup/SetupScreenFooter";
import { router } from "expo-router";

const FitnessGoal: React.FC = () => {
  const [data, setData] = useState<string>("");
//   const { skipSetupProfile } = useAuth();
  const { t } = useTranslation();
  const fitnessGoals = generateFitnessGoals(t);
  const { mutate, isPending } = useProfileSetup({
    url: "health/fitness/goal/edit/",
    onSuccessFn: () => {
        return router.replace('/(tabs)')
    //   verifyProfile();
    //   return skipSetupProfile ? skipSetupProfile() : null;
    },
  });
  const styles = StyleSheet.create({
    formWrapper: {
      flex: 2,
      gap: 20,
      marginTop: 30,
    },
  });

  const selectGoal = (name: string) => {
    setData(name);
  };

  return (
    <Screen>
      <View>
        <SetupScreenHeader
          header="What is your current goal?"
          subheader="We ask this so we can calculate your needed calorie intake."
        />
      </View>

      <View style={styles.formWrapper}>
        {fitnessGoals.map((item, index) => (
          <FitnessGoalCard
            onPress={selectGoal}
            key={index}
            heading={item.heading}
            helperText={item.helperText}
            isActive={data === item.heading}
          />
        ))}
      </View>
      <View style={{ flex: 1 }}>
        <SetupScreenFooterBtns
          submitFn={() => mutate(data)}
          pendingSubmit={isPending}
          disabledSubmit={data === ""}
        />
      </View>
    </Screen>
  );
};

export default FitnessGoal;
