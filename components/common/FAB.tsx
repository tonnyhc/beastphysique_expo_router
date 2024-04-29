
import { useTheme } from "@/contexts/ThemeContext";
import { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface FABProps {
  onPress: () => void;
  testId?: string;
  icon: ReactNode;
  loading?: boolean;
}

const FAB: React.FC<FABProps> = ({ testId, icon, onPress, loading }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: colors.button,
      minWidth: 45,
      minHeight: 45,
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },

    iconWrapper: {
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <TouchableOpacity style={styles.wrapper} testID={testId} onPress={onPress}>
      <View style={styles.iconWrapper}>{icon}</View>
    </TouchableOpacity>
  );
};

export default FAB;
