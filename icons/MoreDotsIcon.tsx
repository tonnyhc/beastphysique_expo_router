import { IconProps } from "@/types/common";
import React from "react";

import Svg, { Path } from "react-native-svg";

const MoreDotsIcon: React.FC<IconProps> = ({ color, size, fill }) => {
  return (
    <Svg
      width={size}
      height={size}
      fill={fill}
    >
      <Path
        stroke={color}
        strokeWidth={1.5}
        d="M5 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM19 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z"
      />
    </Svg>
  );
};

export default MoreDotsIcon;
