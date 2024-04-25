import { IconProps } from "@/types/common";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const LogoutIcon: React.FC<IconProps> = ({ size, color, fill }) => (
  <Svg width={size} height={size} fill="none">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.9 7.922c.31-3.6 2.16-5.07 6.21-5.07h.13c4.47 0 6.26 1.79 6.26 6.26v6.52c0 4.47-1.79 6.26-6.26 6.26h-.13c-4.02 0-5.87-1.45-6.2-4.99M15 12.362H3.62M5.85 9.012l-3.35 3.35 3.35 3.35"
    />
  </Svg>
);
export default LogoutIcon;
