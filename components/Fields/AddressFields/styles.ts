import { StyleSheet } from 'react-native';
import { scale } from '@styles/base';
import { advanceVoid, pure, gray, advanceRed } from '@styles/colors';
import { scaleFont } from '@styles/font';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  field: {
    width: '100%',
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
    paddingLeft: scale(16),
    fontWeight: 'normal',
  },
  fieldLabel: {
    color: advanceVoid,
    fontSize: scaleFont(14),
    marginBottom: scale(8),
  },
  invalid: {
    borderColor: advanceRed,
  },
});
