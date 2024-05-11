import { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { ExerciseSession, ExerciseSet } from "@/types/fitnessTypes";
import TimelineIcon from "@/icons/TimelineIcon";
import GearIcon from "@/icons/GearIcon";

interface WorkoutDetailsExerciseCardProp {
  session: ExerciseSession;
  index: number;
}

const WorkoutDetailsExerciseCard: React.FC<WorkoutDetailsExerciseCardProp> = ({
  session,
  index,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { colors } = useTheme();
  const scaleYAnim = useRef(new Animated.Value(0)).current;
  const [clickedSetIndex, setClickedSetIndex] = useState<ExerciseSet | null>(
    null
  );

  //   const { data } = useFetchExerciseSessionProgress(session.id);

  useEffect(() => {
    Animated.timing(scaleYAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 120, // You can adjust the duration as needed
      useNativeDriver: false,
    }).start();
  }, [scaleYAnim, isExpanded]);

  const cardClickHandler = () => {
    setIsExpanded((oldExpanded) => !oldExpanded);
  };

  const handleSetClick = (set: ExerciseSet) => {
    if (clickedSetIndex === set) {
      return setClickedSetIndex(null);
    }
    setClickedSetIndex(set);
  };

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.cardBackground,
      paddingTop: 10,
      paddingBottom: isExpanded ? 0 : 10,

      paddingHorizontal: 10,
      borderRadius: 8,
    },
    headingWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    heading: {
      color: colors.primaryText,
      fontSize: 18,
      fontFamily: "RobotoBold",
    },
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
    buttonsWrapper: {
      flexDirection: "row",
      gap: 30,
      paddingHorizontal: 8,
    },
    button: {
      gap: 4,
    },
    buttonText: {
      color: colors.button,
      fontSize: 16,
    },
    separator: {
      height: "100%",
      width: 1,
      backgroundColor: colors.helperText,
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
      //   backgroundColor: colors.primaryText,
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
  });
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={cardClickHandler}>
        <View style={styles.headingWrapper}>
          <Text style={styles.heading}>
            {index + 1}. {session?.exercise?.name}
          </Text>
          {!isExpanded ? (
            <Text style={styles.subheader}>{session.sets.length} sets</Text>
          ) : null}
        </View>
      </TouchableOpacity>

      {isExpanded ? (
        <Animated.View style={[styles.cardContent, styles.animatedCardContent]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.buttonsWrapper}>
              <TouchableOpacity
                onPress={() => navigation.navigate("ExerciseProgress")}
                style={styles.button}
              >
                <TimelineIcon size={22} color={colors.button} />
                <Text style={styles.buttonText}>Progress</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EditExerciseSession", {
                    exerciseSession: session,
                  })
                }
                style={styles.button}
              >
                <GearIcon size={22} color={colors.button} />
                <Text style={styles.buttonText}>Modify</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <View style={styles.setsCount}>
              <Text style={styles.subheader}>{session.sets.length}</Text>
              <Text style={styles.subheader}>Sets</Text>
            </View>
          </View>
          {/* Body */}
          <View style={styles.body}>
            <Text style={styles.bodyHeader}>Tips:</Text>
            <Text style={styles.bodyText}>
              {session.exercise.tips || "This exercise does not have any tips."}
            </Text>
          </View>
          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.setsWrapper}>
              {session.sets.map((set, index) => (
                <TouchableOpacity
                  onPress={() => handleSetClick(set)}
                  key={index}
                  style={[
                    styles.setPill,
                    clickedSetIndex === set ? styles.activeSetPill : null,
                  ]}
                >
                  <Text style={[styles.setContent]}>Set {index + 1}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {clickedSetIndex ? (
              <View style={styles.setDetails}>
                {/* Set Property */}
                <View>
                  <Text style={styles.setProperty}>Weight</Text>
                  <Text style={styles.setValue}>{clickedSetIndex.weight}</Text>
                </View>
                {/* Set Property */}
                <View>
                  <Text style={styles.setProperty}>Reps</Text>
                  <Text style={styles.setValue}>{clickedSetIndex.reps}</Text>
                </View>
                {/* Set Property */}
                <View>
                  <Text style={styles.setProperty}>Min Reps</Text>
                  <Text style={styles.setValue}>
                    {clickedSetIndex.min_reps}
                  </Text>
                </View>
                {/* Set Property */}
                <View>
                  <Text style={styles.setProperty}>Max Reps</Text>
                  <Text style={styles.setValue}>
                    {clickedSetIndex.max_reps}
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
        </Animated.View>
      ) : null}
    </View>
  );
};

export default WorkoutDetailsExerciseCard;
