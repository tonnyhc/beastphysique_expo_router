import { IconProps } from "@/types/common";
import * as React from "react";
import Svg, { SvgProps, Path, Circle } from "react-native-svg";
const EyeSlashIcon: React.FC<IconProps> = ({ size, color, fill, scale }) => (
  <Svg width={size} height={size} fill={fill ? fill : "none"}>
    <Path
      stroke={color}
      scale={scale}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m14.53 9.47-5.06 5.06a3.576 3.576 0 1 1 5.06-5.06Z"
    />
    <Path
      stroke={color}
      scale={scale}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17.82 5.77C16.07 4.45 14.07 3.73 12 3.73c-3.53 0-6.82 2.08-9.11 5.68-.9 1.41-.9 3.78 0 5.19.79 1.24 1.71 2.31 2.71 3.17M8.42 19.53c1.14.48 2.35.74 3.58.74 3.53 0 6.82-2.08 9.11-5.68.9-1.41.9-3.78 0-5.19-.33-.52-.69-1.01-1.06-1.47"
    />
    <Path
      stroke={color}
      scale={scale}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.51 12.7a3.565 3.565 0 0 1-2.82 2.82M9.47 14.53 2 22M22 2l-7.47 7.47"
    />
  </Svg>
);
export default EyeSlashIcon;
