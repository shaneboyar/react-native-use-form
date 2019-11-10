import React, { useEffect, useRef } from 'react';
import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  TextInput,
  TextStyle,
} from 'react-native';
import styles, { placeholderColor } from './styles';

export interface SimpleInputProps {
  id?: string;
  label?: string;
  value?: string;
  lastFocusRequestTimestamp?: number;
  keyEnterType?: ReturnKeyTypeOptions;
  keyboardType?: KeyboardTypeOptions;
  onFocus?: () => void;
  onBlur?: () => void;
  onPressKeyEnter?: () => void;
  inputStyles?: TextStyle | TextStyle[];
  placeholder?: string;
  isRequired?: boolean;
  onChangeText(value: string): void;
}

const SimpleInput = ({
  id,
  label,
  value,
  onChangeText,
  lastFocusRequestTimestamp,
  keyEnterType,
  onPressKeyEnter,
  onFocus,
  onBlur,
  keyboardType,
  inputStyles,
  placeholder,
  isRequired,
}: SimpleInputProps) => {
  const textInput = useRef(null as TextInput | null);
  useEffect(() => {
    if (lastFocusRequestTimestamp && textInput.current) {
      textInput.current.focus();
    }
  }, [lastFocusRequestTimestamp]);
  return (
    <TextInput
      key={id}
      style={[styles.input, inputStyles]}
      placeholder={`${placeholder}${isRequired ? '*' : ''}`}
      placeholderTextColor={placeholderColor}
      value={value}
      onChangeText={onChangeText}
      accessibilityLabel={`${label || id || 'Text'} Input`}
      ref={textInput}
      onSubmitEditing={onPressKeyEnter}
      blurOnSubmit={false}
      onFocus={onFocus}
      onBlur={onBlur}
      returnKeyType={keyEnterType}
      keyboardType={keyboardType}
    />
  );
};

export default SimpleInput;
