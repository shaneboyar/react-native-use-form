import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import Checkbox from '@components/UI/Checkbox';
import styles from './styles';

export interface CheckboxFieldProps {
  field: {
    setValue(value: boolean): void;
    value: boolean;
  };
  label?: string;
  placeholder?: string;
  containerStyle?: ViewStyle;
}

const CheckboxField = ({
  field: { setValue, value = false },
  label,
  containerStyle,
}: CheckboxFieldProps) => {
  if (typeof value !== 'boolean') {
    throw new Error(
      "Checkbox Field Components must have a value type of 'boolean'"
    );
  } else {
    return (
      <View style={[styles.checkboxFieldContainer, containerStyle]}>
        <Checkbox
          selected={value}
          onPress={() => {
            setValue(!value);
          }}
        />
        <View style={styles.checkboxFieldLabelContainer}>
          <Text style={styles.checkboxFieldLabel}>{label}</Text>
        </View>
      </View>
    );
  }
};

export default CheckboxField;
