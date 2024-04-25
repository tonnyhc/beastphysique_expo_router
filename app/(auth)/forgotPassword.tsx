import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import EmailIcon from "../../icons/EmailIcon";
import Button from "../../components/common/Button";
import { useTranslation } from "react-i18next";
import Screen from "@/components/common/Screen";
import { useTheme } from "@/contexts/ThemeContext";
import { emailValidator } from "@/utils/formValidators";
import Input from "@/components/common/Input";
import { useForgottenPassword } from "@/contexts/ForgottenPasswordContext";



const ForgotPassword: React.FC = () => {
  const { email, setEmail, sentEmail } = useForgottenPassword();
  const { colors } = useTheme();
  const [error, setError] = useState<string>("");
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);

  const { t } = useTranslation();

  useEffect(() => {
    const isEmailValid = emailValidator(email);
    setDisabledBtn(!isEmailValid);
  }, [email]);

  const { mutate, isPending } = useMutation({
    mutationFn: sentEmail,
    onSuccess: () => {
      setError("");
    //   navigation.navigate("ForgottenPasswordVerification");
    },
    onError: (error: string) => setError(error),
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "transparent" }}
    >
      <Screen closeKeyboardOnClick={true}>
        {/* <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <BackButton onPress={() => navigation.goBack()} />
          <Text
            style={{
              color: colors.primaryText,
              fontSize: 20,
              lineHeight: 36,
              fontFamily: "IntegralRegular",
            }}
          >
            {t("screens.forgotPass.headerTitle")}
          </Text>
        </View> */}
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
      </Screen>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;