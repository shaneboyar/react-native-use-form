import { StyleSheet } from 'react-native';
import { scale } from 'src/styles/base';
import { pure, gray, advanceVoid } from 'src/styles/colors';
import { scaleFont } from 'src/styles/font';
import { labelStyles } from '../TextField/styles';

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
