import { StyleSheet, TextStyle } from 'react-native';
import { scale } from 'src/styles/base';
import { advanceRed, advanceVoid, gray, pure } from 'src/styles/colors';
import { scaleFont } from 'src/styles/font';

export const labelStyles: TextStyle = {
  fontSize: scaleFont(14),
  lineHeight: scale(14),
  color: advanceVoid,
};

export default StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: scale(8),
  },
  label: {
    ...labelStyles,
  },
  field: {
    flexDirection: 'row',
    height: scale(48),
    marginVertical: scale(8),
    color: advanceVoid,
    backgroundColor: pure,
    borderWidth: scale(1),
    borderRadius: scale(8),
    borderColor: gray,
    fontSize: scaleFont(16),
  },
  invalid: {
    borderColor: advanceRed,
  },
  errorMessage: {
    color: advanceRed,
    fontWeight: 'bold',
  },
});
