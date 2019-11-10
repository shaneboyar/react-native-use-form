import { StyleSheet } from 'react-native';
import { scale } from '../../../styles/Base';
import { lightVoid } from '../../../styles/Colors';
import { scaleFont } from '../../../styles/Font';

export const placeholderColor = lightVoid;

export default StyleSheet.create({
  input: {
    paddingLeft: scale(16),
    fontSize: scaleFont(16),
  },
});
