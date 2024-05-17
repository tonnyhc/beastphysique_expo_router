import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";
import Screen from "@/components/common/Screen";
import TickIcon from "@/icons/TickIcon";

const LanguageSettings: React.FC = () => {
  const { t, i18n } = useTranslation();

  const languageCard: {
    language: string;
    translation: string;
    value: "bg" | "en";
  }[] = [
    {
      language: "English",
      translation: t("languages.en"),
      value: "en",
    },
    {
      language: "Bulgarian",
      translation: t("languages.bg"),
      value: "bg",
    },
  ];

  const { colors } = useTheme();
  const styles = StyleSheet.create({
    selectedLang: {
      borderBottomWidth: 0.5,
      borderTopWidth: 0.5,
      borderColor: colors.secondaryText,
      padding: 10,
    },
    selectedLangText: {
      fontSize: 18,
      fontFamily: "RobotoMedium",
      color: colors.secondaryText,
      textAlign: "center",
    },
    availableLang: {
      fontSize: 18,
      color: colors.primaryText,
      fontFamily: "RobotoMedium",
      padding: 10,
    },
    langCard: {
      paddingVertical: 12,
      paddingHorizontal: 6,
      borderBottomWidth: 0.5,
      borderColor: colors.secondaryText,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    langHeader: {
      fontSize: 20,
      fontFamily: "RobotoMedium",
      color: colors.primaryText,
    },
    langSubheader: {
      fontSize: 16,
      fontFamily: "RobotoRegular",
      color: colors.secondaryText,
    },
    cantFindLang: {
      fontSize: 18,
      color: colors.primaryText,
      fontFamily: "RobotoMedium",
    },
  });

  return (
    <Screen>
      <View style={styles.selectedLang}>
        <Text style={styles.selectedLangText}>
          {t("screens.change_language.current_lang")} : {t("language")}
        </Text>
      </View>
      <View style={{ paddingTop: 10, gap: 10 }}>
        <Text style={styles.availableLang}>
          {t("screens.change_language.available_languages")}
        </Text>
        {/* language card */}
        {languageCard.map((lang, index) => (
          <TouchableOpacity
            key={lang.language + "-" + index}
            onPress={() => i18n.changeLanguage(lang.value)}
            style={styles.langCard}
          >
            <View style={{ gap: 8 }}>
              <Text style={styles.langHeader}>{lang.language}</Text>
              <Text style={styles.langSubheader}>{lang.translation}</Text>
            </View>
            {i18n.language === lang.value ? (
              <TickIcon size={32} scale={1.2} color={colors.button} />
            ) : null}
          </TouchableOpacity>
        ))}
        <View style={{ gap: 12, marginTop: 18 }}>
          <Text style={styles.cantFindLang}>
            {t("screens.change_language.cant_find_language")}
          </Text>
          <Text style={styles.langSubheader}>
            {t("screens.change_language.cant_find_language_helper")}
          </Text>
        </View>
      </View>
    </Screen>
  );
};

export default LanguageSettings;
