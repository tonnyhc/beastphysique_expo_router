import { IconProps } from "@/types/common";
import React from "react";
import Svg, { Path } from "react-native-svg";

const SearchIcon: React.FC<IconProps> = ({ size, color, fill }) => {
  return (
    <Svg
      width={size}
      height={size}
      fill={fill ? fill : "none"}
      viewBox="0 0 24 24"
    >
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M11.5 21a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19ZM22 22l-2-2"
      />
    </Svg>
  );
};

export default SearchIcon;
