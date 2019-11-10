import React from 'react';
import { View, ViewStyle, Text, TextStyle } from 'react-native';
import PickerItem, { OptionProps } from '@UI/Picker';
import styles from './styles';

export interface PickerFieldProps {
  field: {
    setValue: (value: string) => void;
    value: string;
  };
  label: string;
  labelStyles?: TextStyle;
  placeholder?: string;
  options: OptionProps[];
  containerStyle?: ViewStyle;
}

export const PickerField = ({
  field: { setValue, value = '' },
  label,
  labelStyles,
  containerStyle,
  options,
}: PickerFieldProps) => {
  if (typeof value !== 'string') {
    throw new Error(
      "Picker Field Components must have a value type of 'string'"
    );
  } else {
    return (
      <View style={[styles.container, containerStyle]}>
        <Text style={[styles.label, labelStyles]}>{label}</Text>
        <PickerItem
          onChangeText={(newValue: string) => setValue(newValue)}
          label={label}
          value={value}
          options={options}
          containerStyle={styles.pickerItemContainer}
          fieldStyle={styles.field}
          inputStyle={styles.input}
        />
      </View>
    );
  }
};

export default PickerField;
