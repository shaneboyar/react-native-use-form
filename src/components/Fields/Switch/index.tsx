import React from 'react';
import {
  Text,
  View,
  ViewStyle,
  SwitchProps as RNSwitchProps,
  Switch as RNSwitch,
  StyleProp,
  TextStyle,
} from 'react-native';

export interface SwitchProps extends RNSwitchProps {
  field: {
    value: boolean;
    setValue(value: boolean): void;
  };
  containerStyle?: StyleProp<ViewStyle>;
  switchStyles: StyleProp<ViewStyle>;
  labelContainerStyles: StyleProp<ViewStyle>;
  labelStyles: StyleProp<TextStyle>;
  label?: string;
}

const Switch = ({
  field: { setValue, value = false },
  containerStyle,
  switchStyles,
  labelContainerStyles,
  labelStyles,
  label,
  ...restProps
}: SwitchProps) => (
  <View style={containerStyle}>
    <RNSwitch
      style={switchStyles}
      value={value}
      onValueChange={newValue => setValue(newValue)}
      {...restProps}
    />
    <View style={labelContainerStyles}>
      <Text style={labelStyles}>{label}</Text>
    </View>
  </View>
);

export default Switch;
