import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import Screen from "../../components/common/Screen";
// import useKeyboard from "../../hooks/useKeyboard";
import { useTheme } from "../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import AuthStackHeader from "@/components/auth/AuthStackHeader";
import { RegisterBody } from "@/types/authTypes";
import RegisterForm from "@/components/auth/RegisterForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";

const Register: React.FC = () => {
  //   const keyboardVisible = useKeyboard();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { onRegister } = useAuth();
  const [errors, setErrors] = useState({ email: "", username: "" });

  const mutationRegister = async (data: RegisterBody): Promise<any> => {
    if (onRegister) {
      return await onRegister(data);
    } else {
      return Promise.reject();
    }
  };
  const { mutate, isPending, error } = useMutation({
    mutationFn: mutationRegister,
    onSuccess: () => {
      router.replace('/profile-setup/')
    },
  });
  useEffect(() => {
    setErrors((oldErrors) => ({
      ...oldErrors,
      ...error,
    }));
  }, [error]);

  const styles = StyleSheet.create({
    section: {
      flex: 1,
      justifyContent: "space-around",
      fontFamily: "RobotoRegular",
    },
    title: {
      fontSize: 18,
      color: colors.primaryText,
      fontFamily: "IntegralRegular",
    },
    subtitle: {
      fontSize: 14,
      color: colors.primaryText,
      fontFamily: "RobotoRegular",
    },
  });
  return (
    <Screen closeKeyboardOnClick={true}>
      <KeyboardAwareScrollView
      automaticallyAdjustContentInsets

        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Text>{error?.message}</Text>
        {/* <View style={{ gap: 8 }}>
          <Text style={styles.title}>{t("screens.register.headerText")}</Text>
          <Text style={styles.subtitle}>
            {t("screens.register.subHeaderText")}
          </Text>
        </View> */}

        <View style={styles.section}>
          <RegisterForm mutate={mutate} isPending={isPending} errors={errors} />
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};
export default Register;
