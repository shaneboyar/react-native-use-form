import React from 'react';
import {
  Text,
  TextStyle,
  View,
  ViewStyle,
  StyleProp,
  Picker as RNPicker,
  PickerProps as RNPickerProps,
} from 'react-native';

interface OptionProps {
  label: string;
  value: string;
}

interface PickerProps extends RNPickerProps {
  field: {
    setValue: (value: string) => void;
    value: string;
  };
  label?: string;
  labelStyles?: StyleProp<TextStyle>;
  options: OptionProps[];
  containerStyle?: StyleProp<ViewStyle>;
  pickerStyle?: StyleProp<ViewStyle>;
}

const Picker = ({
  field: { setValue, value = '' },
  label,
  labelStyles,
  containerStyle,
  options,
  pickerStyle,
  ...restProps
}: PickerProps) => (
  <View style={containerStyle}>
    <Text style={labelStyles}>{label}</Text>
    <RNPicker
      onValueChange={(newValue: string) => setValue(newValue)}
      selectedValue={value}
      style={pickerStyle}
      {...restProps}
    >
      {options.map(option => (
        <RNPicker.Item {...option} />
      ))}
    </RNPicker>
  </View>
);

export default Picker;
