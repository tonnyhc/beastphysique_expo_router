import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import useProfileServices from "@/hooks/service/useProfileServices";
import { router } from "expo-router";
import Screen from "@/components/common/Screen";
import Button from "@/components/common/Button";
import DateInput from "@/components/common/DateInput";

const BirthdayAccountSettingsScreen: React.FC = () => {
  const {t} = useTranslation();
  const { fetchBirthday, updateBirthday } = useProfileServices();
  const [birthday, setBirthday] = useState<Date>(new Date());
  const { data: queryData, isLoading } = useQuery({
    queryFn: fetchBirthday,
    queryKey: ["profile-birthday"],
    initialData: { birthday: new Date() },
  });
  const {
    mutate,
    data: mutateData,
    isPending,
  } = useMutation({
    mutationFn: () => {
      const year = birthday.getFullYear();
      const month = birthday.getMonth() + 1;
      const day = birthday.getDate();
      const newBirthday = `${year}-${month}-${day}`;
      return updateBirthday(newBirthday);
    },
    mutationKey: ["profile-birthday"],
    onSuccess: () => router.replace("/account"),
  });
  useEffect(() => {
    const date = new Date(queryData.birthday);

    setBirthday(date);
  }, [queryData]);
  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <DateInput
          value={birthday}
          label={t("common.birthday")}
          onChange={(value) => setBirthday(value)}
        />
        <View style={{ marginTop: 150 }}>
          <Button
            text={t('common.done')}
            // disabled={disabledSubmit}
            onPress={() => mutate()}
            loading={isPending}
          />
        </View>
      </View>
    </Screen>
  );
};

export default BirthdayAccountSettingsScreen;