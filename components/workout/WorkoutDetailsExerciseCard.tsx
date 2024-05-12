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
import WorkoutDetailsExerciseCardHeader from "./WorkoutDetailsExerciseCardHeader";
import InfoIcon from "@/icons/InfoIcon";
import WorkoutDetailsExerciseButtons from "./WorkoutDetailsExerciseButtons";
import WorkoutDetailsExpandedExerciseCard from "./WorkoutDetailsExpandedExerciseCard";

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
  const [clickedSet, setClickedSet] = useState<ExerciseSet | null>(null);

  //   const { data } = useFetchExerciseSessionProgress(session.id);

  const cardClickHandler = () => {
    setIsExpanded((oldExpanded) => !oldExpanded);
  };

  const handleSetClick = (set: ExerciseSet) => {
    if (clickedSet === set) {
      return setClickedSet(null);
    }
    setClickedSet(set);
  };

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.cardBackground,
      paddingTop: 10,
      paddingBottom: isExpanded ? 0 : 10,

      paddingHorizontal: 10,
      borderRadius: 8,
    },
  });
  return (
    <View style={styles.card}>
      <WorkoutDetailsExerciseCardHeader
        isExpanded={isExpanded}
        exerciseName={session.exercise.name}
        index={index}
        setsCount={session.sets.length}
        cardClickHandler={cardClickHandler}
      />

      {isExpanded ? (
        <WorkoutDetailsExpandedExerciseCard
          handleSetClick={handleSetClick}
          isExpanded={isExpanded}
          exerciseTips={session.exercise.tips}
          clickedSet={clickedSet}
          sets={session.sets}
        />
      ) : null}
    </View>
  );
};

export default WorkoutDetailsExerciseCard;
