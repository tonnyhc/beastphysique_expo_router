import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Screen from "@/components/common/Screen";
import { useTheme } from "@/contexts/ThemeContext";
import { emailValidator } from "@/utils/formValidators";
import Input from "@/components/common/Input";
import { useForgottenPassword } from "@/contexts/ForgottenPasswordContext";
import { router } from "expo-router";
import EmailIcon from "@/icons/EmailIcon";
import Button from "@/components/common/Button";
import { useHeaderHeight } from "@react-navigation/elements";

const ForgotPassword: React.FC = () => {
  const { email, setEmail, sentEmail } = useForgottenPassword();
  const { colors } = useTheme();
  const [error, setError] = useState<string>("");
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);
  const headerHeight = useHeaderHeight();
  const { t } = useTranslation();

  useEffect(() => {
    const isEmailValid = emailValidator(email);
    setDisabledBtn(!isEmailValid);
  }, [email]);

  const { mutate, isPending } = useMutation({
    mutationFn: sentEmail,
    onSuccess: () => {
      setError("");
      router.replace("/(auth)/forgotPasswordVerification");
    },
    onError: (error: string) => setError(error),
  });

  return (
    <Screen closeKeyboardOnClick={true}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight + 10}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: "transparent" }}
      >
        <Text
          style={{
            marginTop: 18,
            width: 250,
            fontSize: 16,
            color: colors.primaryText,
            fontFamily: "RobotoRegular",
          }}
        >
          {t("screens.forgotPass.helperText")}
        </Text>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View style={{ marginTop: 47 }}>
            <Input
              autoCapitalize="none"
              keyboardType="ascii-capable"
              value={email}
              inputMode="email"
              placeholder="beast@physique.com"
              onChange={(value: string) => setEmail(value)}
              label={t("common.email")}
              error={error}
              leftIcon={<EmailIcon size={24} color={colors.helperText} />}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Button
              disabled={disabledBtn}
              loading={isPending}
              text={t("screens.forgotPass.submitBtn")}
              onPress={() => mutate()}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default ForgotPassword;
