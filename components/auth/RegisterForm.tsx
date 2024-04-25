import { ReactNode, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import {
  emailValidator,
  samePasswordValidator,
  strenghtPasswordValidator,
} from "../../utils/formValidators";
import Button from "../common/Button";
import UserIcon from "@/icons/UserIcon";
import { useTranslation } from "react-i18next";

import Input from "@/components/common/Input";
import LockIcon from "@/icons/LockIcon";
import EmailIcon from "@/icons/EmailIcon";
import { RegisterBody, RegisterRequestBody } from "@/types/authTypes";
import { Link } from "expo-router";
interface RegisterFormProps {
  mutate: (data: RegisterBody) => Promise<any>;
  isPending: boolean;
  errors: any;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  mutate,
  isPending,
  errors,
}) => {
  const { t } = useTranslation();
  const { theme, colors } = useTheme();
  const [data, setData] = useState<RegisterRequestBody>({
    email: "",
    username: "",
    password: "",
    conf_pass: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({
    username: "",
    email: "",
    password: "",
    conf_pass: "",
  });

  const [disabledSubmit, setDisabledSubmit] = useState(false);
  // button disabled checker
  useEffect(() => {
    const areFieldsFilled = Object.values(data).every((value) => value !== "");
    const areErrors = Object.values(formErrors).some((value) => value !== "");

    if (!areFieldsFilled || areErrors) {
      return setDisabledSubmit(true);
    }
    return setDisabledSubmit(false);
  }, [data, formErrors]);
  useEffect(() => {
    const isValid = strenghtPasswordValidator(data.password);
    if (!isValid && data.password !== "") {
      return setFormErrors((oldErrors) => ({
        ...oldErrors,
        password: "Weak password",
      }));
    }
    return setFormErrors((oldErrors) => ({
      ...oldErrors,
      password: "",
    }));
  }, [data.password]);
  useEffect(() => {
    const error = samePasswordValidator(data.password, data.conf_pass);
    if (data.password === "" && data.conf_pass === "") {
      return;
    }
    if (error) {
      return setFormErrors((oldErrors) => ({
        ...oldErrors,
        conf_pass: "The passwords are not the same",
      }));
    }
    return setFormErrors((oldErrors) => ({
      ...oldErrors,
      conf_pass: "",
      password: "",
    }));
  }, [data.conf_pass]);
  useEffect(() => {
    const isValid = emailValidator(data.email);
    if (!isValid && data.email !== "") {
      return setFormErrors((oldErrors) => ({
        ...oldErrors,
        email: "Invalid email!",
      }));
    }
    return setFormErrors((oldErrors) => ({
      ...oldErrors,
      email: "",
    }));
  }, [data.email]);

  const formFields: {
    label: string;
    leftIcon: ReactNode;
    placeholder: string;
    value: string;
    error: string;
    onChange: (value: string) => void;
    inputMode?: string;
    isPassword?: boolean;
    helperTextLeft?: string;
  }[] = [
    {
      label: t("common.username"),
      leftIcon: <UserIcon size={18} color={colors.secondaryText} />,
      placeholder: "example",
      value: data.username,
      error: formErrors.username || errors.username,
      onChange: (value: string) =>
        setData((oldData) => ({ ...oldData, username: value })),
    },
    {
      label: t("common.email"),
      leftIcon: <EmailIcon size={18} color={colors.secondaryText} />,
      placeholder: "example@example.com",
      value: data.email,
      onChange: (value: string) =>
        setData((oldData) => ({ ...oldData, email: value })),
      error: formErrors.email || errors.email,
      inputMode: "email",
    },
    {
      label: t("common.password"),
      leftIcon: <LockIcon size={18} color={colors.secondaryText} />,
      placeholder: "Enter password",
      isPassword: true,
      value: data.password,
      onChange: (value: string) =>
        setData((oldData) => ({ ...oldData, password: value })),
      error: formErrors.password || errors.password,
      helperTextLeft: t("common.passwordHelperText"),
    },
    {
      label: t("common.confirmPassword"),
      leftIcon: <LockIcon size={18} color={colors.secondaryText} />,
      placeholder: "Confirm password",
      isPassword: true,
      value: data.conf_pass,
      onChange: (value: string) =>
        setData((oldData) => ({ ...oldData, conf_pass: value })),
      error: formErrors.conf_pass,
    },
  ];
  const styles = StyleSheet.create({
    form: {
      justifyContent: "space-between",
    },

    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    helperText: {
      fontSize: 15,
      fontFamily: "RobotoRegular",
    },
  });

  return (
    <View style={styles.form}>
      <View style={{ gap: 64 }}>
        <View style={{ gap: 14 }}>
          {formFields.map((field) => (
            <View key={field.label}>
              <Input
                value={field.value}
                onChange={field.onChange}
                placeholder={field.placeholder}
                leftIcon={field.leftIcon}
                rightIcon={field.rightIcon}
                isPassword={field.isPassword}
                label={field.label}
                error={field.error}
                autoCapitalize="none"
                helperTextLeft={field.helperTextLeft}
                keyboardType="ascii-capable"
                inputMode={field.inputMode ? field.inputMode : "text"}
              />
            </View>
          ))}
        </View>

        <View style={{ gap: 20 }}>
          <Button
            text={t("components.registerForm.submitBtn")}
            onPress={() => mutate(data)}
            disabled={disabledSubmit}
            loading={isPending}
          />
          <Link href="/(auth)/login" asChild>
            <Button
              type="text"
              text={t("components.registerForm.navigateToLogin")}
              onPress={() => {}}
            />
          </Link>
        </View>
      </View>
    </View>
  );
};
export default RegisterForm;
