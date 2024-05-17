import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { checkForEmptyValuesInObject } from "@/utils/helperFn";
import Screen from "@/components/common/Screen";
import Input from "@/components/common/Input";
import SelectMuscleGroupChip from "@/components/create-exercise/SelectMuscleGroupChip";
import FAB from "@/components/common/FAB";
import PlusIcon from "@/icons/PlusIcon";
import SelectMuscleGroupsModal from "@/components/create-exercise/SelectMuscleGroupsModal";
import { useCreateExercise } from "@/contexts/CreateExerciseContext";
import BouncyCheckbox from "react-native-bouncy-checkbox/build/dist/BouncyCheckbox";
import Button from "@/components/common/Button";
import ChevronRight from "@/icons/ChevronRight";
import { router, useLocalSearchParams } from "expo-router";
import { t } from "i18next";

const CreateExerciseBaseScreen: React.FC = () => {
  const { colors } = useTheme();
  const { exerciseData, changeFieldValue, addMuscleGroup } =
    useCreateExercise();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const checkboxRef = useRef(null);
  const emptyValues = checkForEmptyValuesInObject({
    name: exerciseData.name,
    targeted_muscle_groups: exerciseData.targeted_muscle_groups,
  });
  const styles = StyleSheet.create({
    screenWrapper: {
      flexGrow: 1,
      justifyContent: "space-between",
      paddingBottom: 20,
    },
    bodyweightWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
    },

    form: {
      gap: 20,
      marginTop: 10,
    },

    muscleGroupsWrapper: {
      flexWrap: "wrap",
      flexDirection: "row",
      gap: 10,
      justifyContent:
        exerciseData.targeted_muscle_groups.length == 0
          ? "center"
          : "flex-start",
    },

    formRow: {
      gap: 23,
      borderBottomWidth: 0.5,
      borderColor: colors.helperText,
      paddingBottom: 18,
    },

    labelText: {
      fontFamily: "RobotoRegular",
      color: colors.primaryText,
      fontSize: 20,
      marginLeft: 0,
    },
  });

  return (
    <Screen closeKeyboardOnClick={true}>
      <SelectMuscleGroupsModal
        exerciseMuscleGroups={exerciseData.targeted_muscle_groups}
        addMuscleGroup={addMuscleGroup}
        closeModal={() => setModalVisible(false)}
        isVisible={modalVisible}
      />
      <View style={styles.screenWrapper}>
        <View style={styles.form}>
          {/* exercise name */}
          <View style={styles.formRow}>
            <Input
              label={t('common.name')}
              labelStyles={styles.labelText}
              value={exerciseData.name}
              onChange={(value: string) => changeFieldValue(value, "name")}
              placeholder="Exercise name"
            />
          </View>

          {/* Targeted muscle groups */}
          <View style={styles.formRow}>
            <Text style={styles.labelText}>{t('screens.create_exercise.targeted_muscle_groups')}</Text>
            <View style={styles.muscleGroupsWrapper}>
              {exerciseData.targeted_muscle_groups.map((item, index) => (
                <SelectMuscleGroupChip
                  remove={() => addMuscleGroup(item)}
                  name={item.name}
                  key={index}
                />
              ))}
              {/* add muscle group button */}
              <View style={{ width: 45, height: 45 }}>
                <FAB
                  onPress={() => setModalVisible(true)}
                  icon={<PlusIcon size={20} color={colors.white} />}
                />
              </View>
            </View>
          </View>

          {/* bodyweight checkbox */}
          <View style={styles.formRow}>
            <View style={styles.bodyweightWrapper}>
              <Text style={styles.labelText}>{t('screens.create_exercise.can_be_bw')}</Text>
              <BouncyCheckbox
                ref={checkboxRef}
                size={26}
                fillColor={colors.button}
                isChecked={exerciseData.bodyweight}
                onPress={(value: boolean) =>
                  changeFieldValue(value, "bodyweight")
                }
              />
            </View>
          </View>
        </View>

        <View>
          <Button
            text={t('common.continue')}
            disabled={
              emptyValues || exerciseData.targeted_muscle_groups.length == 0
            }
            rightIcon={<ChevronRight size={22} color={colors.white} />}
            onPress={() => router.push("/create-exercise/publish")}
          />
        </View>
      </View>
    </Screen>
  );
};

export default CreateExerciseBaseScreen;
