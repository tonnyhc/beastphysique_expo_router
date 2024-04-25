import { IconProps } from "@/types/common";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const ChevronDown: React.FC<IconProps> = ({ size, color }) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={15} height={10} fill="none">
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeWidth={1.5}
        d="m1 1.5 6.134 6.605a.5.5 0 0 0 .732 0L14 1.5"
      />
    </Svg>
  );
};
export default ChevronDown;
