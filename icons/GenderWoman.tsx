import { IconProps } from "@/types/common";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const GenderWoman: React.FC<IconProps> = ({ size, color, fill, scale }) => (
    <Svg
    width={size}
    height={size}
    fill={fill ? fill : 'none'}
    viewBox="0 0 24 24"
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 16a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM12 16v6M15 19H9"
    />
  </Svg>
);
export default GenderWoman;
