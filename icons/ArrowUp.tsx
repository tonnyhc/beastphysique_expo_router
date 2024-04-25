import { IconProps } from "@/types/common";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const ArrowUp: React.FC<IconProps> = ({ size, color, fill, scale }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill={fill ? fill : "none"}
  >
    <Path
      stroke={color}
      scale={scale}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M18.07 9.57 12 3.5 5.93 9.57M12 20.5V3.67"
    />
  </Svg>
);
export default ArrowUp;
