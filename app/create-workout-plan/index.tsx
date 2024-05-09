import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";

import { useTheme } from "../../contexts/ThemeContext";
import Screen from "@/components/common/Screen";
import Input from "@/components/common/Input";
import BoardIcon from "@/icons/BoardIcon";
import Button from "@/components/common/Button";
import { router, useNavigation } from "expo-router";
import { useCreateWorkoutPlanContext } from "@/contexts/CreateWorkoutPlanContext";
import CreateWorkoutPlanWorkoutCard from "@/components/workout-plans/CreateWorkoutPlanWorkoutCard";
import { t } from "i18next";

const CreateWorkoutPlan: React.FC = () => {
  const { colors } = useTheme();
  const { workoutPlan, changePlanName } = useCreateWorkoutPlanContext();
  return (
    <Screen closeKeyboardOnClick>
      <ScrollView
        style={{ flexGrow: 1 }}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      >
        {/* Workout plan name */}
        <View>
          <Input
          label={t('screens.create_workout_plan.planNameLabel')}
            value={workoutPlan.planName}
            onChange={(value: string) => changePlanName(value)}
            placeholder="My good plan..."
            leftIcon={<BoardIcon size={18} color={colors.helperText} />}
          />
        </View>

        <View
          style={{
            gap: 10,
          }}
        >
          {workoutPlan.workouts.length <= 0 ? (
            <Text
              style={{
                marginTop: 15,
                fontFamily: "RobotoRegular",
                fontSize: 18,
                color: colors.secondaryText,
                textAlign: "center",
              }}
            >
              {t('screens.create_workout_plan.noWorkouts')}
            </Text>
          ) : null}
          <View
            style={{
              marginTop: 20,
            }}
          >
            {workoutPlan.workouts.map((workout, index) => (
              <CreateWorkoutPlanWorkoutCard
                workoutIndex={index}
                workout={workout}
                key={`workout.id+${index}`}
              />
            ))}
          </View>
        </View>

        <Button
          buttonStyles={{ alignSelf: "center", marginTop: 15 }}
          text={t('screens.create_workout_plan.addWorkout')}
          type="text"
          onPress={() =>
            router.push({
              pathname: "/create-workout/",
              params: {
                callback: "addToWorkoutPlan",
                makeRequest: "false",
              },
            })
          }
        />
      </ScrollView>
    </Screen>
  );
};

export default CreateWorkoutPlan;
