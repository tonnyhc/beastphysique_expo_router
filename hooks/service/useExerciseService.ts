import { useAuth } from "@/contexts/AuthContext";
import { UseMutationResult, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import { Exercise, MuscleGroupWithExercises } from "@/types/fitnessTypes";

const useExerciseService = (): {
  searchExercise: (name: string) => Promise<any>;
  createExercise: (body: Record<any, any>) => Promise<any>;
  fetchMuscleGroupsWithExercises: () => Promise<any>;
  fetchExerciseDetails: (exerciseId: number) => Promise<Exercise>;
  deleteSetFromExerciseSession: () => void;
  listQuery: () => UseQueryResult<MuscleGroupWithExercises[]>
} => {
  const { token } = useAuth();
  const { get, post } = useApi(token as string);
  const searchExercise = async (name: string) => {
    const url =
      "workouts/exercise/search/" + `?name=${encodeURIComponent(name)}`;
    const data = await get(url);
    return data;
  };

  const createExercise = async (body: Record<any, any>) => {
    const url = "workouts/exercise/create/";
    const data = await post(url, body);
    return data;
  };

  const fetchMuscleGroupsWithExercises = async () => {
    const url = "workouts/muscle-group/list-exercises/";
    const data = await get(url);
    return data;
  };

  const fetchExerciseDetails = async (exerciseId: number) => {
    const url = "workouts/exercise/details/" + exerciseId;
    const data = await get(url);
    return data;
  };

  const fetchRemoveSetFromExercise = async (setId: number) => {
    const url = `workouts/exercise/session/delete-set/${setId}/`;
    const data = await post(url);
    return data;
  };

  const deleteSetFromExerciseSession = useMutation({
    mutationFn: (setId: number) => fetchRemoveSetFromExercise(setId),
    mutationKey: ["remove-set-from-exercise"],
  });

  const fetchMuscleGroups = async (): Promise<
    { id: number; name: string }[]
  > => {
    const data = await get(`workouts/muscle-group/list/`);
    return data;
  };

  const listQuery = useQuery({
    queryFn: () => fetchMuscleGroups(),
    initialData: [
      {
        id: 1,
        name: "Muscle",
      },
    ],
    queryKey: ["muscle-groups-list"],
  });

  return {
    searchExercise,
    createExercise,
    fetchMuscleGroupsWithExercises,
    fetchExerciseDetails,
    deleteSetFromExerciseSession,
    listQuery,
  };
};

export default useExerciseService;
