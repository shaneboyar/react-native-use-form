// import { CheckboxIcon, CheckedCheckboxIcon } from '@icons';
import React from 'react';
import { TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import { scale } from 'src/styles/base';
import { CheckedCheckboxIcon, CheckboxIcon } from '@icons';

export const iconSize = scale(16);

export interface Props {
  selected: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  onPress?(): void;
}

const Checkbox = ({ onPress, selected, accessibilityLabel, style }: Props) => {
  const checked = (
    <CheckedCheckboxIcon height={iconSize} width={iconSize} style={style} />
  );

  const unchecked = (
    <CheckboxIcon height={iconSize} width={iconSize} style={style} />
  );

  return (
    <TouchableOpacity onPress={onPress} accessibilityLabel={accessibilityLabel}>
      {selected ? checked : unchecked}
    </TouchableOpacity>
  );
};

export default Checkbox;
