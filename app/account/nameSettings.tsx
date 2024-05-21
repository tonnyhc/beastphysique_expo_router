import {
  ActivityIndicator,
  ActivityIndicatorBase,
  StyleSheet,
  View,
} from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import useProfileServices from "@/hooks/service/useProfileServices";
import Screen from "@/components/common/Screen";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

const NameAccountSettingsScreen: React.FC = () => {
  const { t } = useTranslation();
  const [newName, setNewName] = useState<string>("");
  const { fetchFullName, updateFullName } = useProfileServices();
  const {
    mutate,
    data: mutationData,
    isPending,
  } = useMutation({
    mutationFn: () => updateFullName(newName),
    mutationKey: ["update_full_name"],
    onSuccess: () => router.replace("/account"),
  });
  const { data, isLoading } = useQuery({
    queryFn: fetchFullName,
    queryKey: ["full_name"],
    initialData: {
      full_name: "",
      max_length_full_name: 150,
    },
  });
  useEffect(() => {
    setNewName(data.full_name);
  }, [data]);

  const disabledSubmit = data.full_name === newName;

  return (
    <Screen>
      {isLoading ? <ActivityIndicator /> : null}
      <View style={{ flex: 1 }}>
        <Input
          maxLength={data.max_length_full_name}
          value={newName}
          placeholder="Enter name..."
          label={t("common.name")}
          onChange={(value: string) => setNewName(value)}
          helperTextRight={`${newName.length}/${data.max_length_full_name}`}
        />
        <View style={{ marginTop: 150 }}>
          <Button
            disabled={disabledSubmit}
            text={t("common.done")}
            onPress={() => mutate()}
            loading={isPending}
          />
        </View>
      </View>
    </Screen>
  );
};

export default NameAccountSettingsScreen;

const styles = StyleSheet.create({});
