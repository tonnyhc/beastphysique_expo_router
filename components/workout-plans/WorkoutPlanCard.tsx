import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { WorkoutPlan } from "@/types/fitnessTypes";
import { router } from "expo-router";

interface WorkoutPlanCardProps {
  plan: WorkoutPlan;
}

const WorkoutPlanCard: React.FC<WorkoutPlanCardProps> = ({ plan }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    cardWrapper: {
      paddingTop: 6,
      marginBottom: 12,
      height: 85,
      backgroundColor: colors.cardBackground,
      borderRadius: 10,
      justifyContent: "center",
      alignContent: "center",
    },
    contentWrapper: {
      paddingLeft: 24,
      paddingRight: 24,
    },
    heading: {
      fontSize: 18,
      fontFamily: "RobotoMedium",
      fontWeight: "700",
      color: colors.primaryText,
      marginBottom: 6,
    },
    dateRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      color: colors.primaryText,
      fontSize: 16,
    },
    creator: {
      alignSelf: "flex-end",
      fontSize: 12,
      fontWeight: "600",
      color: colors.secondaryText,
    },
  });
  return (
    <TouchableOpacity
      onPress={
        () => router.push(`/(tabs)/workouts/workout-plan/${plan.id}`)
        // navigation.navigate("WorkoutPlanDetails", { planId: plan.id })
      }
      style={styles.cardWrapper}
    >
      <View style={styles.contentWrapper}>
        <Text style={styles.heading}>{plan.name}</Text>
        <View style={styles.dateRow}>
          <Text style={{ color: colors.primaryText }}>
            Workouts: {plan.total_workouts}
          </Text>
          <Text style={{ color: colors.primaryText }}>
            {plan.created_at.toString()}
          </Text>
        </View>
        <Text style={styles.creator}>{plan.created_by.full_name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default WorkoutPlanCard;
