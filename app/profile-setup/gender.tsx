import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import GenderSelect from "../../components/profile/setup/GenderSelect";
import Screen from "../../components/common/Screen";
import useProfileSetup from "@/hooks/service/useProfileSetup";
import SetupScreenHeader from "@/components/profile/setup/SetupScreenHeader";
import SetupScreenFooterBtns from "@/components/profile/setup/SetupScreenFooter";
import { router } from "expo-router";

const GenderSetupScreen: React.FC = () => {
  const [gender, setGender] = useState<"Man" | "Woman">("Man");
  const { mutate, isPending } = useProfileSetup({
    url: "profile/setup/gender/",
    onSuccessFn: () => router.push('/profile-setup/age'),
  });
  const styles = StyleSheet.create({
    wrapper: {
      marginTop: 20,
      flex: 1,
    },
  });

  return (
    <Screen>
      <View style={styles.wrapper}>
        <View style={{ flex: 1 }}>
          <SetupScreenHeader
            header="What is your gender?"
            subheader="We ask for your gender so we can calculate your needed macros, and give you the best workouts for you."
          />
        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <GenderSelect
            gender={gender}
            onChange={(value: "Man" | "Woman") => setGender(value)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <SetupScreenFooterBtns
            pendingSubmit={isPending}
            submitFn={() => mutate(gender)}
          />
        </View>
      </View>
    </Screen>
  );
};

export default GenderSetupScreen;
