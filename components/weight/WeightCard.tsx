import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput as RNTextInput,
    View,
    TextInput,
  } from "react-native";
  import React, { RefObject, forwardRef, useRef, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
  
  interface WeightCardProps {
    weight: string;
    helper_text: string;
    onPress?: () => void;
    onChangeWeight?: (value: string) => void;
  }
  
  const WeightCard: React.FC<WeightCardProps> = ({
    weight,
    helper_text,
    onPress,
    onChangeWeight,
  }) => {
    const { colors, theme } = useTheme();
  
    const inputRef = useRef<TextInput>(null);
  
    const onPressWeight = () => {
      if (onPress) {
        return onPress();
      }
      if (inputRef) {
        inputRef.current?.focus();
      }
    };
  
    const styles = StyleSheet.create({
      weightCard: {
        paddingHorizontal: 60,
        paddingVertical: 10,
        backgroundColor: colors.cardBackground,
        borderRadius: 6,
      },
      weighText: {
        fontFamily: "RobotoMedium",
        fontSize: 24,
        color: colors.primaryText,
      },
      lastWeighInText: {
        fontFamily: "RobotoMedium",
        fontSize: 16,
        color: colors.secondaryText,
      },
    });
    return (
      <View>
        <TextInput
          keyboardAppearance={theme === "light" ? "light" : "dark"}
          value={weight}
          onChangeText={(value: string) => {
            if (onChangeWeight) {
              onChangeWeight(value);
            }
          }}
          inputMode="decimal"
          style={{ display: "none" }}
          ref={inputRef}
        />
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity onPress={onPressWeight} style={styles.weightCard}>
            <Text style={styles.weighText}>{Number(weight)}kg</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", paddingVertical: 10 }}>
          <Text style={styles.lastWeighInText}>{helper_text}</Text>
        </View>
      </View>
    );
  };
  
  export default WeightCard;