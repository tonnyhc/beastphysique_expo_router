import { IconProps } from "@/types/common";
import React from "react";

import Svg, { Path } from "react-native-svg";

const MoreIcon: React.FC<IconProps> = ({ color, size, fill, scale }) => {
  return (
    <Svg width={size} height={size} fill={fill ? fill : "none"}>
      <Path
        stroke={color}
        scale={scale}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="M5 10h2c2 0 3-1 3-3V5c0-2-1-3-3-3H5C3 2 2 3 2 5v2c0 2 1 3 3 3ZM17 10h2c2 0 3-1 3-3V5c0-2-1-3-3-3h-2c-2 0-3 1-3 3v2c0 2 1 3 3 3ZM17 22h2c2 0 3-1 3-3v-2c0-2-1-3-3-3h-2c-2 0-3 1-3 3v2c0 2 1 3 3 3ZM5 22h2c2 0 3-1 3-3v-2c0-2-1-3-3-3H5c-2 0-3 1-3 3v2c0 2 1 3 3 3Z"
      />
    </Svg>
  );
};

export default MoreIcon;
