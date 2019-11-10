import React from 'react';
import Svg, { Rect } from 'react-native-svg';
import { RNSVGProps } from '.';

const Checkbox = ({ width = 16, height = 16, ...props }: RNSVGProps) => (
  <Svg width={width} height={height} {...props} fill="none">
    <Rect
      x={0.5}
      y={0.5}
      width={15}
      height={15}
      rx={1.5}
      fill="#fff"
      stroke="#666"
    />
  </Svg>
);

export default Checkbox;
