import * as React from 'react';
import {
  View,
  TouchableOpacity,
  ViewStyle,
  Text,
  TextStyle,
} from 'react-native';
// import { FormContext, FormDataReturnType } from '../context';
import styles from './styles';

export interface SubmitButtonProps {
  handleSubmit(): void;
  containerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  buttonTitleStyle?: TextStyle;
  title?: string;
  disabled: boolean;
}

const SubmitButton = ({
  handleSubmit,
  containerStyle,
  buttonStyle,
  title = 'Submit',
  buttonTitleStyle,
  disabled = false,
}: SubmitButtonProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[styles.button, buttonStyle]}
        onPress={handleSubmit}
        disabled={disabled}
      >
        <Text style={[styles.buttonTitle, buttonTitleStyle]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubmitButton;
