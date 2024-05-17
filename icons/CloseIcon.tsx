import { IconProps } from "@/types/common";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const CloseIcon: React.FC<IconProps> = ({ size, color, fill, scale }) => (
  <Svg
  width={size}
  viewBox="0 0 24 24"
  height={size}
  fill="none"
>
  <Path
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    d="m12.728 21.213 8.485-8.485M21.213 21.213l-8.485-8.485"
  />
</Svg>
  // <Svg
  //   width={size}
  //   height={size}
  //   fill={fill ? fill : "none"}
  //   viewBox="0 0 24 24"
  // >
  //   <Path
  //     scale={scale}
  //     stroke={color}
  //     strokeLinecap="round"
  //     strokeLinejoin="round"
  //     strokeWidth={1.5}
  //     d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10ZM9.17 14.83l5.66-5.66M14.83 14.83 9.17 9.17"
  //   />
  // </Svg>
);
export default CloseIcon;
