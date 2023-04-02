import {responsive} from './mixins';

// FONT FAMILY
export const FONT_FAMILY_LIGHT = 'Nunito-Light';
export const FONT_FAMILY_REGULAR = 'Nunito-Regular';
export const FONT_FAMILY_SEMI_BOLD = 'Nunito-SemiBold';
export const FONT_FAMILY_BOLD = 'Nunito-Bold';
export const FONT_FAMILY_MEDIUM = 'Nunito-Medium';

// FONT WEIGHT
export const FONT_WEIGHT_REGULAR = '400';
export const FONT_WEIGHT_BOLD = '700';

// FONT SIZE
export const FONT_SIZE_26 = responsive(26);
export const FONT_SIZE_20 = responsive(20);
export const FONT_SIZE_16 = responsive(16);
export const FONT_SIZE_14 = responsive(14);
export const FONT_SIZE_13 = responsive(13);
export const FONT_SIZE_12 = responsive(12);

// LINE HEIGHT
export const LINE_HEIGHT_24 = responsive(24);
export const LINE_HEIGHT_20 = responsive(20);
export const LINE_HEIGHT_16 = responsive(16);

// FONT STYLE
export const FONT_REGULAR = {
  fontFamily: FONT_FAMILY_REGULAR,
  fontWeight: FONT_WEIGHT_REGULAR,
};

export const FONT_BOLD = {
  fontFamily: FONT_FAMILY_BOLD,
  fontWeight: FONT_WEIGHT_BOLD,
};
