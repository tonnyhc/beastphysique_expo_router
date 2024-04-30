import { ReactNode, createContext, useContext, useState } from "react";
import { Workout, WorkoutPlanState } from "@/types/fitnessTypes";

const emptyWorkoutPlan: WorkoutPlanState = {
  planName: "",
  workouts: [],
};

type CreateWorkoutPlanContextProps = {
  workoutPlan: WorkoutPlanState;
  changePlanName: (name: string) => void;
  addWorkout: (workout: Workout) => void;
  deleteWorkout: (workoutIndex: number) => void;
  editWorkout: (workoutIndex: number, workout: Workout) => void;
  resetContextState: () => void;
};

const CreateWorkoutPlanContext = createContext<CreateWorkoutPlanContextProps>({
  workoutPlan: emptyWorkoutPlan,
  changePlanName: () => {},
  addWorkout: () => {},
  deleteWorkout: () => {},
  editWorkout: (workoutIndex: number, workout: Workout) => {},
  resetContextState: () => {},
});

interface CreateWorkoutPlanProviderProps {
  children: ReactNode;
}

const CreateWorkoutPlanProvider: React.FC<CreateWorkoutPlanProviderProps> = ({
  children,
}) => {
  const [workoutPlan, setWorkoutPlan] =
    useState<WorkoutPlanState>(emptyWorkoutPlan);
  const changePlanName = (value: string) => {
    setWorkoutPlan((oldPlan) => ({
      ...oldPlan,
      planName: value,
    }));
  };
  const addWorkout = (workout: Workout) => {
    console.log("enters");
    const newWorkouts: Workout[] = [...workoutPlan.workouts, workout];
    setWorkoutPlan((oldPlan) => ({
      ...oldPlan,
      workouts: [...newWorkouts],
    }));
  };
  const deleteWorkout = (workoutIndex: number) => {
    const newWorkouts = [...workoutPlan.workouts];
    newWorkouts.splice(workoutIndex, 1);
    setWorkoutPlan((oldPlan) => ({
      ...oldPlan,
      workouts: [...newWorkouts],
    }));
  };
  const editWorkout = (workoutIndex: number, workout: Workout) => {
    const newWorkouts = [...workoutPlan.workouts];
    newWorkouts.splice(workoutIndex, 1);
    newWorkouts.push(workout);
    setWorkoutPlan((oldPlan) => ({
      ...oldPlan,
      workouts: newWorkouts,
    }));
  };

  const resetContextState = () => {
    setWorkoutPlan(emptyWorkoutPlan);
  };
  const context = {
    workoutPlan,
    changePlanName,
    addWorkout,
    deleteWorkout,
    editWorkout,
    resetContextState,
  };
  return (
    <CreateWorkoutPlanContext.Provider value={context}>
      {children}
    </CreateWorkoutPlanContext.Provider>
  );
};

export const useCreateWorkoutPlanContext = () => {
  return useContext(CreateWorkoutPlanContext);
};

export default CreateWorkoutPlanProvider;
