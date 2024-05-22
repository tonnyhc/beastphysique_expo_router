import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import React, { ReactNode, useEffect, useState } from "react";
import UserIcon from "../../icons/UserIcon";
import { useTheme } from "../../contexts/ThemeContext";
import { emailRegex } from "@/utils/regexes";
import { useTranslation } from "react-i18next";
import EyeIcon from "@/icons/EyeIcon";
import EyeSlashIcon from "@/icons/EyeSlashIcon";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  labelStyles?: TextStyle;
  placeholder: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  rightIconOnPress?: () => void;
  isPassword?: boolean;
  helperTextLeft?: string;
  helperTextRight?: string;
  onPressHelperRight?: () => void;
  error?: string;
  styles?: ViewStyle;
  multiline?: boolean;
  onEndEditing?: () => void;
  inputMode?: "text" | "decimal" | "numeric" | "email" | "search";
  defaultValue?: string;
  numberOfLines?: number;
  borderStyles?: ViewStyle;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  label,
  labelStyles,
  placeholder,
  leftIcon,
  rightIcon,
  rightIconOnPress,
  isPassword,
  error,
  onEndEditing,
  inputMode,
  helperTextLeft,
  helperTextRight,
  onPressHelperRight,
  multiline,
  styles,
  defaultValue,
  numberOfLines,
  borderStyles,
  keyboardType,
  maxLength,
  autoCapitalize = "sentences",
}) => {
  const { t } = useTranslation();
  const { colors, theme } = useTheme();
  const [securedPassword, setSecuredPassword] = useState<boolean>(
    isPassword ? true : false
  );
  const [emailError, setEmailError] = useState<boolean>(false);

  useEffect(() => {
    if (value === "") {
      return setEmailError(false);
    }
    if (inputMode !== "email") {
      return;
    }
    const isValid = emailRegex.test(value);
    setEmailError(!isValid);
  }, [value]);

  const stylesheet = StyleSheet.create({
    wrapper: {
      gap: 4,

      ...styles,
    },
    label: {
      fontSize: 16,
      fontFamily: "RobotoMedium",
      marginLeft: 8,
      marginBottom: 4,
      color: error || emailError ? colors.error : colors.primaryText,
      ...labelStyles,
    },
    master: {
      gap: 8,
      minHeight: multiline ? 68 : 42,
      height: "auto",
      borderWidth: 1,
      borderRadius: 4,
      borderColor: error || emailError ? colors.error : "#676767",
      paddingLeft: 16,
      paddingRight: 16,
      paddingVertical: 12,
      justifyContent: "center",
      flexDirection: "row",
      ...borderStyles,
    },
    icon_placeholder_wrapper: {
      justifyContent: "center",
    },
    input: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      color: colors.primaryText,
      fontFamily: "RobotoMedium",
      fontSize: 18,
      // textAlign: 'center',
    },
    placeholderText: {
      fontSize: 18,
      fontFamily: "RobotoMedium",
      color: colors.secondaryText,
    },
    helperRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 16,
    },
    helpText: {
      fontFamily: "RobotoRegular",
      fontSize: 14,
      color: error || emailError ? colors.error : colors.secondaryText,
    },
  });
  const renderPasswordVisibilityIcon = () => {
    if (securedPassword) {
      return <EyeIcon size={24} color={colors.secondaryText} />;
    }
    return <EyeSlashIcon size={24} color={colors.secondaryText} />;
  };

  const handleMultiLines = () => {
    if (numberOfLines && multiline) {
      return numberOfLines;
    } else if (!numberOfLines && multiline) {
      return 10;
    } else {
      return 1;
    }
  };
  const multilines = handleMultiLines();

  return (
    <View style={stylesheet.wrapper}>
      {error || label ? (
        <Text style={stylesheet.label}>{error ? error : label}</Text>
      ) : null}
      <View style={stylesheet.master}>
        {/* left icon */}
        {leftIcon ? (
          <View style={stylesheet.icon_placeholder_wrapper}>{leftIcon}</View>
        ) : null}

        {/* input */}

        <TextInput
          autoCapitalize={autoCapitalize}
          maxLength={maxLength ? maxLength : undefined}
          keyboardType={keyboardType ? keyboardType : "default"}
          keyboardAppearance={theme === "dark" ? "dark" : "light"}
          defaultValue={defaultValue}
          style={stylesheet.input}
          placeholder={placeholder}
          placeholderTextColor={colors.secondaryText}
          value={value}
          secureTextEntry={securedPassword}
          onChangeText={onChange}
          inputMode={inputMode}
          multiline={multiline}
          numberOfLines={multilines}
        />
        {/* right icon */}
        {isPassword ? (
          <TouchableOpacity
            onPress={() => setSecuredPassword((oldPassword) => !oldPassword)}
          >
            {renderPasswordVisibilityIcon()}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => (rightIconOnPress ? rightIconOnPress() : null)}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {helperTextLeft || helperTextRight || emailError ? (
        <View style={stylesheet.helperRow}>
          <Text style={stylesheet.helpText}>
            {emailError ? t("common.enterValidEmail") : helperTextLeft}
          </Text>
          <TouchableOpacity onPress={onPressHelperRight}>
            <Text style={stylesheet.helpText}>{helperTextRight}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default Input;
