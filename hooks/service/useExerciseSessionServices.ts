import useApi from "./useApi";
import { useAuth } from "../../contexts/AuthContext";
import { ExerciseSet } from "@/types/fitnessTypes";

const useExerciseSessionService = () => {
  const { token } = useAuth();
  const { post, put } = useApi(token);
  const url = "workouts/exercise/session/";
  const addSetToExerciseSession = async (
    sessionId: number
  ): Promise<ExerciseSet> => {
    const data = await post(url + `add-set/${sessionId}/`);
    return data;
  };
  const deleteSetFromExerciseSession = async (setId: number): Promise<any> => {
    const data = await post(url + `delete-set/${setId}/`);
    return data;
  };

  const updateSession = async (
    sessionId: number,
    data: {
      sets: ExerciseSet[];
    }
  ): Promise<string> => {
    // The server expects a body like so {sets: [{	{
    // 	"bodyweight": boolean,
    // 	"id": number,
    // 	"max_reps": number,
    // 	"min_reps": number,
    // 	"reps": number,
    // 	"set_index": number,
    // 	"to_failure": boolean,
    // 	"weight": number
    // },}]}
    return await put(url + `edit/${sessionId}/`, data);
  };

  return {
    addSetToExerciseSession,
    deleteSetFromExerciseSession,
    updateSession,
  };
};

export default useExerciseSessionService;
