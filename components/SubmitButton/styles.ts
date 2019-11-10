import { StyleSheet } from 'react-native';
import { scaleFont } from '@styles/font';
import { mediumVoid, lightGray } from '@styles/colors';
import { scale } from '@styles/base';

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
    fontFamily: 'Futura',
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
