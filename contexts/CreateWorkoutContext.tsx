import useExerciseService from "@/hooks/service/useExerciseService";
import useWorkoutService from "@/hooks/service/useWorkoutService";
import { Exercise, ExerciseFromSearch, ExerciseSession, Workout, WorkoutCreate } from "@/types/fitnessTypes";
import { emptySet } from "@/utils/mapData";
import { UseMutationResult } from "@tanstack/react-query";
import { router } from "expo-router";
import { ReactNode, createContext, useContext, useState } from "react";


const emptyWorkoutForCreate: WorkoutCreate = {
  name: "",
  exercises: [],
};

type WorkoutContextProps = {
  workout: WorkoutCreate;
  changeWorkoutName: (name: string) => void;
  addExercise: (exercises: ExerciseSession[] | ExerciseFromSearch) => void;
  addSetToExercise: (exerciseIndex: number) => void;
  deleteSetFromExercise: (
    exerciseIndex: number,
    setIndex: number,
    setId?: number
  ) => void;
  editSetProperty: (
    exerciseIndex: number,
    setIndex: number,
    propertyName: string,
    value: string
  ) => void;
  editExerciseNotes: (exerciseIndex: number, value: string) => void;
  deleteExercise: (exerciseIndex: number) => void;
  submitCreate: () => UseMutationResult;
  submitEdit: () => UseMutationResult;
};

const CreateWorkoutContext = createContext<WorkoutContextProps>({
  workout: emptyWorkoutForCreate,
  changeWorkoutName: () => {},
  addExercise: (exercises: ExerciseSession[]) => {},
  addSetToExercise: (exerciseIndex: number) => {},
  deleteSetFromExercise: (exerciseIndex: number, setIndex: number) => {},
  editSetProperty: (
    exerciseIndex: number,
    setIndex: number,
    propertyName: string,
    value: string
  ) => {},
  editExerciseNotes: (exerciseIndex: number, value: string) => {},
  deleteExercise: (exerciseIndex: number) => {},
  submitCreate: () => ({} as UseMutationResult),
  submitEdit: () => ({} as UseMutationResult),
});

interface CreateWorkoutProviderProps {
  children: ReactNode;
  workoutToEdit?: Workout;
  callbackFn?: (workout: Workout) => void;
}

export const CreateWorkoutProvider: React.FC<CreateWorkoutProviderProps> = ({
  children,
  workoutToEdit,
  callbackFn,
}) => {

  const [workout, setWorkout] = useState<WorkoutCreate>(
    workoutToEdit ? workoutToEdit : emptyWorkoutForCreate
  );
  const { createWorkout, editWorkout } = useWorkoutService();
  const { deleteSetFromExerciseSession } = useExerciseService();
  const changeWorkoutName = (value: string) => {
    setWorkout((oldWorkout) => ({
      ...oldWorkout,
      name: value,
    }));
  };
  const addExercise = (exercises: Exercise[]) => {
    const newExercises: ExerciseSession[] = [];
    for (let exercise of exercises) {
      newExercises.push({
        exercise: exercise,
        sets: [{ ...emptySet }],
        notes: "",
      });
    }

    return setWorkout((oldWorkout) => ({
      ...oldWorkout,
      exercises: [
        ...oldWorkout.exercises,
        ...newExercises,
      ] as ExerciseSession[],
    }));
  };
  const addSetToExercise = (exerciseIndex: number) => {
    const updatedExercises = [...workout.exercises];
    updatedExercises.map((exercise, index) => {
      if (index === exerciseIndex) {
        return exercise.sets?.push({ ...emptySet });
      }
    });
    setWorkout((oldWorkout) => ({
      ...oldWorkout,
      exercises: [...updatedExercises],
    }));
  };
  const deleteSetFromExercise = (
    exerciseIndex: number,
    setIndex: number,
    setId: number
  ) => {
    if (workoutToEdit) {
      deleteSetFromExerciseSession.mutate(setId);
    }
    const updatedExercises = [...workout.exercises];
    updatedExercises[exerciseIndex].sets?.splice(setIndex, 1);
    setWorkout((oldWorkout) => ({
      ...oldWorkout,
      exercises: [...updatedExercises],
    }));
  };

  const deleteExercise = (exerciseIndex: number) => {
    const newExercises = [...workout.exercises];
    newExercises.splice(exerciseIndex, 1),
      setWorkout((oldWorkout) => ({
        ...oldWorkout,
        exercises: newExercises,
      }));
  };

  const editSetProperty = (
    exerciseIndex: number,
    setIndex: number,
    propertyName: string,
    value: string | boolean
  ) => {
    const exercisesCopy = [...workout.exercises];
    const exerciseToUpdate = exercisesCopy[exerciseIndex];
    const set = exerciseToUpdate.sets[setIndex];
    set[propertyName] = value;
    setWorkout((oldWorkout) => ({
      ...oldWorkout,
      exercises: exercisesCopy,
    }));
  };
  const editExerciseNotes = (exerciseIndex: number, value: string) => {
    const exercisesCopy = [...workout.exercises];
    exercisesCopy[exerciseIndex].notes = value;
    setWorkout((oldWorkout) => ({
      ...oldWorkout,
      exercises: exercisesCopy,
    }));
  };
  const submitCreate = () => {
    const { mutate, data } = createWorkout;
    mutate(workout, {
      onSuccess: (data: Workout) => {
        if (callbackFn) {
          const arrayWorkouts: Workout[] = [data];

          callbackFn(arrayWorkouts);
          navigation.navigate("WorkoutPlan");
        }
      },
    });

    return data;
  };
  const submitEdit = () => {
    const { mutate, data } = editWorkout;
    mutate(workout);
    router.back();

    return data;
  };
  const context = {
    workout,
    changeWorkoutName,
    addExercise,
    addSetToExercise,
    deleteSetFromExercise,
    editSetProperty,
    editExerciseNotes,
    deleteExercise,
    submitCreate,
    submitEdit,
  };
  return (
    <CreateWorkoutContext.Provider value={context}>
      {children}
    </CreateWorkoutContext.Provider>
  );
};

export const useCreateWorkoutContext = () => {
  const context = useContext(CreateWorkoutContext);
  if (!context) {
    throw new Error(
      "useCreateWorkoutContext must be used within a CreateWorkoutProvider"
    );
  }
  return context;
};