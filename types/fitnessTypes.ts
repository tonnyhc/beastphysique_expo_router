import { ImagePickerAsset } from "expo-image-picker";
import { Profile } from "./profileTypes";

export type ExerciseSet = {
  weight: string;
  reps: string;
  min_reps: string;
  max_reps: string;
  to_failure: boolean;
  bodyweight: boolean;
  id?: number;
};

export type Exercise = {
  id: number;
  name: string;
  cover_photo: string;
  //   TODO: Fix targeted muscle groups
  targeted_muscle_groups: string[];
  information: string;
  video_tutorial: string;
  tips: string;
  created_by: Profile;
  created_at: Date;
  is_published: boolean;
};

export type CreateExerciseData = {
  name: string;
  targeted_muscle_groups: MuscleGroup[];
  bodyweight: boolean;
  cover_photo: string | null;
  information: string;
  video_tutorial: ImagePickerAsset | null;
  tips: string;
  publish: boolean;
};

export type ExerciseFromSearch = {
  id: number;
  name: string;
};

export type ExerciseSession = {
  id: number;
  exercise: Exercise;
  sets: ExerciseSet[];
  notes: string;
  created_at?: string;
  // TODO: implement the profile type
  profile?: any;
};

export type Workout = {
  id?: string | number;
  name: string;
  total_exercises: number;
  total_sets: number;
  total_weight_volume: number;
  is_published: boolean;
  exercises: ExerciseSession[];
};

export type WorkoutPlan = {
  id: number | string;
  created_by: Profile;
  created_at: Date;
  name: string;
  total_workouts: number | string;
  workouts: Workout[];
};

export type WorkoutCreate = {
  id?: number;
  name: string;
  exercises: ExerciseSession[];
};


export type MuscleGroupWithExercises = {
  name: string;
  exercises: {
    id: number;
    name: string;
  }[];
};
export type MuscleGroup = {
  id: number,
  name: string
}

export type WorkoutPlanState = {
  planName: string;
  workouts: Workout[];
};

export type WorkoutSession = {
  id: string | number;
  name: string;
  total_exercises: number;
  total_sets: number;
  total_weight_volume: number;
  is_published: boolean;
  exercises: ExerciseSession[];
};