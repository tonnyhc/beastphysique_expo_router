import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useHeaderHeight } from "@react-navigation/elements";

import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  samePasswordValidator,
  strenghtPasswordValidator,
} from "@/utils/formValidators";
import Screen from "@/components/common/Screen";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { router } from "expo-router";

const ChangePasswordScreen: React.FC = () => {
  const { t } = useTranslation();
  const { changePassword } = useAuth();
  const headerHeight = useHeaderHeight();
  const { colors } = useTheme();

  const [passwords, setPasswords] = useState({
    password: "",
    new_password: "",
    re_new_password: "",
  });

  const [newPasswordError, setNewPasswordError] = useState<boolean>(false);
  const [repassError, setRePassError] = useState<boolean>(false);

  const { mutate, isPending, error, isError, data } = useMutation({
    mutationFn: () =>
      changePassword(passwords.password, passwords.new_password),
    mutationKey: ["change-password"],
    onSuccess: () => router.back(),
  });

  const checkFieldsForDisablingButton = () => {
    if (repassError || newPasswordError) {
      return true;
    }
    for (let key in passwords) {
      if (passwords[key] === "") {
        return true; // If any password is empty, return true
      }
    }
  };

  useEffect(() => {
    const new_password = passwords.new_password;
    const weakPassword = strenghtPasswordValidator(new_password);
    if (!weakPassword && new_password !== "") {
      setNewPasswordError(true);
    } else {
      setNewPasswordError(false);
    }
  }, [passwords.new_password]);
  useEffect(() => {
    const new_pass = passwords.new_password;
    const re_pass = passwords.re_new_password;
    const differentPassword = samePasswordValidator(new_pass, re_pass);
    if (differentPassword && re_pass !== "") {
      setRePassError(true);
    } else {
      setRePassError(false);
    }
  }, [passwords.re_new_password, passwords.new_password]);

  const styles = StyleSheet.create({
    helperText: {
      fontSize: 16,
      color: colors.secondaryText,
      fontFamily: "RobotoRegular",
    },
    form: {
      gap: 16,
      paddingVertical: 10,
    },
  });

  return (
    <Screen closeKeyboardOnClick>
      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight - 30}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // contentContainerStyle={{flex: 1}}
        style={{ paddingBottom: 30, flex: 1 }}
      >
        <Text style={styles.helperText}>{t("common.passwordHelperText")}</Text>
        <View style={styles.form}>
          <Input
            error={isError ? (error as unknown as string) : undefined}
            keyboardType="ascii-capable"
            label={t("screens.change_password.current_password")}
            isPassword={true}
            value={passwords.password}
            onChange={(value: string) =>
              setPasswords((oldPass) => ({
                ...oldPass,
                password: value,
              }))
            }
            placeholder=""
          />
          <Input
            keyboardType="ascii-capable"
            error={
              newPasswordError ? "Choose a more securred password" : undefined
            }
            label={t("screens.change_password.new_password")}
            isPassword={true}
            value={passwords.new_password}
            onChange={(value: string) =>
              setPasswords((oldPass) => ({
                ...oldPass,
                new_password: value,
              }))
            }
            placeholder=""
          />
          <Input
            keyboardType="ascii-capable"
            label={t("screens.change_password.re_type_new_password")}
            error={repassError ? "New password does not match." : undefined}
            isPassword={true}
            value={passwords.re_new_password}
            onChange={(value: string) =>
              setPasswords((oldPass) => ({
                ...oldPass,
                re_new_password: value,
              }))
            }
            placeholder=""
          />
        </View>
        <View style={{ flex: 1, marginBottom: 30, justifyContent: "flex-end" }}>
          <Button
            loading={isPending}
            disabled={checkFieldsForDisablingButton()}
            text={t("screens.change_password.change_password")}
            onPress={() => mutate()}
          />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default ChangePasswordScreen;
