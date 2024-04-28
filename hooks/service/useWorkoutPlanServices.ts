import { useAuth } from "@/contexts/AuthContext";
import useApi from "./useApi";
import { Workout } from "@/types/fitnessTypes";

const useWorkoutServices = () => {
  const { token } = useAuth();
  const { post, get } = useApi(token);

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
  return { createWorkoutPlan, getWorkoutPlansByUser };
};

export default useWorkoutServices;
