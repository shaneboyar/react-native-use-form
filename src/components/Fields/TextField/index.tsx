import React from 'react';
import {
  Text,
  TextStyle,
  View,
  ViewStyle,
  TextInput,
  TextInputProps,
  StyleProp,
} from 'react-native';
import styles from './styles';

export interface TextFieldProps extends TextInputProps {
  field: {
    setValue: (value: string) => void;
    value: string;
    errors: string[];
    isValid: boolean;
  };
  label?: string;
  labelStyles?: StyleProp<TextStyle>;
  fieldStyles?: StyleProp<TextStyle>;
  invalidFieldStyles: StyleProp<TextStyle>;
  errorMessageStyles: StyleProp<TextStyle>;
  placeholder?: string;
  containerStyles?: StyleProp<ViewStyle>;
  onBlur?: () => void;
}

const TextField = ({
  field: { setValue, value = '', errors, isValid },
  label,
  labelStyles,
  fieldStyles,
  invalidFieldStyles,
  containerStyles,
  errorMessageStyles,
  placeholder,
  onBlur,
}: TextFieldProps) => {
  debugger;
  if (value !== undefined && typeof value !== 'string') {
    throw new Error("Text Field Components must have a value type of 'string'");
  } else {
    return (
      <View style={containerStyles}>
        <Text style={labelStyles}>{label}</Text>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={(newValue: string) => setValue(newValue)}
          style={[fieldStyles, !isValid && invalidFieldStyles]}
          onBlur={onBlur}
        />
        {errors ? (
          <Text style={errorMessageStyles}>{errors.join(' ')}</Text>
        ) : null}
      </View>
    );
  }
};

export default TextField;
