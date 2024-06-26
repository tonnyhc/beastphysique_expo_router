import { IconProps } from "@/types/common";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const ChevronUp: React.FC<IconProps> = ({ size, color, fill }) => {
  return (
    <Svg
    width={size}
    height={size}
    fill={fill ? fill : "none"}
    viewBox="0 0 24 24"
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M19.92 15.05 13.4 8.53c-.77-.77-2.03-.77-2.8 0l-6.52 6.52"
    />
  </Svg>
  );
};
export default ChevronUp;
