import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DANGER, PRIMARY} from '../../styles/colors';
import TextSmall from './TextSmall';
import {responsive} from '../../styles/mixins';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Cart = () => {
  const {cartResult, cartLoading} = useSelector(state => state.cartReducer);
  const {mode} = useSelector(state => state.themeReducer);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Cart')}
      style={styles.cart}>
      <Icon
        size={26}
        color={mode == 'light' ? PRIMARY : 'white'}
        name="shopping-cart"
      />
      <View style={styles.badge}>
        {cartLoading ? (
          <ActivityIndicator size={6} color={'white'} />
        ) : (
          <TextSmall fontSize={responsive(10)} color={'white'}>
            {cartResult.data?.length || 0}
          </TextSmall>
        )}
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
    justifyContent: 'center',
  },
});
