import { IconProps } from "@/types/common";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const ArrowDown: React.FC<IconProps> = ({ size, color, fill, scale }) => (
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
      d="M18.07 14.43 12 20.5l-6.07-6.07M12 3.5v16.83"
    />
  </Svg>
);
export default ArrowDown;
