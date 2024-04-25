import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  View,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import React, { ReactNode } from "react";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeContext";

interface ButtonProps {
  onPress: () => void;
  text?: string;
  testId?: string;
  disabled?: boolean;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  type?: "primary" | "outlined" | "text";
  loading?: boolean;
  textStyles?: TextStyle;
  buttonStyles?: ViewStyle;
}

const generateBackgroundStyles = (
  type: any,
  disabled: boolean,
  colors: Colors
) => {
  const bg = {
    primary: {
      backgroundColor: disabled ? colors.buttonDisabled : colors.button,
    },
    outlined: {
      backgroundColor: "transparent",
    },
    text: {
      backgroundColor: "transparent",
    },
  };
  return bg[type];
};

const generateTextColors = (
  type: string,
  disabled: boolean,
  colors: Colors
) => {
  const colorsMap = {
    primary: {
      color: disabled ? colors.helperText : colors.white,
    },
    outlined: {
      color: disabled ? colors.helperText : colors.button,
    },
    text: {
      color: disabled ? colors.helperText : colors.button,
    },
  };
  return colorsMap[type];
};

const Button: React.FC<ButtonProps> = ({
  testId,
  disabled,
  text,
  rightIcon,
  onPress,
  type = "primary",
  loading,
  textStyles,
  buttonStyles,
  leftIcon,
}) => {
  const { colors } = useTheme();

  const backgroundStyles = generateBackgroundStyles(
    type,
    disabled ? disabled : false,
    colors
  );
  const textColor = generateTextColors(
    type,
    disabled ? disabled : false,
    colors
  );
  const styles = StyleSheet.create({
    wrapper: {
      ...backgroundStyles,
      borderWidth: type === "text" ? 0 : 2,
      borderColor: disabled ? colors.buttonDisabled : colors.button,
      paddingVertical: 14,
      paddingLeft: leftIcon ? 8 : 16,
      paddingRight: rightIcon ? 8 : 16,
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      ...buttonStyles,
    },
    text: {
      ...textColor,
      fontFamily: "RobotoRegular",
      fontSize: 16,
      ...textStyles,
    },
    textIconWrapper: {
      flexDirection: "row",
      justifyContent:
        (text && rightIcon) || (text && leftIcon) ? "space-between" : "center",
      alignItems: "center",
      gap: (text && rightIcon) || (text && leftIcon) ? 8 : 0,
    },
  });

  return (
    <TouchableOpacity
      style={styles.wrapper}
      disabled={disabled}
      testID={testId}
      onPress={onPress}
    >
      {loading ? <ActivityIndicator testID="loadingIndicator" /> : null}
      <View style={styles.textIconWrapper}>
        {leftIcon}
        <Text style={styles.text}>{text}</Text>
        {rightIcon}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
