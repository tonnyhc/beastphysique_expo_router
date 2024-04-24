import * as React from "react";
import Svg, { SvgProps, Path, SvgXml, Rect } from "react-native-svg";
import { IconProps } from "@/types/common";

const DumbbellIcon: React.FC<IconProps> = ({ size, color, fill }) => {
  return (
    <Svg
    //   xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={fill ? fill : "none"}
    >
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17.18 18c2.4 0 3-1.35 3-3V9c0-1.65-.6-3-3-3s-3 1.35-3 3v6c0 1.65.6 3 3 3ZM6.82 18c-2.4 0-3-1.35-3-3V9c0-1.65.6-3 3-3s3 1.35 3 3v6c0 1.65-.6 3-3 3ZM9.82 12h4.36M22.5 14.5v-5M1.5 14.5v-5"
      />
    </Svg>
  );
};
export default DumbbellIcon;
