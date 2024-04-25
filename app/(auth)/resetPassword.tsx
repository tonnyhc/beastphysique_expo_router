import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../components/common/Screen";
import { useTheme } from "../../contexts/ThemeContext";
import { useForgottenPassword } from "../../contexts/ForgottenPasswordContext";
import { useMutation } from "@tanstack/react-query";
import Button from "@/components/common/Button";

import { useTranslation } from "react-i18next";
import Input from "@/components/common/Input";
import LockIcon from "@/icons/LockIcon";
import {
  samePasswordValidator,
  strenghtPasswordValidator,
} from "@/utils/formValidators";
import { useHeaderHeight } from "@react-navigation/elements";
import { router } from "expo-router";

const ResetPassword: React.FC = () => {
  const { colors, theme } = useTheme();
  const [error, setError] = useState<string>("");
  const [formErrors, setFormErrors] = useState<{
    password: string;
    rePass: string;
  }>({
    password: "",
    rePass: "",
  });
  const { password, setPassword, rePass, setRePass, resetPassword } =
    useForgottenPassword();
  const { t } = useTranslation();
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);
  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => router.replace("/(auth)/successPasswordReset"),
    onError: (error: string) => setError(error),
  });

  useEffect(() => {
    const isStrong = strenghtPasswordValidator(password);
    if (!isStrong && password !== "") {
      return setFormErrors((oldErrors) => ({
        ...oldErrors,
        password: t("common.weakPassword"),
      }));
    }
    return setFormErrors((oldErrors) => ({
      ...oldErrors,
      password: "",
    }));
  }, [password]);
  useEffect(() => {
    const arePasswordsDifferent = samePasswordValidator(password, rePass);
    if (arePasswordsDifferent) {
      return setFormErrors((oldErrors) => ({
        ...oldErrors,
        rePass: t("common.passwordsNotMatch"),
      }));
    }
    return setFormErrors((oldErrors) => ({
      ...oldErrors,
      rePass: "",
    }));
  }, [rePass]);
  useEffect(() => {
    const areErrors = Object.values(formErrors).some((value) => value !== "");
    if (password == "" || rePass == "" || areErrors) {
      return setDisabledBtn(true);
    }
    return setDisabledBtn(false);
  }, [password, rePass, formErrors]);
  return (
    <Screen closeKeyboardOnClick>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: "transparent" }}
        keyboardVerticalOffset={useHeaderHeight()}
      >
        <View>
          <Text
            style={{
              marginTop: 18,
              fontSize: 16,
              color: colors.primaryText,
              fontFamily: "RobotoRegular",
            }}
          >
            {t("common.passwordHelperText")}
          </Text>
          <Text
            style={{
              color: colors.error,
              textAlign: "center",
              fontFamily: "RobotoMedium",
              paddingTop: 15,
            }}
          >
            {error}
          </Text>
        </View>
        <Text>{error}</Text>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View style={{ gap: 20 }}>
            <Input
              value={password}
              onChange={setPassword}
              placeholder={t("common.password")}
              label={t("common.newPassword")}
              isPassword={true}
              leftIcon={<LockIcon size={24} color={colors.helperText} />}
              error={formErrors.password}
            />
            <Input
              value={rePass}
              onChange={setRePass}
              placeholder={t("common.confirmPassword")}
              label={t("common.confirmPassword")}
              isPassword={true}
              error={formErrors.rePass}
              leftIcon={<LockIcon size={24} color={colors.helperText} />}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Button
              text={t("common.continue")}
              loading={isPending}
              onPress={() => mutate()}
              disabled={disabledBtn}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default ResetPassword;
