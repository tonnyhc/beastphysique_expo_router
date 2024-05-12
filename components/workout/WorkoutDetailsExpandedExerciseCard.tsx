import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import WorkoutDetailsExerciseButtons from "./WorkoutDetailsExerciseButtons";
import { useTheme } from "@/contexts/ThemeContext";
import { ExerciseSet } from "@/types/fitnessTypes";

interface WorkoutDetailsExpandedExerciseCardProps {
  isExpanded: boolean;
  exerciseTips: string;
  sets: ExerciseSet[];
  clickedSet: ExerciseSet | null;
  handleSetClick: (set: ExerciseSet) => void;
}

const WorkoutDetailsExpandedExerciseCard: React.FC<
  WorkoutDetailsExpandedExerciseCardProps
> = ({ isExpanded, exerciseTips, sets, clickedSet, handleSetClick }) => {
  const { colors } = useTheme();
  const scaleYAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(scaleYAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 120, // You can adjust the duration as needed
      useNativeDriver: false,
    }).start();
  }, [scaleYAnim, isExpanded]);
  const styles = StyleSheet.create({
    subheader: {
      fontSize: 16,
      color: colors.secondaryText,
      //   fontWeight: "500",
      fontFamily: "RobotoMedium",
    },
    cardContent: {
      paddingVertical: 20,
    },
    animatedCardContent: {
      transform: [{ scaleY: scaleYAnim }],
      overflow: "hidden",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
    },

    separator: {
      height: "100%",
      width: 1,
      backgroundColor: colors.helperText,
    },
    footer: {
      marginTop: 20,
    },
    setsWrapper: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      rowGap: 10,
      columnGap: 15,
    },
    setPill: {
      borderWidth: 1,
      borderColor: colors.primaryText,
      paddingHorizontal: 18,
      paddingVertical: 5,
      borderRadius: 5,
    },
    activeSetPill: {
      backgroundColor: colors.button,
    },
    setContent: {
      fontSize: 16,
      color: colors.primaryText,
      fontFamily: "RobotoRegular",
    },
    setDetails: {
      flexDirection: "row",
      marginTop: 10,
      padding: 12,
      borderWidth: 0.5,
      borderColor: colors.secondaryText,
      borderRadius: 4,
      justifyContent: "space-between",
    },
    setProperty: {
      fontSize: 16,
      lineHeight: 26,
      color: colors.primaryText,
    },
    setValue: {
      fontSize: 16,
      color: colors.secondaryText,
      textAlign: "center",
    },
    setsCount: {
      justifyContent: "center",
      alignItems: "center",
      gap: 4,
    },
    body: {
      marginTop: 24,
      paddingHorizontal: 12,
      gap: 6,
    },
    bodyHeader: {
      fontSize: 15,
      color: colors.helperText,
      fontWeight: "600",
    },
    bodyText: {
      fontSize: 14,
      color: colors.helperText,
      fontWeight: "500",
    },
  });

  return (
    <Animated.View style={[styles.cardContent, styles.animatedCardContent]}>
      {/* Header */}
      <View style={styles.header}>
        <WorkoutDetailsExerciseButtons />

        <View style={styles.separator} />
        <View style={styles.setsCount}>
          <Text style={styles.subheader}>{sets.length}</Text>
          <Text style={styles.subheader}>Sets</Text>
        </View>
      </View>
      {/* Body */}
      <View style={styles.body}>
        <Text style={styles.bodyHeader}>Tips:</Text>
        <Text style={styles.bodyText}>
          {exerciseTips || "This exercise does not have any tips."}
        </Text>
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.setsWrapper}>
          {sets.map((set, index) => (
            <TouchableOpacity
              onPress={() => handleSetClick(set)}
              key={index}
              style={[
                styles.setPill,
                clickedSet === set ? styles.activeSetPill : null,
              ]}
            >
              <Text style={[styles.setContent]}>Set {index + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {clickedSet ? (
          <View style={styles.setDetails}>
            {/* Set Property */}
            <View>
              <Text style={styles.setProperty}>Weight</Text>
              <Text style={styles.setValue}>{clickedSet.weight}</Text>
            </View>
            {/* Set Property */}
            <View>
              <Text style={styles.setProperty}>Reps</Text>
              <Text style={styles.setValue}>{clickedSet.reps}</Text>
            </View>
            {/* Set Property */}
            <View>
              <Text style={styles.setProperty}>Min Reps</Text>
              <Text style={styles.setValue}>{clickedSet.min_reps}</Text>
            </View>
            {/* Set Property */}
            <View>
              <Text style={styles.setProperty}>Max Reps</Text>
              <Text style={styles.setValue}>{clickedSet.max_reps}</Text>
            </View>
          </View>
        ) : null}
      </View>
    </Animated.View>
  );
};

export default WorkoutDetailsExpandedExerciseCard;
