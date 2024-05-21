import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import Screen from "@/components/common/Screen";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Button from "@/components/common/Button";
import { router } from "expo-router";

const AccountVerification: React.FC = () => {
  const { colors, theme } = useTheme();
  const [code, setCode] = useState<string>("");
  const { isVerified, onConfirmAccount, email, onResendVerificationCode } =
    useAuth();
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  // TODO: when the user is not verified and logs in send a new code every time
  const mutation = async (confirmationCode: string): Promise<void> => {
    if (onConfirmAccount) {
      return await onConfirmAccount(confirmationCode);
    }
    return Promise.reject(
      new Error("onConfirmAccount function is not provided")
    );
  };
  console.log('email', email)
  const { mutate, isPending } = useMutation({
    mutationFn: (code: string) => mutation(code),
    onSuccess: () => {
      router.replace("/profile-setup");
    },
    onError: (error) => console.log(error),
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    }

    if (timer === 0) {
      setIsTimerRunning(false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isTimerRunning, timer]);
  useEffect(() => {
    if (onResendVerificationCode) {
      onResendVerificationCode();
    }
  }, []);
  const handleResentCode = () => {
    setTimer(60);
    setIsTimerRunning(true);
    if (onResendVerificationCode) {
      onResendVerificationCode();
    }
  };

  const styles = StyleSheet.create({
    heading: {
      fontFamily: "IntegralRegular",
      fontSize: 24,
      color: colors.primaryText,
    },
    helperText: {
      fontSize: 14,
      fontFamily: "RobotoRegular",
      color: colors.helperText,
    },
  });

  return (
    <Screen>
      <View style={{ flex: 1, marginTop: 15, paddingHorizontal: 20 }}>
        <View style={{ marginTop: 0 }}>
          <Text style={styles.helperText}>
            Enter the verification code we sent to email:{" "}
          </Text>
          <Text style={styles.helperText}>{email}</Text>
        </View>
        <View>
          <OTPInputView
            pinCount={5}
            code={code}
            keyboardAppearance={(theme as "light") || "dark"}
            codeInputHighlightStyle={{
              borderBottomColor: colors.button,
            }}
            onCodeChanged={(code) => {
              setCode(code);
            }}
            codeInputFieldStyle={{
              borderWidth: 0,
              color: colors.primaryText,
              borderBottomWidth: 2,
            }}
            onCodeFilled={(code) => {
              mutate(code);
            }}
            style={{
              width: "100%",
              height: 200,
              justifyContent: "center",
            }}
          />
        </View>
        {isPending ? (
          <ActivityIndicator />
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 18, color: colors.helperText }}>
              {isTimerRunning ? (
                <Text style={{ color: colors.button }}>
                  You can send another code in {timer}s
                </Text>
              ) : (
                `Did not get the code? `
              )}
            </Text>
            {!isTimerRunning && (
              <Button
                type="text"
                text="Resend code"
                onPress={() => handleResentCode()}
              />
            )}
          </View>
        )}
      </View>
    </Screen>
  );
};

export default AccountVerification;
