import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SECONDARY} from '../../styles/colors';

const IconButton = ({
  icon,
  onPress,
  style,
  color,
  backgroundColor = 'white',
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card(backgroundColor), style]}>
      <Icon size={16} color={color || SECONDARY} name={icon || 'heart-o'} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  card: bg => ({
    backgroundColor: bg,
    padding: 8,
    borderRadius: 10,
    alignSelf: 'flex-start',
  }),
});
