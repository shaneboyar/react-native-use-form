import * as React from 'react';
import {
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';

export interface SubmitButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTitleStyle?: StyleProp<TextStyle>;
  title?: string;
  disabled?: boolean;
  handleSubmit(): void;
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
    <View style={containerStyle}>
      <TouchableOpacity
        style={buttonStyle}
        onPress={handleSubmit}
        disabled={disabled}
      >
        <Text style={buttonTitleStyle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubmitButton;
