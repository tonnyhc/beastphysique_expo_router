import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import useProfileSetup from "@/hooks/service/useProfileSetup";
import Screen from "@/components/common/Screen";
import SetupScreenHeader from "@/components/profile/setup/SetupScreenHeader";
import SetupScreenFooterBtns from "@/components/profile/setup/SetupScreenFooter";
import DateInput from "@/components/common/DateInput";
import { router } from "expo-router";

const AgeSelectScreen: React.FC = () => {
  const [birthDate, setBirthDate] = useState<Date>(new Date());

  const { mutate, isPending } = useProfileSetup({
    url: "profile/setup/birthday/",
    onSuccessFn: () => router.push('/profile-setup/activity'),
  });
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      marginTop: 20,
    },
  });

  return (
    <Screen>
      <View style={styles.wrapper}>
        <SetupScreenHeader
          header="What is your birthdate ?"
          subheader="By providing your age, we can calculate your needed macros."
        />
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <DateInput
          value={birthDate}
          onChange={(value: Date) => setBirthDate(value)}
          label="Birthday"
        />
      </View>
      <View style={{ flex: 1 }}>
        <SetupScreenFooterBtns
          submitFn={() => mutate(birthDate)}
          pendingSubmit={false}
        />
      </View>
    </Screen>
  );
};

export default AgeSelectScreen;
