import { useAuth } from "@/contexts/AuthContext";
import useApi from "./useApi";
import { Workout, WorkoutPlan } from "@/types/fitnessTypes";

const useWorkoutPlanServices = () => {
  const { token } = useAuth();
  const { post, get, del } = useApi(token);

  const createWorkoutPlan = async (body: Record<string, any>): Promise<any> => {
    try {
      const data = await post("workouts/workout-plan/create/", body);
      return data;
    } catch (e) {
      throw e;
    }
  };

  const getWorkoutPlansByUser = async (): Promise<Workout> => {
    try {
      const data = await get("workouts/workout-plan/by-user/");
      return data;
    } catch (e) {
      throw e;
    }
  };

  const getWorkoutPlanById = async (id: number): Promise<WorkoutPlan> => {
    const url = "workouts/workout-plan/details/" + id + "/";
    return await get(url);
  };

  const deleteWorkoutPlan = async(id:number):Promise<null> => {
    const url = 'workouts/workout-plan/delete/' + id + '/';
    return await del(url)
  }

  return { createWorkoutPlan, getWorkoutPlansByUser, getWorkoutPlanById, deleteWorkoutPlan };
};

export default useWorkoutPlanServices;
