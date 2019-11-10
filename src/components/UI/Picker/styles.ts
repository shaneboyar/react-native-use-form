import { StyleSheet } from 'react-native';
import { scale } from '../../../styles/Base';
import { advanceVoid, lightGray, lightVoid } from '../../../styles/Colors';
import { scaleFont } from '../../../styles/Font';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(8),
    color: advanceVoid,
    fontWeight: 'bold',
    borderWidth: scale(1),
    borderRadius: scale(8),
    borderColor: lightGray,
    justifyContent: 'space-between',
  },
  input: {
    fontSize: scaleFont(16),
    color: lightVoid,
  },
  picker: {
    paddingRight: scale(20),
  },
  placeholder: {
    color: lightVoid,
  },
  arrow: {
    width: scale(8),
    height: scale(5),
  },
});
