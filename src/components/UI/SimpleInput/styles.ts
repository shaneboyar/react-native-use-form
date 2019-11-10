import { scale } from 'src/styles/base';
import { lightVoid } from 'src/styles/colors';
import { scaleFont } from 'src/styles/font';
import { StyleSheet } from 'react-native';

export const placeholderColor = lightVoid;

export default StyleSheet.create({
  input: {
    flex: 1,
    paddingLeft: scale(16),
    fontSize: scaleFont(16),
  },
});
