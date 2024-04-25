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
      { heading: t("screens.goal.cut"), value: "Cut", helperText: t("screens.goal.cutHelperText")},
    ];
    return physiqueGoalsMap;
  };