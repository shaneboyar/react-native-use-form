import { scale } from 'src/styles/base';
import { lightVoid, advanceVoid, lightGray } from 'src/styles/colors';
import { scaleFont } from 'src/styles/font';
import { StyleSheet } from 'react-native';

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
