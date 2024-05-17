import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import TickIcon from "@/icons/TickIcon";
import Toast, { ToastProps, ToastType } from "react-native-toast-message";

interface ToastMessageProps {
  type: ToastType;
  text1: string;
  text2?: string;
  icon?: ReactNode;
}

const ToastMessage: React.FC<ToastMessageProps> = ({
  type,
  text1,
  text2,
  icon,
}) => {
  const toastConfig = {
    success: (props: ToastProps) => (
      <SuccessToast text1={text1} text2={text2} icon={icon} />
    ),
  };

  return (
    <View style={{ zIndex: 999999 }}>
      <Toast type={type} config={toastConfig} position="top" topOffset={80} />
    </View>
  );
};

const SuccessToast: React.FC<{
  text1: string;
  text2?: string;
  icon?: ReactNode;
}> = ({ text1, text2, icon }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    toast: {
      borderRadius: 8,
      backgroundColor: "#242C32",
      alignSelf: "center",
      minWidth: 300,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      paddingHorizontal: 16,
      paddingVertical: 12,
      gap: 16,
    },
    toastHeading: {
      fontSize: 18,
      fontFamily: "RobotoBold",
      letterSpacing: 0.41,
      lineHeight: 22,
      color: colors.white,
    },
    subheading: {
      fontSize: 14,
      fontFamily: "RobotoRegular",
      letterSpacing: -0.08,
      lineHeight: 18,
      color: colors.secondaryText,
    },
  });
  return (
    <View style={styles.toast}>
      {icon}
      <View>
        <Text style={styles.toastHeading}>{text1}</Text>
        <Text style={styles.subheading}>{text2}</Text>
      </View>
    </View>
  );
};

export default ToastMessage;
