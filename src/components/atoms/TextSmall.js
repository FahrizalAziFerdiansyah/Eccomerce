import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {FONT_FAMILY_REGULAR, FONT_SIZE_12} from '../../styles/typography';

const TextSmall = ({
  textAlign,
  children,
  mb,
  color,
  fontSize,
  fontFamily,
  style,
}) => {
  const {mode} = useSelector(state => state.themeReducer);
  return (
    <Text
      style={[
        styles.container(textAlign, mb, color, fontFamily, mode, fontSize),
        {...style},
      ]}>
      {children}
    </Text>
  );
};

export default TextSmall;

const styles = StyleSheet.create({
  container: (align, mb, color, fontFamily, mode, fontSize) => ({
    fontFamily: fontFamily || FONT_FAMILY_REGULAR,
    color: color ? color : mode === 'light' ? 'black' : 'white',
    textAlign: align,
    marginBottom: mb || 0,
    fontWeight: 'ExtraLight',
    fontSize: fontSize || FONT_SIZE_12,
  }),
});
