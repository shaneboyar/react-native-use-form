import { StyleSheet } from 'react-native';
import { scale } from '@styles/base';
import { advanceVoid } from '@styles/colors';
import { scaleFont } from '@styles/font';

export default StyleSheet.create({
  checkboxFieldContainer: {
    flexDirection: 'row',
    marginVertical: scale(8),
    alignItems: 'center',
  },
  checkboxFieldLabelContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkboxFieldLabel: {
    fontFamily: 'Futura',
    fontSize: scaleFont(12),
    color: advanceVoid,
    marginLeft: scale(16),
  },
});
