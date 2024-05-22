import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

import { useTheme } from "../../contexts/ThemeContext";

import Button from "../common/Button";
import { useTranslation } from "react-i18next";
import { LoginBody } from "@/types/authTypes";
import Input from "@/components/common/Input";
import EyeIcon from "@/icons/EyeIcon";
import EmailIcon from "@/icons/EmailIcon";
import LockIcon from "@/icons/LockIcon";
import { Link, router } from "expo-router";

interface LoginFormProps {
  onLogin: (data?: LoginBody) => Promise<any>;
  isPending: boolean;
  loginError: string;
  //   navigation: StackNavigationProp<AuthStackParamList>;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  isPending,
  loginError,
  //   navigation,
}) => {
  const { colors, theme } = useTheme();
  const { t } = useTranslation();
  const [data, setData] = useState<LoginBody>({
    email: "",
    password: "",
  });
  const [disabledSubmit, setDisabledSubmit] = useState<boolean>(false);
  useEffect(() => {
    if (data.email == "" || data.password == "") {
      return setDisabledSubmit(true);
    }
    setDisabledSubmit(false);
  }, [data]);
  if (loginError) {
    console.log("login error", loginError);
  }
  const styles = StyleSheet.create({
    form: {
      flex: 1,
      justifyContent: "space-between",
    },
    inputWrapper: {
      marginBottom: 12,
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.form}>
        <Text
          style={{
            alignSelf: "center",
            lineHeight: 50,
            fontWeight: "600",
            color: "red",
          }}
        >
          {loginError}
        </Text>
        <View style={{ gap: 20 }}>
          <Input
            inputMode="email"
            label={t("common.email")}
            onChange={(value) =>
              setData((oldData) => ({ ...oldData, email: value }))
            }
            leftIcon={<EmailIcon size={24} color={colors.helperText} />}
            placeholder="john@doe.com"
            value={data.email}
            multiline={false}
            
          />
          <View>
            <Input
              inputMode="text"
              value={data.password}
              onChange={(value) =>
                setData((oldData) => ({ ...oldData, password: value }))
              }
              placeholder="Enter password"
              label={t("common.password")}
              isPassword={true}
              leftIcon={<LockIcon size={24} color={colors.helperText} />}
              rightIcon={<EyeIcon size={24} color={colors.helperText} />}
              helperTextRight={t("common.forgotPass")}
              onPressHelperRight={() =>
                router.replace("/(auth)/forgotPassword")
              }
            />
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Button
            disabled={disabledSubmit}
            type="primary"
            text={t("components.loginForm.submitBtn")}
            onPress={() => onLogin(data)}
            loading={isPending}
          />
          <Link href="/(auth)/register" asChild>
            <Button
              type="text"
              text={t("components.loginForm.navigateToRegister")}
              onPress={() => {}}
            />
          </Link>
        </View>
      </View>
    </View>
  );
};

export default LoginForm;
