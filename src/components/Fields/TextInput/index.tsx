import React from 'react';
import {
  Text,
  TextStyle,
  View,
  ViewStyle,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleProp,
} from 'react-native';

export interface TextInputProps extends RNTextInputProps {
  field: {
    setValue: (value: string) => void;
    value: string;
    errors: string[];
    isValid: boolean;
  };
  label?: string;
  labelStyles?: StyleProp<TextStyle>;
  inputStyles?: StyleProp<TextStyle>;
  invalidFieldStyles: StyleProp<TextStyle>;
  errorMessageStyles: StyleProp<TextStyle>;
  placeholder?: string;
  containerStyles?: StyleProp<ViewStyle>;
  onBlur?: () => void;
}

const TextInput = ({
  field: { setValue, value = '', errors, isValid },
  label,
  labelStyles,
  inputStyles,
  invalidFieldStyles,
  containerStyles,
  errorMessageStyles,
  placeholder,
  onBlur,
}: TextInputProps) => (
  <View style={containerStyles}>
    <Text style={labelStyles}>{label}</Text>
    <RNTextInput
      placeholder={placeholder}
      value={value}
      onChangeText={(newValue: string) => setValue(newValue)}
      style={[inputStyles, !isValid && invalidFieldStyles]}
      onBlur={onBlur}
    />
    {errors ? <Text style={errorMessageStyles}>{errors.join(' ')}</Text> : null}
  </View>
);

export default TextInput;
