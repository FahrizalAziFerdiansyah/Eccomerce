import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TextMedium from './TextMedium';
import {GRAY, PRIMARY} from '../../styles/colors';
import {useSelector} from 'react-redux';

const ButtonAction = ({title, bg, onPress}) => {
  const {mode} = useSelector(state => state.themeReducer);
  return (
    <TouchableOpacity onPress={onPress} style={styles.button(bg, mode)}>
      <TextMedium color={mode == 'dark' ? PRIMARY : 'white'}>
        {title}
      </TextMedium>
    </TouchableOpacity>
  );
};

export default ButtonAction;

const styles = StyleSheet.create({
  button: (bg, mode) => ({
    backgroundColor: bg || mode == 'light' ? PRIMARY : 'white',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  }),
});
