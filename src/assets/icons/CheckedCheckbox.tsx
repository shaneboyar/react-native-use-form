/* eslint-disable max-len */
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { RNSVGProps } from '.';

const CheckedCheckbox = ({ width = 16, height = 16, ...props }: RNSVGProps) => (
  <Svg width={width} height={height} {...props}>
    <Path
      d="M2 .5h12c.8 0 1.5.7 1.5 1.5v12c0 .8-.7 1.5-1.5 1.5H2c-.8 0-1.5-.7-1.5-1.5V2C.5 1.2 1.2.5 2 .5z"
      fill="#fff"
      stroke="#1b8642"
    />
    <Path
      d="M6.5 11.7L3.6 8.9l.7-.7 2.1 2.1L12 4.7l.7.7-6.2 6.3z"
      fill="#1b8642"
    />
  </Svg>
);

export default CheckedCheckbox;
