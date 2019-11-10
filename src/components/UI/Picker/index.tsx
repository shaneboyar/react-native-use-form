import React, { ReactElement, ReactNode } from 'react';
import {
  Picker as RNPicker,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { ChevronDownIcon } from 'src/assets/icons';
import styles from './styles';

interface CustomPickerProps<T> {
  selected: T;
  key: string;
  children: ReactNode;
  iosHeader?: string;
  iosIcon?: ReactElement;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  itemStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  placeholderStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
  onSelect(option: T): void;
}

// This constant is related to known bug in react picker
// https://github.com/facebook/react-native/issues/13351
// By setting a key to the Picker we cause it to re-render
// and the problem of `onValueChange` being called with
// `selectedValue` is alleviated
function CustomPicker<T>({
  selected,
  onSelect,
  children,
  ...props
}: CustomPickerProps<T>) {
  const select = (item: T) => {
    if (item === selected) {
      return;
    }
    onSelect(item);
  };

  return (
    <RNPicker
      mode="dropdown"
      selectedValue={selected}
      accessible={false}
      onValueChange={select}
      {...props}
    >
      {children}
    </RNPicker>
  );
}

export interface OptionProps {
  label: string;
  value: string;
}

export interface Props {
  label: string;
  value: string;
  options: OptionProps[];
  fieldStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  placeholderStyle?: TextStyle;
  onChangeText(value: string): void;
}

const iosIcon = <ChevronDownIcon style={styles.arrow} />;

const Picker = ({
  label,
  value,
  onChangeText,
  options,
  fieldStyle,
  containerStyle,
  inputStyle,
  placeholderStyle,
}: Props) => (
  <View style={[styles.container, containerStyle]}>
    <CustomPicker
      selected={value}
      onSelect={onChangeText}
      key={label}
      iosHeader={label}
      iosIcon={iosIcon}
      style={[styles.picker, fieldStyle]}
      textStyle={[styles.input, inputStyle]}
      placeholder={label}
      placeholderStyle={[styles.placeholder, placeholderStyle]}
      accessibilityLabel={`${label} Dropdown`}
    >
      <RNPicker.Item label={label} value="" key={label} />
      {options.map(
        ({ label: optionLabel, value: optionValue }: OptionProps) => (
          <RNPicker.Item label={optionLabel} value={optionValue} key={value} />
        )
      )}
    </CustomPicker>
  </View>
);

export default Picker;
