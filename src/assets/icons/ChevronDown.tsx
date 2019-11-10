import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { RNSVGProps } from '.';

const ChevronDown = ({ width = 16, height = 16, ...props }: RNSVGProps) => (
  <Svg width={width} height={height} {...props} fill="none">
    <Path
      d="M7 5.071L11.571.5l1.5 1.5L7 8.071.929 2l1.5-1.5L7 5.071z"
      fill="#373737"
    />
  </Svg>
);

export default ChevronDown;
