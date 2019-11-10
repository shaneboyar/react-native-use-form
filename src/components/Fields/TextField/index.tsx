import React from 'react';
import { View, ViewStyle, Text, TextStyle } from 'react-native';
import SimpleInput from '@UI/SimpleInput';
import styles from './styles';

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
  placeholder,
  onBlur,
}: TextFieldProps) => {
  if (typeof value !== 'string') {
    throw new Error("Text Field Components must have a value type of 'string'");
  } else {
    return (
      <View style={[styles.container, containerStyle]}>
        <Text style={[styles.label, labelStyles]}>{label}</Text>
        <SimpleInput
          placeholder={placeholder}
          label={label}
          value={value}
          onChangeText={(value: string) => setValue(value)}
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
