import { View, Text, ScrollView } from "react-native";
import React from "react";

import { useTheme } from "../../contexts/ThemeContext";
import Screen from "@/components/common/Screen";
import Input from "@/components/common/Input";
import BoardIcon from "@/icons/BoardIcon";
import Button from "@/components/common/Button";


const CreateCustomWorkoutPlan: React.FC = () => {
  const { colors } = useTheme();
//   const { workoutPlan, changePlanName } = useCreateWorkoutPlanContext();
//   console.log(workoutPlan.workouts);
  // const { mutate, isPending, error } = useMutation({
  //   mutationFn: () => createWorkoutPlan(),
  //   onSuccess: () => navigation.navigate("WorkoutPlans"),
  // });
  return (
    <Screen>
      <ScrollView
        style={{ flexGrow: 1 }}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      >
        {/* Workout plan name */}
        <View>
          <Input
            // value={workoutPlan.planName}
            value=""
            // onChange={(value: string) => changePlanName(value)}
            onChange={() => {}}
            placeholder="Workout plan name"
            leftIcon={<BoardIcon size={24} color={colors.helperText} />}
          />
        </View>

        <Text
          style={{
            textAlign: "center",
            marginTop: 15,
            fontFamily: "RobotoMedium",
            color: colors.error,
          }}
        >
          {/* {error} */}
        </Text>
        <View
          style={{
            gap: 10,
          }}
        >
          {/* {workoutPlan.workouts.map((workout, index) => (
            <CreateCustomWorkoutPlanWorkoutCard
              workoutIndex={index}
              workout={workout}
              key={`workout.id+${index}`}
            />
          ))} */}
        </View>

        <Button
          buttonStyles={{ alignSelf: "center", marginTop: 35 }}
          text="Add workout"
          type="text"
          onPress={() => navigation.navigate("WorkoutSearch")}
        />
      </ScrollView>
      <View style={{ position: "absolute", bottom: 30, left: 100, right: 100 }}>
        <Button text="Submit" onPress={() => {}} />
      </View>
    </Screen>
  );
};

export default CreateCustomWorkoutPlan;