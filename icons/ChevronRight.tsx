import React from "react";
import { Entypo } from "@expo/vector-icons";

import { View } from "react-native";
import { IconProps } from "@/types/common";

const ChevronRight: React.FC<IconProps> = ({ color, size }) => {
  return (
    <View>
        <Entypo name="chevron-right" size={size} color={color} />
    </View>
  );
};

export default ChevronRight;
