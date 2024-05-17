import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import useApi from "@/hooks/service/useApi";
import { router } from "expo-router";
import Screen from "@/components/common/Screen";
import Button from "@/components/common/Button";
import { generateFitnessGoals } from "@/utils/mapData";
import FitnessGoalCard from "@/components/fitnessGoal/FitnessGoalCard";
import useProfileSetup from "@/hooks/service/useProfileSetup";

const GoalSettings: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<string>("");
  const { token } = useAuth();
  const { get } = useApi(token as string);

  const physiqueGoals = generateFitnessGoals(t);

  const fetchGoal = async () => {
    const data = await get("health/fitness/details/goal/");
    return data;
  };

  const { data: queryData, isLoading } = useQuery({
    queryFn: fetchGoal,
    queryKey: ["physiqueGoal"],
  });

  useEffect(() => {
    setData(queryData);
  }, [queryData]);

  const { mutate, isPending } = useProfileSetup({
    url: "health/fitness/goal/edit/",
    onSuccessFn: () => {
      return router.back();
    },
  });
  const selectGoal = (value: string) => {
    setData(value);
  };
  return (
    <Screen>
      <View
        style={{ flex: 1, justifyContent: "space-between", paddingBottom: 80 }}
      >
        <View style={{ gap: 10, marginTop: 20 }}>
          {physiqueGoals.map((item, index) => (
            <FitnessGoalCard
              onPress={() => selectGoal(item.value)}
              key={index}
              heading={item.heading}
              helperText={item.helperText}
              isActive={data === item.heading}
            />
          ))}
        </View>
        <Button
          text={t("common.done")}
          loading={isPending}
          onPress={() => mutate(data)}
        />
      </View>
    </Screen>
  );
};

export default GoalSettings;

const styles = StyleSheet.create({});