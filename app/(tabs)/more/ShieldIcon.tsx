import { IconProps } from "@/types/common";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const ShieldIcon: React.FC<IconProps> = ({ size, color, fill }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
  >
    <Path
      fill={fill ? fill : "none"}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10.49 3.092 5.5 4.972c-1.15.43-2.09 1.79-2.09 3.01v7.43c0 1.18.78 2.73 1.73 3.44l4.3 3.21c1.41 1.06 3.73 1.06 5.14 0l4.3-3.21c.95-.71 1.73-2.26 1.73-3.44v-7.43c0-1.23-.94-2.59-2.09-3.02l-4.99-1.87c-.85-.31-2.21-.31-3.04 0Z"
    />
    <Path
      fill={fill ? '#fff' : color}
      stroke={fill ? '#fff' : color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M12 13.362a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
    />
    <Path
      stroke={fill ? "#fff" : color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M12 13.362v3"
    />
  </Svg>
);
export default ShieldIcon;
