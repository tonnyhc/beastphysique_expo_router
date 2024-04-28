import { IconProps } from "@/types/common";
import * as React from "react";
import Svg, { SvgProps, Path, Circle } from "react-native-svg";
const InfoIcon: React.FC<IconProps> = ({ size, color, fill }) => (
  <Svg
    width={size}
    height={size}
    fill={fill ? fill : "none"}
    viewBox="0 0 24 24"
  >
    <Circle cx={12} cy={12} r={9} stroke={color} />
    <Path fill={color} d="M12.5 7.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
    <Path stroke={color} d="M12 17v-7" />
  </Svg>
);
export default InfoIcon;
