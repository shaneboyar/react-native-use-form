import { StyleSheet } from 'react-native';
import { labelStyles } from '../TextField/styles';
import { scale } from '../../../styles/Base';
import { scaleFont } from '../../../styles/Font';
import { advanceVoid, pure, gray } from '../../../styles/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  label: { ...labelStyles },
  pickerItemContainer: {
    paddingHorizontal: 0,
    borderWidth: 0,
  },
  input: {
    color: advanceVoid,
    fontSize: scaleFont(16),
  },
  field: {
    flexDirection: 'row',
    height: scale(48),
    marginVertical: scale(8),
    width: '100%',
    backgroundColor: pure,
    borderWidth: scale(1),
    borderRadius: scale(8),
    borderColor: gray,
  },
});
