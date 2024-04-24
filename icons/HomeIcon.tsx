import { IconProps } from "@/types/common";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const HomeIcon: React.FC<IconProps> = ({ size, color, fill }) => (
  <Svg
    width={size}
    height={size}
    fill={fill ? fill : "none"}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 17.343v-5.549c0-.534 0-.801-.065-1.05a2 2 0 0 0-.28-.617c-.145-.213-.345-.389-.748-.74l-4.8-4.2c-.746-.654-1.12-.98-1.54-1.105-.37-.11-.764-.11-1.135 0-.42.124-.792.45-1.538 1.103L5.093 9.386c-.402.352-.603.528-.747.74a2 2 0 0 0-.281.618C4 10.993 4 11.26 4 11.794v5.549c0 .931 0 1.397.152 1.765a2 2 0 0 0 1.082 1.082c.368.153.834.153 1.766.153s1.398 0 1.766-.152a2 2 0 0 0 1.082-1.083c.152-.368.152-.834.152-1.766v-1a2 2 0 1 1 4 0v1c0 .932 0 1.398.152 1.766a2 2 0 0 0 1.082 1.082c.368.153.834.153 1.766.153s1.398 0 1.766-.152a2 2 0 0 0 1.082-1.083c.152-.368.152-.834.152-1.765Z"
    />
  </Svg>
);
export default HomeIcon;