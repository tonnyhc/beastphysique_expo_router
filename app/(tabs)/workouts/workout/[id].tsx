import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import useWorkoutService from "@/hooks/service/useWorkoutService";
import useRefreshControl from "@/hooks/useRefreshControl";
import { WorkoutSession } from "@/types/fitnessTypes";
import Screen from "@/components/common/Screen";
import WorkoutDetailsExerciseCard from "@/components/workout/WorkoutDetailsExerciseCard";
import StackHeader from "@/components/common/StackHeader";
import BackButton from "@/components/common/BackButton";
import { router, useLocalSearchParams } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import MoreDotsIcon from "@/icons/MoreDotsIcon";
import EditExerciseSessionModal from "@/components/workout/EditExerciseSessionModal";

const WorkoutDetails: React.FC = () => {
  const { workoutSessionDetails } = useWorkoutService();
  const { id } = useLocalSearchParams();
  const { colors } = useTheme();

  const { data, refetch, isLoading, isError } = workoutSessionDetails(
    id as unknown as number
  );

  const { onRefresh, refreshing } = useRefreshControl({
    isLoading,
    refreshFn: refetch,
  });
  const workoutData = data as WorkoutSession;
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    exercisesWrapper: {
      flexGrow: 1,
      backgroundColor: colors.cardBackground,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      gap: 10,
      padding: 10,
    },
  });
  return (
    <>
      <Screen
        styles={{
          paddingTop: 0,
        }}
      >
        <View style={styles.wrapper}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={
              <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
            }
          >
            <StackHeader
              headerStyles={{
                paddingLeft: 0,
                paddingRight: 0,
                marginBottom: 20,
              }}
              headerLeft={<BackButton onPress={() => router.back()} />}
              headerTitle={workoutData.name}
            />
            {/* <ScrollView style={styles.exercisesWrapper}> */}
            {workoutData.exercises.map((exercise, index) => (
              <WorkoutDetailsExerciseCard
                key={exercise.id}
                index={index}
                session={exercise}
              />
            ))}
            {/* </ScrollView> */}
          </ScrollView>
        </View>
      </Screen>
    </>
  );
};

export default WorkoutDetails;
