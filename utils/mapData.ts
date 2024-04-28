import { ExerciseSet } from "@/types/fitnessTypes";
import { Profile } from "@/types/profileTypes";

export const baseProfilePicture =
  "https://res.cloudinary.com/dnb8qwwyi/image/upload/v1713645340/Default_pfp.svg_lovmuw.png";

export const generateFitnessGoals = (t: (key: string) => string) => {
  const fitnessGoalsMap = [
    {
      heading: t("screens.goal.maintain"),
      value: "Maintain",
      helperText: t("screens.goal.maintainHelperText"),
    },

    {
      heading: t("screens.goal.bulk"),
      value: "Bulk",
      helperText: t("screens.goal.bulkHelperText"),
    },
    {
      heading: t("screens.goal.cut"),
      value: "Cut",
      helperText: t("screens.goal.cutHelperText"),
    },
  ];
  return fitnessGoalsMap;
};

export const emptyUserProfile: Profile = {
  id: 0,
  full_name: "",
  gender: "",
  birthday: "",
  bio: "",
  user: "",
  picture: baseProfilePicture,
};

export const emptySet: ExerciseSet = {
  weight: "",
  reps: "",
  max_reps: "",
  min_reps: "",
  to_failure: false,
  bodyweight: false,
};

export const emptyWorkoutSession = {
  id: 0,
  created_at: "1-1-1",
  name: "",
  total_exercises: 1,
  total_sets: 1,
  total_weight_volume: 1,
  is_published: false,
  created_by: 1,
  exercises: [],
};