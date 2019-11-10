import { StyleSheet } from 'react-native';
import { scale } from '../../styles/Base';
import { lightGray, mediumVoid } from '../../styles/Colors';
import { scaleFont } from '../../styles/Font';

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
