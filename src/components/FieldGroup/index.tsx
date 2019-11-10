import * as React from 'react';
import { View, ViewStyle } from 'react-native';
import { CheckboxFieldProps } from '../Fields/CheckboxField';
import { PickerFieldProps } from '../Fields/PickerField';
import { TextFieldProps } from '../Fields/TextField';
import styles from './styles';

interface Props {
  children: React.ReactNodeArray;
}

type FormFieldProps = TextFieldProps | PickerFieldProps | CheckboxFieldProps;

const columnStyling: { [id: number]: ViewStyle } = {
  2: styles.twoColumnField,
  3: styles.threeColumnField,
  4: styles.fourColumnField,
};

const getColumnStyling = (count: number) =>
  columnStyling[count] || styles.twoColumnField;

const renderChildren = (children: React.ReactNodeArray) => {
  const containerStyle = getColumnStyling(React.Children.count(children));
  return React.Children.map(children, child => {
    if (
      React.isValidElement(child)
      // && ['TextField', 'PickerField', 'CheckboxField'].includes(child.type.name)
    ) {
      return React.cloneElement(child, {
        ...child.props,
        containerStyle,
      } as FormFieldProps);
    }

    throw new Error(
      `FieldGroup must only take TextField, PickerField, or 
CheckboxField components as children`
    );
  });
};

const FieldGroup = ({ children }: Props) => {
  if (!children) {
    throw new Error(
      'FieldGroup must take at least one FormField as a child component'
    );
  }

  return <View style={styles.container}>{renderChildren(children)}</View>;
};

export default FieldGroup;
