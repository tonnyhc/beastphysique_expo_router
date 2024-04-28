import { IconProps } from "@/types/common";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const ChevronDown: React.FC<IconProps> = ({ size, color }) => {
  return (
    <Svg
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeWidth={2}
        d="m1 1.5 6.134 6.605a.5.5 0 0 0 .732 0L14 1.5"
      />
    </Svg>
  );
};
export default ChevronDown;
