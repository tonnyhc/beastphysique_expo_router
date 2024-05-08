import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { useTheme } from "@/contexts/ThemeContext";
import Button from "./Button";
import { router } from "expo-router";

interface DiscardChangesModalProps {
  closeModal: () => void;
  visible: boolean;
  onDiscard: () => void;
}

const DiscardChangesModal: React.FC<DiscardChangesModalProps> = ({
  closeModal,
  visible,
  onDiscard,
}) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    modal: {
      justifyContent: "center",
      width: "auto",
    },
    modalWrapper: {
      borderRadius: 18,
      backgroundColor: colors.bg,
      paddingTop: 20,
    },
    modalBody: {
      gap: 12,
      marginBottom: 29,
    },
    modalFooter: {},
    header: {
      color: colors.primaryText,
      textAlign: "center",
      fontSize: 20,
      fontFamily: "RobotoMedium",
    },
    subheader: {
      fontFamily: "RobotoRegular",
      fontSize: 16,
      color: colors.secondaryText,
      textAlign: "center",
    },
    buttonWrapper: {
      borderTopColor: colors.secondaryText,
      borderTopWidth: 0.5,
    },
  });

  return (
    <Modal
      propagateSwipe={true}
      isVisible={visible}
      animationIn="slideInUp"
      style={styles.modal}
      onSwipeComplete={() => closeModal()}
      onBackdropPress={() => closeModal()}
    >
      <View style={styles.modalWrapper}>
        <View style={styles.modalBody}>
          <Text style={styles.header}>Discard changes?</Text>
          <Text style={styles.subheader}>
            If you go back, changes will be lost.
          </Text>
        </View>
        <View style={styles.modalFooter}>
          <View style={styles.buttonWrapper}>
            <Button
              textStyles={{
                color: colors.error,
                fontSize: 20,
                fontFamily: "RobotoMedium",
              }}
              type="text"
              text="Discard"
              onPress={() => {
                closeModal()
                return onDiscard()
              }}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              textStyles={{
                color: colors.primaryText,
                fontSize: 20,
                fontFamily: "RobotoRegular",
              }}
              type="text"
              text="Keep editing"
              onPress={() => closeModal()}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DiscardChangesModal;
