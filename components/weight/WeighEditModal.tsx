import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";

import Modal from "react-native-modal";
import WeightCard from "./WeightCard";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";
import useMeasuresServices from "@/hooks/service/useMeasureServices";
import CloseIcon from "@/icons/CloseIcon";
import TickIcon from "@/icons/TickIcon";

interface WeightEditModalProps {
  isVisible: boolean;
  closeModal: () => void;
  weight: string;
}

const WeightEditModal: React.FC<WeightEditModalProps> = ({
  isVisible,
  closeModal,
  weight,
}) => {
  const { colors } = useTheme();
  const {t} = useTranslation();
  const { updateMeasures } = useMeasuresServices();
  const [inputWeight, setInputWeight] = useState<string>("");
  useEffect(() => {
    setInputWeight(weight);
  }, [weight]);

  const { mutate, isPending } = useMutation({
    mutationFn: () => updateMeasures({ weight: Number(inputWeight) }),
    mutationKey: ["update-weight"],
    onSuccess: () => {
      closeModal();
      navigation.replace("WeightSettings");
    },
  });

  const onChangeWeight = (value: string) => {
    if (!inputWeight.toString().includes(".")) {
      value = value.replace(",", ".");
    } else {
      value = value.replace(",", "");
    }
    setInputWeight(value);
  };
  const styles = StyleSheet.create({
    modal: {
      justifyContent: "flex-end",
      margin: 0,
    },
    modalWrapper: {
      flex: 0.7,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
      backgroundColor: colors.bg,
    },
    modalHeader: {
      zIndex: 1000,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 24,
      paddingVertical: 14,
    },
    title: {
      fontSize: 20,
      fontFamily: "RobotoMedium",
      color: colors.primaryText,
    },
    modalBody: {
      paddingHorizontal: 18,
      marginBottom: 50,
      flexGrow: 1,
      flex: 1,
    },
  });

  return (
    <Modal
      propagateSwipe={true}
      swipeDirection="down"
      isVisible={isVisible}
      animationIn="slideInUp"
      style={styles.modal}
      onSwipeComplete={() => closeModal()}
      avoidKeyboard
      onBackdropPress={() => closeModal()}
    >
      <View style={styles.modalWrapper}>
        <View style={styles.modalHeader}>
          <TouchableOpacity
            style={{ width: 32, height: 32 }}
            onPress={() => closeModal()}
          >
            <CloseIcon scale={1.3} size={32} color={colors.primaryText} />
          </TouchableOpacity>
          <Text style={styles.title}>{t('screens.weight.editWeight')}</Text>
          <TouchableOpacity onPress={() => mutate()}>
            <TickIcon scale={1.3} size={32} color={colors.primaryText} />
          </TouchableOpacity>
        </View>
        <View style={styles.modalBody}>
          <WeightCard
            onChangeWeight={onChangeWeight}
            helper_text={t('screens.weight.weighIn')}
            weight={inputWeight}
          />
        </View>
      </View>
    </Modal>
  );
};

export default WeightEditModal;

const styles = StyleSheet.create({});