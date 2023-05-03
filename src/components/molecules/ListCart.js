import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IconButton, TextMedium, TextSmall, ToastCustom} from '../atoms';
import {responsive} from '../../styles/mixins';
import {FONT_SIZE_14} from '../../styles/typography';
import {DANGER, GRAY, GRAY_LIGHT} from '../../styles/colors';
import {formatCurrency} from '../../helpers';
import {useDispatch, useSelector} from 'react-redux';
import {deleteCart, clearDeleteCart} from '../../redux/action';
import {dispatchSuccess} from '../../utils';

const ListCollection = ({data}) => {
  const navigation = useNavigation();
  const {deleteCartResult, deleteCartLoading, cartResult} = useSelector(
    state => state.cartReducer,
  );
  const {userResult} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const _deleteProduct = product_id => {
    var data = {
      product_id,
      user_id: userResult.id,
    };
    dispatch(deleteCart(data));
  };
  useEffect(() => {
    if (deleteCartResult) {
      var indexCart = cartResult.data.findIndex(
        ({id}) => id == deleteCartResult.id,
      );
      cartResult.data.splice(indexCart, 1);
      ToastCustom('success', 'Success', 'Product deleted from your cart');
      dispatch(clearDeleteCart());
    }
  }, [deleteCartResult]);

  const add = card_id => {
    var indexCart = cartResult.data.findIndex(({id}) => id == card_id);
    var stock = cartResult.data[indexCart]['product']['stock'];
    var sum = cartResult.data[indexCart]['amount'] + 1;
    if (sum > stock) {
      ToastCustom('error', 'Failed', 'Stock enough');
    } else {
      cartResult.data[indexCart]['amount'] = sum;
      dispatchSuccess(dispatch, 'CART', cartResult);
    }
  };
  const reduce = card_id => {
    var indexCart = cartResult.data.findIndex(({id}) => id == card_id);
    var cart = cartResult.data[indexCart];
    if (cart['amount'] == 1) {
      _deleteProduct(cart['product_id']);
    } else {
      cartResult.data[indexCart]['amount'] =
        cartResult.data[indexCart]['amount'] - 1;
      dispatchSuccess(dispatch, 'CART', cartResult);
    }
  };
  const renderItem = ({item}) => {
    var cart = item;
    var item = item.product;
    return (
      <TouchableOpacity
        style={{
          marginBottom: responsive(10),
          backgroundColor: 'white',
          padding: 8,
          borderRadius: 8,
        }}
        onPress={() => navigation.navigate('ProductDetail', item)}>
        <View style={{flexDirection: 'row'}}>
          <Image
            resizeMode="stretch"
            style={styles.image}
            source={{
              uri: item.image,
            }}
          />
          <View style={{marginLeft: responsive(16), flex: 1}}>
            <View>
              <TextSmall color={GRAY}>Kategori</TextSmall>
              <TextMedium fontSize={FONT_SIZE_14}>{item.name}</TextMedium>
            </View>
            <TextMedium fontSize={FONT_SIZE_14}>
              Rp. {formatCurrency(item.price)}
            </TextMedium>
            <View
              style={{
                justifyContent: 'flex-end',
                flex: 1,
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <IconButton
                    onPress={() => reduce(cart.id)}
                    backgroundColor={GRAY_LIGHT}
                    icon={'minus'}
                  />
                  <View style={{marginHorizontal: 8}}>
                    <TextMedium>{cart.amount}</TextMedium>
                  </View>
                  <IconButton
                    onPress={() => add(cart.id)}
                    backgroundColor={GRAY_LIGHT}
                    icon={'plus'}
                  />
                </View>
                <View
                  style={{
                    justifyContent: 'flex-end',
                    alignSelf: 'flex-end',
                    flex: 1,
                  }}>
                  <IconButton
                    onPress={() => _deleteProduct(item.id)}
                    style={{alignSelf: 'flex-end'}}
                    color={DANGER}
                    icon={'trash'}
                    backgroundColor={GRAY_LIGHT}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      data={data}
    />
  );
};

export default ListCollection;

const styles = StyleSheet.create({
  image: {
    width: responsive(100),
    height: responsive(100),
    alignItems: 'flex-end',
    borderRadius: 6,
  },
  cardLove: {
    backgroundColor: 'white',
    padding: 8,
    margin: 10,
    borderRadius: 10,
  },
});
