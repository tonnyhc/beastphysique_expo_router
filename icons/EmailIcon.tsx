
import { IconProps } from "@/types/common";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const EmailIcon: React.FC<IconProps> = ({ size, color }) => {
  return (
    <Svg
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="M17 20.5H7c-3 0-5-1.5-5-5v-7c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v7c0 3.5-2 5-5 5Z"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="m17 9-3.13 2.5c-1.03.82-2.72.82-3.75 0L7 9"
      />
    </Svg>
  );
};
export default EmailIcon;
