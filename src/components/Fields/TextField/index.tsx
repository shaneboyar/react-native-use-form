import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import styles from './styles';
import { SimpleInput } from '../../UI';

export interface TextFieldProps {
  field: {
    setValue: (value: string) => void;
    value: string;
    errors: string[];
    isValid: boolean;
  };
  label?: string;
  labelStyles?: TextStyle;
  placeholder?: string;
  containerStyle?: ViewStyle;
  onBlur?: () => void;
}

const TextField = ({
  field: { setValue, value = '', errors, isValid },
  label,
  labelStyles,
  containerStyle,
  placeholder = '',
  onBlur,
}: TextFieldProps) => {
  debugger;
  if (value !== undefined && typeof value !== 'string') {
    throw new Error("Text Field Components must have a value type of 'string'");
  } else {
    return (
      <View style={[styles.container, containerStyle]}>
        <Text style={[styles.label, labelStyles]}>{label}</Text>
        <SimpleInput
          placeholder={placeholder}
          label={label}
          value={value}
          onChangeText={(newValue: string) => setValue(newValue)}
          inputStyles={[styles.field, !isValid ? styles.invalid : {}]}
          onBlur={onBlur}
        />
        {errors ? (
          <Text style={styles.errorMessage}>{errors.join(' ')}</Text>
        ) : null}
      </View>
    );
  }
};

export default TextField;
