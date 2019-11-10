import { ViewProps } from 'react-native';
import ChevronDownIcon from './ChevronDown';
import CheckboxIcon from './Checkbox';
import CheckedCheckboxIcon from './CheckedCheckbox';

export interface RNSVGProps extends ViewProps {
  height?: number;
  width?: number;
}

export { ChevronDownIcon, CheckboxIcon, CheckedCheckboxIcon };
