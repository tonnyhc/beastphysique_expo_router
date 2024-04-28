import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { useTheme } from "@/contexts/ThemeContext";

interface ProfileActionsModalProps {
  visible: boolean;
  closeModal: () => void;
}

const ProfileActionsModal: React.FC<ProfileActionsModalProps> = ({
  visible,
  closeModal,
}) => {
  const { colors } = useTheme();

  const actions: {
    title: string;
    textColor: string;
    onPress: () => void;
  }[] = [
    {
      title: "Block",
      textColor: colors.error,
      onPress: () => {},
    },
    {
      title: "Report",
      textColor: colors.error,
      onPress: () => {},
    },
    {
      title: "About @toni",
      textColor: colors.primaryText,
      onPress: () => {},
    },
    {
      title: "Copy profile url",
      textColor: colors.primaryText,
      onPress: () => {},
    },
    {
      title: "Cancel",
      textColor: colors.primaryText,
      onPress: () => {},
    },
  ];

  const styles = StyleSheet.create({
    modal: {
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      backgroundColor: colors.bg,
      width: "80%",
      borderRadius: 20,
    },
    actionCard: {
      padding: 20,
      alignItems: "center",
      borderBottomWidth: 0.5,
      borderBottomColor: colors.secondaryText,
    },
    actionCardText: {
      fontSize: 20,
      fontFamily: "RobotoRegular",
    },
  });

  return (
    <Modal
      propagateSwipe={true}
      swipeDirection="down"
      isVisible={visible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.modal}
      onBackdropPress={closeModal}
    >
      <View style={styles.content}>
        {actions.map((action) => (
          <TouchableOpacity style={styles.actionCard}>
            <Text style={[styles.actionCardText, { color: action.textColor }]}>
              {action.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};

export default ProfileActionsModal;