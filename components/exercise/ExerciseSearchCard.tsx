import { useTheme } from "@/contexts/ThemeContext";
import { ExerciseFromSearch } from "@/types/fitnessTypes";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Button from "../common/Button";
import InfoIcon from "@/icons/InfoIcon";



interface ExerciseSearchCardProps {
  exercise: ExerciseFromSearch;
  onSelectExercise: (exercise: ExerciseFromSearch) => void;
  isSelected: boolean;
  exerciseOrder: number;
}

const ExerciseSearchCard: React.FC<ExerciseSearchCardProps> = ({
  exercise,
  onSelectExercise,
  isSelected,
  exerciseOrder,
}) => {

  const { colors } = useTheme();
  const styles = StyleSheet.create({
    exercise: {
      flexDirection: "row",
      gap: 20,
      alignItems: "center",
      // flex: 1,
    },
    exerciseTitleCircle: {
      height: 36,
      width: 36,
      borderRadius: 100,
      backgroundColor: isSelected ? colors.button : colors.helperText,
      justifyContent: "center",
      alignItems: "center",
    },
    exerciseTitleCircleText: {
      fontSize: 20,
      fontFamily: "RobotoRegular",
      color: colors.white,
    },
    exerciseName: {
      fontFamily: "RobotoRegular",
      fontSize: 20,
      color: colors.primaryText
    },
  });
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <TouchableOpacity
        key={exercise.id}
        onPress={() => onSelectExercise(exercise)}
        style={styles.exercise}
      >
        <View style={styles.exerciseTitleCircle}>
          <Text style={styles.exerciseTitleCircleText}>
            {isSelected ? exerciseOrder : `${exercise.name[0]}`}
          </Text>
        </View>

        <Text style={styles.exerciseName}>{exercise.name}</Text>
      </TouchableOpacity>
      <View style={{ alignSelf: "flex-end" }}>
        <Button
          buttonStyles={{
            paddingVertical: 0,
          }}
          type="text"
          leftIcon={<InfoIcon size={26} color={colors.secondaryText} />}
          onPress={() =>
            navigation.navigate("ExerciseDetails", {
              exerciseId: exercise.id,
            })
          }
        />
      </View>
    </View>
  );
};

export default ExerciseSearchCard;