import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Screen from "../../components/common/Screen";
import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";
import Button from "@/components/common/Button";
import { router } from "expo-router";



const SuccessPasswordReset: React.FC = () => {
  const { colors } = useTheme();
  const {t} = useTranslation();
  const styles = StyleSheet.create({
    done: {
      width: 110,
      height: 110,
      backgroundColor: colors.button,
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: colors.button,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 30,
      shadowRadius: 5,
    },
    successText: {
      color: colors.button,
      fontSize: 30,
      marginTop: 30,
      fontWeight: "600",
    },
    helperMessage: {
      color: colors.helperText,
      fontSize: 18,
      textAlign: "center",
      marginTop: 20,
    },
  });

  return (
    <Screen>
      <View style={{ flex: 1, marginTop: 80, justifyContent: 'space-between' }}>
        <View style={{ alignItems: "center", marginBottom: 80 }}>
          <View style={styles.done}>
            <MaterialIcons name="done" size={80} color={colors.white} />
          </View>
          <Text style={styles.successText}>{t('screens.successPasswordReset.success')}</Text>
          <Text style={styles.helperMessage}>
          {t('screens.successPasswordReset.helperText')}
          </Text>
        </View>
        <View style={{marginBottom: 20}}>

        <Button
          text={t("common.done")}
          onPress={() => router.replace('/(auth)/login')}
        />
        </View>

      </View>
    </Screen>
  );
};

export default SuccessPasswordReset;