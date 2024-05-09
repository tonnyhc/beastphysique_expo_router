import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ScrollView,
} from "react-native";
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useQuery } from "@tanstack/react-query";
import useWorkoutPlanServices from "@/hooks/service/useWorkoutPlanServices";
import useRefreshControl from "@/hooks/useRefreshControl";
import Screen from "@/components/common/Screen";
import WorkoutPlanDetailsWorkoutCard from "@/components/workout-plans/WorkoutPlanDetailsWorkoutCard";
import { useLocalSearchParams } from "expo-router";

const WorkoutPlanDetails: React.FC = () => {
  const params = useLocalSearchParams();
  const { id } = params;
  const { colors } = useTheme();

  const { getWorkoutPlanById } = useWorkoutPlanServices();
  const { data, refetch, isLoading, isError } = useQuery({
    queryFn: () => getWorkoutPlanById(id as unknown as number),
    queryKey: ["workoutPlan"],
  });

  const { refreshing, onRefresh } = useRefreshControl({
    isLoading,
    refreshFn: refetch,
  });
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      gap: 10,
    },
    heading: {
      alignSelf: "center",
      fontFamily: "RobotoMedium",
      fontSize: 24,
      color: colors.primaryText,
    },
    body: {},
    scrollView: {
      gap: 10,
    },
  });
  return (
    <Screen>
      <View style={styles.wrapper}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          style={styles.body}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text style={styles.heading}>{data?.name}</Text>

          {data?.workouts.map((workout) => (
            <WorkoutPlanDetailsWorkoutCard key={workout.id} workout={workout} />
          ))}
        </ScrollView>
      </View>
    </Screen>
  );
};

export default WorkoutPlanDetails;
