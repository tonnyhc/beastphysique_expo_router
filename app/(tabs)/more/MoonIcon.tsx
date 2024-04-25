import { IconProps } from "@/types/common";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const MoonIcon: React.FC<IconProps> = ({ size, color, fill }) => (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
  >
    <Path
      fill={fill ? fill : 'none'}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M2.03 13.281c.36 5.15 4.73 9.34 9.96 9.57 3.69.16 6.99-1.56 8.97-4.27.82-1.11.38-1.85-.99-1.6-.67.12-1.36.17-2.08.14-4.89-.2-8.89-4.29-8.91-9.12-.01-1.3.26-2.53.75-3.65.54-1.24-.11-1.83-1.36-1.3-3.96 1.67-6.67 5.66-6.34 10.23Z"
    />
  </Svg>
);
export default MoonIcon;
