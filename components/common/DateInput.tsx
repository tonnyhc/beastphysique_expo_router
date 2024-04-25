import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import ChevronDown from "@/icons/ChevronDown";
import DatePicker from "@react-native-community/datetimepicker";

interface DateInputProps {
  label: string;
  value: Date;
  onChange: (value: Date) => void;
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange, label }) => {
  const { colors } = useTheme();
  const dateRef = useRef();
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
      minWidth: 64,
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
    <TouchableOpacity onPress={() => {}} style={styles.wrapper}>
      <Text style={styles.labelText}>{label}</Text>
      <View style={{ opacity: 0, position: "absolute" }}>
        <DatePicker
          mode="date"
          maximumDate={new Date()}
          value={value}
          onChange={(event: any, value: Date) => onChange(value)}
        />
      </View>

      <View style={styles.rightWrapper}>
        <View style={styles.selectWrapper}>
          <Text style={styles.selectText}>
            {value.toDateString().slice(3)}
          </Text>
        </View>
        <ChevronDown size={24} color={colors.primaryText} />
      </View>
    </TouchableOpacity>
  );
};

export default DateInput;