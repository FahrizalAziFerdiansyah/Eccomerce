import {Dimensions, PixelRatio, Platform} from 'react-native';

const WINDOW_WIDTH = Math.round(Dimensions.get('window').width);
const WINDOW_HEIGHT = Dimensions.get('window').height;
const FONT_SCALE = Dimensions.get('window').fontScale;

function dimensions(top, right = top, bottom = top, left = right, property) {
  let styles = {};

  styles[`${property}Top`] = top;
  styles[`${property}Right`] = right;
  styles[`${property}Bottom`] = bottom;
  styles[`${property}Left`] = left;

  return styles;
}

export function margin(top, right, bottom, left) {
  return dimensions(top, right, bottom, left, 'margin');
}

export function padding(top, right, bottom, left) {
  return dimensions(top, right, bottom, left, 'padding');
}

export function boxShadow(
  color,
  offset = {height: 2, width: 2},
  radius = 8,
  opacity = 0.2,
) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}

export const responsive = (size, multiplier = 2) => {
  const scale = WINDOW_WIDTH / 375;
  const newSize = size * scale;

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
  // const scale = (WINDOW_WIDTH / WINDOW_HEIGHT) * multiplier;
  // const newSize = size / FONT_SCALE / scale;
  // // return Math.round(PixelRatio.roundToNearestPixel(newSize));
  // return size;
};
