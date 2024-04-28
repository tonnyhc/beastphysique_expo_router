import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import ChevronDown from "../../icons/ChevronDown";
import RNPickerSelect from "react-native-picker-select";
import { useTranslation } from "react-i18next";

type SelectItem = {
  label: string;
  value: string | number;
};

interface PickerSelectProps {
  label?: string;
  placeholder?: string;
  items?: SelectItem[];
  onChange: (value: any) => void;
  value: string;
}

const PickerSelect: React.FC<PickerSelectProps> = ({
  label,
  placeholder,
  items,
  onChange,
  value,
}) => {
  const { t } = useTranslation();
  const { colors, theme } = useTheme();
  const pickerRef = useRef(null);
  const styles = StyleSheet.create({
    wrapper: {
      borderWidth: 2,
      borderColor: colors.helperText,
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 4,
    },
    labelText: {
      color: colors.helperText,
      fontSize: 16,
    },
    selectWrapper: {
      paddingVertical: 10,
      paddingHorizontal: 8,
      backgroundColor: colors.buttonDisabled,
      borderRadius: 5,
      width: 64,
      justifyContent: "center",
      alignItems: "center",
    },
    rightWrapper: {
      flexDirection: "row",
      gap: 12,
      alignItems: "center",
    },
    selectText: {
      fontSize: 14,
      color: "#021C3D",
    },
  });
  return (
    <TouchableOpacity
      onPress={() => pickerRef.current.togglePicker()}
      style={styles.wrapper}
    >
      <Text style={styles.labelText}>{label}</Text>
      <RNPickerSelect
        doneText={t("common.done")}
        ref={pickerRef}
        placeholder={{
          value: "",
          label: "",
        }}
        onValueChange={(value: any) => onChange(value)}
        items={items}
        darkTheme={theme === "dark"}
        style={{
          inputIOSContainer: {
            display: "none",
          },
          inputAndroidContainer: {
            display: "none",
          },
        }}
      />

      <View style={styles.rightWrapper}>
        <View style={styles.selectWrapper}>
          <Text style={styles.selectText}>
            {value !== "" && value ? value : "Select"}
          </Text>
        </View>
        <ChevronDown size={24} color={colors.primaryText} />
      </View>
    </TouchableOpacity>
  );
};

export default PickerSelect;
