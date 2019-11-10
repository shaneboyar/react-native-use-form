import { StyleSheet } from 'react-native';
import { scale } from '../../../styles/Base';
import { scaleFont } from '../../../styles/Font';
import { advanceVoid } from '../../../styles/Colors';

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
    fontSize: scaleFont(12),
    color: advanceVoid,
    marginLeft: scale(16),
  },
});
