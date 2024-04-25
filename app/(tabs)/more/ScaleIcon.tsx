import { IconProps } from "@/types/common";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const ScaleIcon: React.FC<IconPros> = ({ size, color, fill }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill='none'
  >
    <Path
      fill={fill ? fill : 'none'}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10 22.862h4c5 0 7-2 7-7v-6c0-5-2-7-7-7h-4c-5 0-7 2-7 7v6c0 5 2 7 7 7Z"
    />
    <Path
      fill={fill ? "white" : "none"}
      stroke={fill ? "white" : color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17.25 9.152a7.905 7.905 0 0 0-10.5 0l2.18 3.5a4.613 4.613 0 0 1 6.14 0l2.18-3.5Z"
    />
  </Svg>
);
export default ScaleIcon;
