import { ActivityIndicator, ScrollView, View, Text } from "react-native";
import React, { useDeferredValue, useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useCreateWorkoutContext } from "@/contexts/CreateWorkoutContext";
import {
  ExerciseFromSearch,
  MuscleGroupWithExercises,
} from "@/types/fitnessTypes";
import { useMutation, useQuery } from "@tanstack/react-query";
import useExerciseService from "@/hooks/service/useExerciseService";
import Screen from "@/components/common/Screen";
import Input from "@/components/common/Input";
import SearchIcon from "@/icons/SearchIcon";
import Button from "@/components/common/Button";
import { router } from "expo-router";
import ExerciseSearchMuscleGroup from "@/components/exercise/ExerciseSearchMuscleGroup";
import { t } from "i18next";
import ExerciseSearchCard from "@/components/exercise/ExerciseSearchCard";
import {
  checkExerciseInSearchOrder,
  checkIsExerciseInSearchSelected,
} from "@/utils/helperFn";

const ExerciseSearch: React.FC = ({}) => {
  const { colors } = useTheme();
  const { addExercise } = useCreateWorkoutContext();
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedExercises, setSelectedExercises] = useState<
    ExerciseFromSearch[]
  >([]);
  const { searchExercise, fetchMuscleGroupsWithExercises } =
    useExerciseService();
  const defferedSearch = useDeferredValue(searchValue);
  const { data, mutate, isPending } = useMutation({
    mutationKey: ["exercise"],
    mutationFn: () => searchExercise(searchValue),
  });
  const { data: queryData, isLoading } = useQuery({
    queryFn: () => fetchMuscleGroupsWithExercises(),
    queryKey: ["exercise-muscle-groups"],
    initialData: [
      {
        name: "",
        exercises: [],
      },
    ],
  });
  useEffect(() => {
    mutate();
  }, [defferedSearch]);

  const onSelectExercise = (exercise: ExerciseFromSearch) => {
    const exerciseIds = selectedExercises.map((ex) => ex.id);
    if (exerciseIds.includes(exercise.id)) {
      setSelectedExercises((prevSelected) =>
        prevSelected.filter(
          (exerciseFromArray) => exerciseFromArray.id !== exercise.id
        )
      );
    } else {
      setSelectedExercises((prevSelected) => [...prevSelected, exercise]);
    }
  };
  if (searchValue) {
    console.log(data?.exercises);
  }
  return (
    <Screen closeKeyboardOnClick={true}>
      <Input
        value={searchValue}
        onChange={(value: string) => setSearchValue(value)}
        placeholder="Exercise name"
        leftIcon={<SearchIcon size={16} color={colors.primaryText} />}
      />
      <ScrollView style={{ flex: 1, marginBottom: 100 }}>
        {isPending && <ActivityIndicator />}
        {/* <FlatListHeader /> */}
        {searchValue ? (
          <View style={{ paddingVertical: 19, gap: 28 }}>
            {data?.exercises.map((item: ExerciseFromSearch) => (
              <ExerciseSearchCard
                exercise={item}
                onSelectExercise={onSelectExercise}
                isSelected={checkIsExerciseInSearchSelected(
                  item.id,
                  selectedExercises
                )}
                exerciseOrder={checkExerciseInSearchOrder(
                  item.id,
                  selectedExercises
                )}
              />
            ))}
          </View>
        ) : (
          <View style={{ paddingVertical: 18, gap: 28 }}>
            {queryData.map((data: MuscleGroupWithExercises) => (
              <ExerciseSearchMuscleGroup
                key={data.name}
                selectedExercises={selectedExercises}
                muscleGroupData={data}
                onSelectExercise={onSelectExercise}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Select exercises btn */}
      <View style={{ position: "absolute", bottom: 20, left: 100, right: 100 }}>
        <Button
          onPress={() => {
            addExercise(selectedExercises);
            router.back();
          }}
          text={`${t("common.select")} ${selectedExercises.length}`}
        />
      </View>
    </Screen>
  );
};

export default ExerciseSearch;
