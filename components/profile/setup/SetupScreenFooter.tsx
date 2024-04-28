import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import Button from "@/components/common/Button";
import ChevronRight from "@/icons/ChevronRight";

interface SetupScreenFooterBtnsProps {
  submitFn: () => void;
  disabledSubmit?: boolean;
  pendingSubmit: boolean;
}

const SetupScreenFooterBtns: React.FC<SetupScreenFooterBtnsProps> = ({
  submitFn,
  disabledSubmit,
  pendingSubmit,
}) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    buttonWrapper: {
      flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20
    },
    buttons: {
      flexDirection: "row",
      gap: 60,
      justifyContent: "center",
    },
  });
  return (
    <View style={styles.buttonWrapper}>
      <View style={styles.buttons}>
        <Button
          text="Skip"
          type="text"

          onPress={() => {}}
        />
        <Button
          text="Save and continue"

          loading={pendingSubmit}
          disabled={disabledSubmit}
          onPress={submitFn}
          leftIcon={<ChevronRight size={24} color={colors.white} />}
        />
      </View>
    </View>
  );
};

export default SetupScreenFooterBtns;