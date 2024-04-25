const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export type Colors = {
  iconColor: string;
  borderGrey: string;

  // new design
  // text
  white: string;
  primaryText: string;
  secondaryText: string;
  helperText: string;
  error: string;
  // backgrounds
  bg: string;
  cardBackground: string;

  button: string;
  buttonDisabled: string;
  outlinedButtonText: string;
  physiqueGoalCardHelperText: string;
  lightGray: string;
  green: string;
};

export const lightColors: Colors = {
  bg: "#F7FAFC",

  iconColor: "black",

  error: "#FF0000",
  // Borders
  borderGrey: "#CCC",

  // new design
  // button: "#03234C", old button
  // instagram's button
  button: "#0095F6",
  buttonDisabled: "#D9DEE4",
  outlinedButtonText: "#03234C",
  helperText: "#8A8A8A",
  physiqueGoalCardHelperText: "#8A8A8A",
  lightGray: "#CFCFCF",
  cardBackground: "#E7EFF1",
  secondaryText: "#9095A0FF",
  primaryText: "#171A1FFF",

  white: "#FFF",
  green: "#9FB120",
};
export const darkColors: Colors = {
  iconColor: "#DEE1E6FF",

  // Borders
  borderGrey: "#CCC",

  helperText: "#8A8A8A",
  // new design
  // bg: '#121212',
  bg: "#18191A",
  white: "#FFF",

  button: "#9FB120",
  buttonDisabled: "#E1E7BA",

  outlinedButtonText: "#FFF",
  lightGray: "#CFCFCF",
  cardBackground: "#242526",

  physiqueGoalCardHelperText: "#fff",
  primaryText: "#FFFFFF",
  secondaryText: "#B3B3B3",
  error: "#FF0000",
  green: "#9FB120",
};
