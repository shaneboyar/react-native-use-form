import { StyleSheet, TextStyle } from 'react-native';
import { scale } from '@styles/base';
import { advanceVoid, pure, gray, advanceRed } from '@styles/colors';
import { scaleFont } from '@styles/font';

export const labelStyles: TextStyle = {
  fontFamily: 'Futura',
  fontSize: scaleFont(14),
  lineHeight: scale(14),
  color: advanceVoid,
};

export default StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: scale(8),
  },
  label: labelStyles,
  field: {
    flexDirection: 'row',
    height: scale(48),
    marginVertical: scale(8),
    color: advanceVoid,
    backgroundColor: pure,
    borderWidth: scale(1),
    borderRadius: scale(8),
    borderColor: gray,
    fontFamily: 'Futura',
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
