import { IconProps } from "@/types/common";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const LockIcon: React.FC<IconProps> = ({ size, color, scale, fill }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
  >
    <Path
      // scale={scale}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6 10V8c0-3.31 1-6 6-6s6 2.69 6 6v2M17 22H7c-4 0-5-1-5-5v-2c0-4 1-5 5-5h10c4 0 5 1 5 5v2c0 4-1 5-5 5Z"
    />
    <Path
      // scale={scale}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.996 16h.01M11.995 16h.01M7.995 16h.008"
    />
  </Svg>
);
export default LockIcon;
