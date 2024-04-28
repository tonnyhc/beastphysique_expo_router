import { IconProps } from "@/types/common";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const GenderMan: React.FC<IconProps> = ({ size, color, fill, scale }) => (
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
      strokeWidth={1.5}
      d="M10.25 21.5a7.75 7.75 0 1 0 0-15.5 7.75 7.75 0 0 0 0 15.5ZM21.5 2.5 16 8M15 2.5h6.5V9"
    />
  </Svg>
);
export default GenderMan;
