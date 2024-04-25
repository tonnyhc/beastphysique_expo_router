import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";
import ArrowUp from "@/icons/ArrowUp";
import ArrowDown from "@/icons/ArrowDown";

type Log = {
  weight: number;
  date: string;
};

interface WeightLogsProps {
  logs: Log[];
}

const WeightLogs: React.FC<WeightLogsProps> = ({ logs }) => {
  const {t} = useTranslation()
  const { colors } = useTheme();

  const renderArrow = (log: Log, oldLog: Log, index: number) => {

    if (log.weight > oldLog.weight) {
      return <ArrowUp size={24} color={colors.error} scale={1} />;
    } else if (log.weight < oldLog.weight) {
      return <ArrowDown size={24} color={colors.green} scale={1} />;
    }
    return <View style={{ width: 24 }} />;
  };

  const styles = StyleSheet.create({
    header: {
      fontSize: 18,
      fontFamily: "RobotoMedium",
      color: colors.primaryText,
      marginBottom: 10,
    },
    log: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 0.5,
      borderBottomColor: colors.secondaryText,
      padding: 10,
    },
    logDate: {
      fontFamily: "RobotoMedium",
      fontSize: 16,
      color: colors.secondaryText,
    },
    logValue: {
      fontSize: 16,
      fontFamily: "RobotoMedium",
      color: colors.primaryText,
    },
    valueWrapper: {
      flexDirection: "row",
      gap: 20,
    },
  });

  return (
    <View>
      <Text style={styles.header}>{t("screens.weight.logs")}</Text>
      {logs.map((log, index) => (
        <View style={styles.log}>
          <Text style={styles.logDate}>{log.date}</Text>
          <View style={styles.valueWrapper}>
            <Text style={styles.logValue}>{log.weight.toFixed(1)} kg</Text>
            <View>
              {renderArrow(log, logs[index > 0 ? index - 1 : index], index)}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default WeightLogs;