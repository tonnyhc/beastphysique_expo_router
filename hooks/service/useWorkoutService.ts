import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import useApi from "./useApi";
import { WorkoutCreate } from "@/types/fitnessTypes";
import { emptyWorkoutSession } from "@/utils/mapData";

const useWorkoutService = () => {
  const url = "workouts/workout/";
  const { token } = useAuth();
  const { get, post, put } = useApi(token as string);

  const searchWorkoutSession = async (name: string) => {
    return get(url + "search/" + `?name=${encodeURIComponent(name)}`);
  };

  const fetchWorkoutSessionDetails = async (id: number) => {
    return get(url + "session/" + id + "/");
  };

  const fetchCreateWorkout = async (body: WorkoutCreate) => {
    return post(url + "create/", body);
  };

  const fetchEditWorkout = async (body: WorkoutCreate) => {
    const finalUrl = url + "session/edit/" + body.id + "/";
    return put(finalUrl, body);
  };

  const workoutSessionDetails = (workoutSessionId: number) => {
    const query = useQuery({
      queryKey: ["workout_session", workoutSessionId],
      queryFn: () => fetchWorkoutSessionDetails(workoutSessionId),
      initialData: emptyWorkoutSession,
    });
    return query;
  };

  const createWorkout = useMutation({
    mutationFn: (data: WorkoutCreate) => fetchCreateWorkout(data),
    mutationKey: ["createWorkout"],
  });

  const editWorkout = useMutation({
    mutationFn: (data: WorkoutCreate) => fetchEditWorkout(data),
    mutationKey: [`editWorkout`],
  });

  return {
    workoutSessionDetails,
    createWorkout,
    searchWorkoutSession,
    editWorkout,
  };
};

export default useWorkoutService;
