import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import useProfileSetup from "@/hooks/service/useProfileSetup";
import Screen from "@/components/common/Screen";
import SetupScreenHeader from "@/components/profile/setup/SetupScreenHeader";
import Input from "@/components/common/Input";
import SetupScreenFooterBtns from "@/components/profile/setup/SetupScreenFooter";
import { useHeaderHeight } from "@react-navigation/elements";
import { router } from "expo-router";

const NameScreen: React.FC = () => {
  const { colors } = useTheme();
  const [fullName, setFullName] = useState<string>("");
  const styles = StyleSheet.create({
    wrapper: {
      marginTop: 20,
      justifyContent: "space-between",
      flex: 1,
    },
    inputWrapper: {
      marginTop: 30,
    },
  });

  const { mutate, isPending } = useProfileSetup({
    url: "profile/setup/full-name/",
    onSuccessFn: () => router.push('/profile-setup/measures'),
  });

  return (
    <>
      <Screen closeKeyboardOnClick={true}>
        <KeyboardAvoidingView
        keyboardVerticalOffset={useHeaderHeight()}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.wrapper}
        >
          <View>
            <SetupScreenHeader
              header="Set up your profile info"
              subheader="Tell us your name"
            />
            <View style={styles.inputWrapper}>
              <Input
                value={fullName}
                onChange={(value: string) => setFullName(value)}
                placeholder="John Doe"
              />
            </View>
          </View>

          <SetupScreenFooterBtns
            submitFn={() => mutate(fullName)}
            pendingSubmit={isPending}
            disabledSubmit={fullName.length <= 1}
          />
        </KeyboardAvoidingView>
      </Screen>
    </>
  );
};

export default NameScreen;
