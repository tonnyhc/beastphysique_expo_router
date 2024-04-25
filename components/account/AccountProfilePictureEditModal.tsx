import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import Modal from "react-native-modal";

import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";
import GalleryIcon from "@/icons/GaleryIcon";
import TrashIcon from "@/icons/TrashIcon";
import CameraIcon from "@/icons/CameraIcon";
import useProfileServices from "@/hooks/service/useProfileServices";
interface AccountProfilePictureEditModalProps {
  visible: boolean;
  closeModal: () => void;
  onSuccessEdit: () => void;
}

const AccountProfilePictureEditModal: React.FC<
  AccountProfilePictureEditModalProps
> = ({ visible, closeModal, onSuccessEdit }) => {
  const { t } = useTranslation();
  const [newPicture, setNewPicture] = useState<string>("");
  const { updateProfilePicture, deleteProfilePicture } = useProfileServices();
  const { colors } = useTheme();
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [3, 1],
      quality: 1,
      //   mediaTypes: "Photos",
    });
    if (!result.canceled) {
      const image = result.assets[0];
      const imageUri =
        Platform.OS === "ios" ? image.uri.replace("file://", "") : image.uri;
      setNewPicture(imageUri);
      // mutate();
    }
  };

  useEffect(() => {
    if (!newPicture || newPicture == "") {
      return;
    }
    mutate();
  }, [newPicture]);

  const openCamera = async () => {
    requestPermission();
    if (!status?.granted) {
      requestPermission();
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [3, 1],
      quality: 1,
      //   mediaTypes: "Photos",
    });
    if (!result.canceled) {
      const image = result.assets[0];
      const imageUri =
        Platform.OS === "ios" ? image.uri.replace("file://", "") : image.uri;
      setNewPicture(imageUri);
      mutate();
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      const formData = new FormData();
      formData.append("profile_picture", {
        uri: newPicture,
        name: "profile_picture",
        type: "image/jpeg",
      });
      console.log(formData);
      return updateProfilePicture(formData);
    },
    mutationKey: ["profile-picture-edit"],
    onSuccess: () => {
      closeModal();
      onSuccessEdit();
    },
  });

  const { mutate: mutateDelete, isPending: pendingDelete } = useMutation({
    mutationFn: () => deleteProfilePicture(),
    mutationKey: ["delete-profile-pic"],
    onSuccess: () => {
      closeModal();
      onSuccessEdit();
    },
  });

  const styles = StyleSheet.create({
    modal: {
      justifyContent: "flex-end",
      margin: 0,
    },
    modalWrapper: {
      flex: 0.35,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
      backgroundColor: colors.bg,
    },
    modalHeader: {
      paddingVertical: 20,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.secondaryText,
    },
    modalBody: {
      paddingHorizontal: 18,
      paddingTop: 20,
      marginBottom: 50,
      flexGrow: 1,
      flex: 1,
      gap: 16,
    },
    helperText: {
      color: colors.secondaryText,
      textAlign: "center",
      fontSize: 16,
      fontFamily: "RobotoRegular",
    },
    property: {
      flexDirection: "row",
      gap: 12,
      alignItems: "center",
    },
    propertyText: {
      fontSize: 18,
      fontFamily: "RobotoRegular",
      color: colors.primaryText,
    },
    deleteText: {
      color: colors.error,
    },
  });
  return (
    <Modal
      propagateSwipe={true}
      swipeDirection="down"
      isVisible={visible}
      animationIn="slideInUp"
      style={styles.modal}
      onSwipeComplete={() => closeModal()}
      onBackdropPress={() => closeModal()}
    >
      <View style={styles.modalWrapper}>
        <View style={styles.modalHeader}>
          <Text style={styles.helperText}>
            {t("screens.account.profile_picture_visibility")}
          </Text>
        </View>
        <View style={styles.modalBody}>
          <TouchableOpacity
            onPress={() => pickImageAsync()}
            style={styles.property}
          >
            <GalleryIcon size={34} scale={1.2} color={colors.primaryText} />
            <Text style={styles.propertyText}>
              {t("screens.account.choose_from_library")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openCamera()}
            style={styles.property}
          >
            <CameraIcon size={34} scale={1.2} color={colors.primaryText} />
            <Text style={styles.propertyText}>
              {t("screens.account.take_photo")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => mutateDelete()}
            style={styles.property}
          >
            <TrashIcon size={34} scale={1.2} color={colors.error} />
            <Text style={[styles.propertyText, styles.deleteText]}>
              {t("screens.account.remove_photo")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AccountProfilePictureEditModal;

const styles = StyleSheet.create({});
