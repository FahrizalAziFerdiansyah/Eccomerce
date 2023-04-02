import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DANGER, PRIMARY} from '../../styles/colors';
import TextSmall from './TextSmall';
import {responsive} from '../../styles/mixins';
import {useNavigation} from '@react-navigation/native';

const Cart = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Cart')}
      style={styles.cart}>
      <Icon size={26} color={PRIMARY} name="shopping-cart" />
      <View style={styles.badge}>
        <TextSmall fontSize={responsive(10)} color={'white'}>
          0
        </TextSmall>
      </View>
    </TouchableOpacity>
  );
};

export default Cart;

const styles = StyleSheet.create({
  cart: {paddingHorizontal: 16},
  badge: {
    height: 12,
    width: 12,
    borderRadius: 12,
    backgroundColor: DANGER,
    position: 'absolute',
    right: 10,
    alignItems: 'center',
  },
});
