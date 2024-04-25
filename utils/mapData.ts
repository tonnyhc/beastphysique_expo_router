import { Profile } from "@/types/profileTypes";

export const baseProfilePicture =
  "https://res.cloudinary.com/dnb8qwwyi/image/upload/v1713645340/Default_pfp.svg_lovmuw.png";

export const generatePhysiqueGoals = (t: (key: string) => string) => {
  const physiqueGoalsMap = [
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
  return physiqueGoalsMap;
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
