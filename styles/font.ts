import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// TODO: should be defined by designers
const getBaseFontSize = () => (width > 340 ? 16 : 14);

/**
 * The font size used as a basis for scaling fonts in the application.
 */
const appBaseFontSize = getBaseFontSize();

/**
 * The base font size in terms of which font sizes are described in stylesheets.
 */
const appGuidelineFontSize = 16;

/**
 * Computes an appropriate font size which scales with the device size
 * and matches the design guidelines.
 * Provides responsive font sizes. Works like *rem* units.
 *
 * For example, scaleFont(14) when guidelineFontSize is 16
 * and baseFontSize is 18, would reduce to:
 * 0.875rem with root font size of 18 and the computed font size would be
 * equal to 0.875 * 18 = 15.75.
 *
 * @export
 * @param {number} fontSize
 *    Font size which follows the design guidelines.
 * @param {number} [guidelineFontSize=appGuidelineFontSize]
 *    Design guideline base font size.
 * @param {number} [baseFontSize=appBaseFontSize]
 *    Base font size of the device.
 * @returns {number}
 *    A responsive font size, following the design guidelines.
 */
export const scaleFont = (
  fontSize: number,
  guidelineFontSize: number = appGuidelineFontSize,
  baseFontSize: number = appBaseFontSize
): number => (fontSize / guidelineFontSize) * baseFontSize;
