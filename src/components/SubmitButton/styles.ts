import { StyleSheet } from 'react-native';
import { scale } from 'src/styles/base';
import { lightGray, mediumVoid } from 'src/styles/colors';
import { scaleFont } from 'src/styles/font';

export default StyleSheet.create({
  container: {
    flexShrink: 1,
  },
  button: {
    width: '100%',
    padding: scale(16),
  },
  buttonTitle: {
    fontSize: scaleFont(16),
    textAlign: 'center',
    color: mediumVoid,
    lineHeight: scale(24),
    paddingVertical: scale(12),
    borderRadius: scale(4),
    borderColor: lightGray,
    flexGrow: 1,
    borderWidth: 1,
  },
});
