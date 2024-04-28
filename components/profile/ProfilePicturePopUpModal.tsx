import { StyleSheet, Image } from "react-native";
import React from "react";
import Modal from "react-native-modal";

interface ProfilePicturePopUpModalProps {
  picture_url: string;
  closeModal: () => void;
  visible: boolean;
}

const ProfilePicturePopUpModal: React.FC<ProfilePicturePopUpModalProps> = ({
  picture_url,
  closeModal,
  visible,
}) => {
  return (
    <Modal
      propagateSwipe={true}
      swipeDirection="down"
      isVisible={visible}
      animationIn="fadeInDownBig"
      animationOut="fadeOutUpBig"
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
      onBackdropPress={closeModal}
      backdropOpacity={0.85}
    >
      <Image
        width={300}
        style={{ borderRadius: 30000 }}
        resizeMode="contain"
        height={300}
        source={{ uri: picture_url }}
      />
    </Modal>
  );
};

export default ProfilePicturePopUpModal;

const styles = StyleSheet.create({});