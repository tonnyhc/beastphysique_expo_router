import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import useWorkoutPlanServices from "@/hooks/service/useWorkoutPlanServices";
import useRefreshControl from "@/hooks/useRefreshControl";
import Screen from "@/components/common/Screen";
import WorkoutPlanDetailsWorkoutCard from "@/components/workout-plans/WorkoutPlanDetailsWorkoutCard";
import { router, useLocalSearchParams } from "expo-router";
import StackHeader from "@/components/common/StackHeader";
import BackButton from "@/components/common/BackButton";
import MoreDotsIcon from "@/icons/MoreDotsIcon";
import Button from "@/components/common/Button";
import TrashIcon from "@/icons/TrashIcon";

const WorkoutPlanDetails: React.FC = () => {
  const params = useLocalSearchParams();
  const { id } = params;
  const { colors } = useTheme();

  const { getWorkoutPlanById, deleteWorkoutPlan } = useWorkoutPlanServices();
  const { data, refetch, isLoading, isError } = useQuery({
    queryFn: () => getWorkoutPlanById(id as unknown as number),
    queryKey: ["workoutPlan"],
  });
  const {
    mutate,
    isPending,
    error: mutateError,
    isError: mutateIsError,
  } = useMutation({
    mutationFn: () => deleteWorkoutPlan(id as unknown as number),
    onSuccess: () => router.back(),
  });
  const { refreshing, onRefresh } = useRefreshControl({
    isLoading,
    refreshFn: refetch,
  });
  const deleteWorkoutPlanAlert = () => {
    Alert.alert(
      `Delete ${data?.name}`,
      `Are you sure you want to delete ${data?.name}? This action cant be undone.`,
      [
        {
          text: isPending
            ? `
              ${(<ActivityIndicator />)}
            `
            : "Delete",
          style: "destructive",
          onPress: () => mutate(),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };
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
    <Screen
      styles={{
        paddingTop: 0,
      }}
    >
      <StackHeader
        headerStyles={{
          paddingRight: 0,
          paddingLeft: 0,
        }}
        headerLeft={<BackButton onPress={() => router.back()} />}
        headerTitle="Workout Plan"
        headerRight={
          <Button
            buttonStyles={{
              paddingLeft: 0,
              paddingRight: 0,
            }}
            onPress={() => deleteWorkoutPlanAlert()}
            type="text"
            text=""
            leftIcon={<TrashIcon size={24} color={colors.error} />}
          />
        }
      />
      
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
