import { Dimensions, Platform } from 'react-native';
import { advanceVoid, darkVoid, pure } from '../Colors';

const { width, height } = Dimensions.get('window');

const fullGuidelineWidth = 375;

/**
 * Computes the size in density-independent pixels
 * for the device's dimensions
 * by taking up the (size / fullGuidelineWidth) proportion of the screen width.
 *
 * @param {number} size - Guideline width size.
 */
export const scale = (size: number) => (size / fullGuidelineWidth) * width;

export const deviceWidth = width;
export const deviceHeight = height;

// TODO: use this shadow wherever possible, we can have a few standard shadows
export const shadow = Platform.select({
  android: {
    elevation: 4,
  },
  ios: {
    shadowColor: advanceVoid,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
  },
});

export const cardShadow = Platform.select({
  android: {
    elevation: 8,
  },
  ios: {
    shadowColor: advanceVoid,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
  },
});

export const headerShadow = Platform.select({
  android: {
    elevation: 8,
  },
  ios: {
    shadowColor: advanceVoid,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    zIndex: 1,
  },
});

export const headerStyle = {
  ...headerShadow,
  backgroundColor: pure,
  borderBottomColor: pure,
  borderBottomLeftRadius: scale(16),
  borderBottomRightRadius: scale(16),
};

export const footerHeight = scale(54);

export const footerShadow = Platform.select({
  android: {
    elevation: 24,
  },
  ios: {
    shadowColor: darkVoid,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
  },
});

export const footerStyle = {
  ...footerShadow,
  height: footerHeight,
  backgroundColor: pure,
};

export const roundedFooterStyle = {
  ...headerShadow,
  backgroundColor: pure,
  borderTopLeftRadius: scale(16),
  borderTopRightRadius: scale(16),
};

export const popupStyle = {
  ...Platform.select({
    android: {
      elevation: 1000,
    },
  }),
};

export const zIndex = {
  modal: 1000,
  ribbon: 10,
  perksBucksCardUpperLayer: 2,
  perksBucksCardLowerLayer: 1,
};
