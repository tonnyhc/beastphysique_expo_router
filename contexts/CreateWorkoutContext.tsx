import useExerciseService from "@/hooks/service/useExerciseService";
import useWorkoutService from "@/hooks/service/useWorkoutService";
import * as Haptics from "expo-haptics";
import {
  Exercise,
  ExerciseFromSearch,
  ExerciseSession,
  ExerciseSet,
  Workout,
  WorkoutCreate,
} from "@/types/fitnessTypes";
import { emptySet } from "@/utils/mapData";
import { UseMutationResult } from "@tanstack/react-query";
import { router } from "expo-router";
import { ReactNode, createContext, useContext, useState } from "react";
import { useCreateWorkoutPlanContext } from "./CreateWorkoutPlanContext";

const emptyWorkoutForCreate: WorkoutCreate = {
  name: "",
  exercises: [],
};

type WorkoutContextProps = {
  workout: WorkoutCreate;
  changeWorkoutName: (name: string) => void;
  addExercise: (exercises: Exercise[] | ExerciseFromSearch) => void;
  addSetToExercise: (exerciseIndex: number) => void;
  duplicateExerciseSet: (exerciseIndex: number ,setIndex: number) => void;
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
  validateWorkout: () => boolean;
};

const CreateWorkoutContext = createContext<WorkoutContextProps>({
  workout: emptyWorkoutForCreate,
  changeWorkoutName: () => {},
  addExercise: (exercises: ExerciseSession[]) => {},
  duplicateExerciseSet: (exerciseIndex: number ,setIndex: number) => {},
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
  // submitCreate: () => ({} as UseMutationResult),
  submitEdit: () => ({} as UseMutationResult),
  validateWorkout: () => false,
});

interface CreateWorkoutProviderProps {
  children: ReactNode;
  workoutToEditIndex?: string;
  workoutToEdit?: Workout;
  callbackFn?: (workout: Workout) => void;
  makeCreateRequest: boolean;
}

export const CreateWorkoutProvider: React.FC<CreateWorkoutProviderProps> = ({
  children,
  workoutToEdit,
  workoutToEditIndex,
  callbackFn,
  makeCreateRequest,
}) => {
  const { workoutPlan, editWorkout: editWorkoutContext } =
    useCreateWorkoutPlanContext();
  if (workoutToEditIndex) {
    workoutToEdit = workoutPlan.workouts[Number(workoutToEditIndex)];
  }
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
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const duplicateExerciseSet = (exerciseIndex: number, setIndex: number) => {
    const updatedExercises = [...workout.exercises];
    updatedExercises.map((exercise, index) => {
      if (index === exerciseIndex) {
        const setCopy = { ...exercise.sets[setIndex] };
        return exercise.sets.push(setCopy);
      }
    });
    setWorkout((oldWorkout) => ({
      ...oldWorkout,
      exercises: [...updatedExercises],
    }));
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
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
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
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
    if (value.toString().includes(",")) {
      value = value.toString().replace(",", ".");
      value = value;
    }
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
  // const submitCreate = () => {
  //   const { mutate, data } = createWorkout;
  //   if (makeCreateRequest) {
  //     mutate(workout, {
  //       onSuccess: (data: Workout) => {
  //         if (callbackFn) {
  //           // const arrayWorkouts: Workout[] = [data];

  //           callbackFn(data);
  //           router.back();
  //         }
  //       },
  //     });
  //     return data;
  //   }
  //   if (callbackFn) {
  //     callbackFn(workout);
  //     router.back();
  //   }
  // };
  const submitEdit = () => {
    const { mutate, data } = editWorkout;
    if (makeCreateRequest) {
      mutate(workout);
      router.back();
      return data;
    }
    editWorkoutContext(workout);
  };

  const validateWorkout = () => {
    if (!workout.name) {
      return false;
    }
    if (workout.exercises.length <= 0) {
      return false;
    }
    for (let exercise of workout.exercises) {
      if (exercise.sets.length <= 0) {
        return false;
      }
      for (let set of exercise.sets) {
        // if the set does not have weight or is not set as bodyweight set, return false

        if (!set.weight && !set.bodyweight) {
          console.log(" weight error");
          return false;
        }
        // if the set does not have max reps, min reps and  reps that means that the set must be to failure
        if (!set.max_reps || !set.min_reps || !set.reps) {
          // if the set is not "to_failure" return false
          if (!set.to_failure) {
            return false;
          }
        }
        return true;
      }
    }
    // return true;
  };

  const context = {
    workout,
    changeWorkoutName,
    addExercise,
    addSetToExercise,
    duplicateExerciseSet,
    deleteSetFromExercise,
    editSetProperty,
    editExerciseNotes,
    deleteExercise,
    // submitCreate,
    submitEdit,
    validateWorkout,
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
