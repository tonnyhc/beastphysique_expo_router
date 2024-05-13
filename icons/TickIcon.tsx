import { IconProps } from "@/types/common";
import * as React from "react";
import Svg, { SvgProps, Path, Circle } from "react-native-svg";
const TickIcon: React.FC<IconProps> = ({ size, color, fill }) => (
  <Svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    
    fill={fill ? fill : "none"}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10Z"
    />
    <Path
      stroke={fill ? "#000" : color}

      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m7.75 12 2.83 2.83 5.67-5.66"
    />
  </Svg>
);
export default TickIcon;
