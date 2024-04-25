import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import useProfileServices from "@/hooks/service/useProfileServices";
import { router } from "expo-router";
import Screen from "@/components/common/Screen";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

const BioAccountSettingsScreen: React.FC = () => {
  const { t } = useTranslation();
  const { fetchBio, updateBio } = useProfileServices();
  const [newBio, setNewBio] = useState<string>("");

  const { data: queryData, isLoading } = useQuery({
    queryFn: fetchBio,
    queryKey: ["profile-bio"],
    initialData: {
      bio: "",
      max_length_bio: 150,
    },
  });
  const {
    mutate,
    data: mutationData,
    isPending,
  } = useMutation({
    mutationFn: () => updateBio(newBio),
    mutationKey: ["update-bio"],
    onSuccess: () => router.replace("/(account)"),
  });
  useEffect(() => {
    setNewBio(queryData.bio ? queryData.bio : "");
  }, [queryData]);

  const disabledSubmit = newBio === queryData.bio;

  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <Input
          multiline={true}
          value={newBio}
          placeholder="Enter bio..."
          label={t("common.bio")}
          onChange={(value: string) => setNewBio(value)}
          maxLength={queryData.max_length_bio}
          helperTextRight={`${newBio.length}/${queryData.max_length_bio}`}
        />
        <View style={{ marginTop: 150 }}>
          <Button
            text={t("common.done")}
            disabled={disabledSubmit}
            onPress={() => mutate()}
            loading={isPending}
          />
        </View>
      </View>
    </Screen>
  );
};

export default BioAccountSettingsScreen;

const styles = StyleSheet.create({});
