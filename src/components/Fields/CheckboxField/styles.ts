import { StyleSheet } from 'react-native';
import { scale } from 'src/styles/base';
import { advanceVoid } from 'src/styles/colors';
import { scaleFont } from 'src/styles/font';

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
