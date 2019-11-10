import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import styles from './styles';
import { OptionProps, Picker } from '../../UI';

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

const PickerField = ({
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
        <Picker
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
