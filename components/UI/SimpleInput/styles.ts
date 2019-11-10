import { scale } from '@styles/base';
import { lightVoid } from '@styles/colors';
import { scaleFont } from '@styles/font';
import { StyleSheet } from 'react-native';

export const placeholderColor = lightVoid;

export default StyleSheet.create({
  input: {
    flex: 1,
    paddingLeft: scale(16),
    fontSize: scaleFont(16),
  },
});
