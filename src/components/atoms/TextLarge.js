import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_REGULAR,
  FONT_SIZE_16,
  FONT_SIZE_26,
} from '../../styles/typography';

const TextLarge = ({textAlign, children, mb, color, fontFamily, fontSize}) => {
  const {mode} = useSelector(state => state.themeReducer);
  return (
    <Text
      style={styles.container(
        textAlign,
        mb,
        color,
        fontFamily,
        mode,
        fontSize,
      )}>
      {children}
    </Text>
  );
};

export default TextLarge;

const styles = StyleSheet.create({
  container: (align, mb, color, fontFamily, mode, fontSize) => ({
    fontFamily: fontFamily || FONT_FAMILY_BOLD,
    color: color ? color : mode === 'light' ? 'black' : 'white',
    textAlign: align,
    marginBottom: mb || 0,
    fontWeight: 'ExtraLight',
    fontSize: fontSize || FONT_SIZE_26,
  }),
});
