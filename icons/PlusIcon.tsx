import React from "react";
import { IconProps } from "@/types/common";
import Svg, { Path } from "react-native-svg";

const PlusIcon: React.FC<IconProps> = ({ color, size }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M6 12h12M12 18V6"
      />
    </Svg>
  );
};

export default PlusIcon;
