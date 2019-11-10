import { StyleSheet } from 'react-native';
import { scale } from 'src/styles/base';
import { lightVoid } from 'src/styles/colors';
import { scaleFont } from 'src/styles/font';

export const placeholderColor = lightVoid;

export default StyleSheet.create({
  input: {
    flex: 1,
    paddingLeft: scale(16),
    fontSize: scaleFont(16),
  },
});
