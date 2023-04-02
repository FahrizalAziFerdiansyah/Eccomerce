import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TextMedium from './TextMedium';
import {PRIMARY} from '../../styles/colors';

const ButtonAction = ({title, bg, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button(bg)}>
      <TextMedium color={'white'}>{title}</TextMedium>
    </TouchableOpacity>
  );
};

export default ButtonAction;

const styles = StyleSheet.create({
  button: bg => ({
    backgroundColor: bg || PRIMARY,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  }),
});
