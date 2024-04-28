import { IconProps } from "@/types/common";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const BoardIcon: React.FC<IconProps> = ({ size, color, fill }) => (
  <Svg
    width={size}
    height={size}
    fill={fill ? fill : "none"}
    viewBox="0 0 24 24"
  >
    <Path
      stroke={color}
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="m21.93 6.76-3.37 13.53A2.228 2.228 0 0 1 16.38 22H3.24c-1.51 0-2.59-1.48-2.14-2.93L5.31 5.55a2.25 2.25 0 0 1 2.14-1.59h12.3c.95 0 1.74.58 2.07 1.38.19.43.23.92.11 1.42Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M16 22h4.78c1.29 0 2.3-1.09 2.21-2.38L22 6M9.68 6.38l1.04-4.32M16.38 6.39l.94-4.34M7.7 12h8M6.7 16h8"
    />
  </Svg>
);
export default BoardIcon;
