import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useProfileSetup from "@/hooks/service/useProfileSetup";
import {
  checkForEmptyValuesInObject,
  generateHeightArray,
  generateWeightArray,
} from "@/utils/helperFn";
import SetupScreenHeader from "@/components/profile/setup/SetupScreenHeader";
import Screen from "@/components/common/Screen";
import PickerSelect from "@/components/common/PickerSelect";
import SetupScreenFooterBtns from "@/components/profile/setup/SetupScreenFooter";
import { router } from "expo-router";

const MeasuresSetup: React.FC = () => {
  const [data, setData] = useState<{ height: string; weight: string }>({
    height: "",
    weight: "",
  });

  const { mutate, isPending } = useProfileSetup({
    url: "health/measures/edit/",
    onSuccessFn: () => router.push('/profile-setup/gender'),
  });

  const emptyFields = checkForEmptyValuesInObject(data);

  const heights = generateHeightArray();
  const pickerHeightItems = heights.map((height) => ({
    value: String(height.centimeters),
    label: `${String(height.centimeters)} cm`,
  }));

  const weights = generateWeightArray();
  const pickerWeightItems = weights.map((weight) => ({
    value: String(weight.kilograms),
    label: `${String(weight.kilograms)} kg`,
  }));

  return (
    <Screen>
      <SetupScreenHeader
        header="Profile info"
        subheader="Your profile info helps us calculate your needed macro nutrients and give you the best workouts. To choose who see this info, go to setting in your Account > Social & Sharing > Privacy. "
      />

      <View style={{ gap: 16, marginTop: 50 }}>
        <PickerSelect
          value={data.height ? `${data.height}cm` : ""}
          onChange={(value: string) =>
            setData((oldData) => ({
              ...oldData,
              height: value,
            }))
          }
          label="Height"
          items={pickerHeightItems}
        />
        <PickerSelect
          value={data.weight ? `${data.weight}kg` : ""}
          onChange={(value: string) =>
            setData((oldData) => ({
              ...oldData,
              weight: value,
            }))
          }
          label="Weight"
          items={pickerWeightItems}
        />
      </View>

      <SetupScreenFooterBtns
        disabledSubmit={emptyFields}
        pendingSubmit={isPending}
        submitFn={() => mutate(data)}
      />
    </Screen>
  );
};

export default MeasuresSetup;

const styles = StyleSheet.create({});
