import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container, TextMedium, TextSmall} from '../../components/atoms';
import {ListCart} from '../../components/molecules';
import {dataProduct} from '../../utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  DANGER,
  GRAY,
  GRAY_DARK,
  GRAY_LIGHT,
  PRIMARY,
  SECONDARY,
} from '../../styles/colors';
import {FONT_SIZE_16, FONT_SIZE_20} from '../../styles/typography';
import {responsive} from '../../styles/mixins';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getAddress, getCart} from '../../redux/action';
import {formatCurrency} from '../../helpers';

const Index = () => {
  const dispatch = useDispatch();
  const {cartResult, cartLoading} = useSelector(state => state.cartReducer);
  const {addressResult, addressLoading} = useSelector(
    state => state.profileReducer,
  );
  const [address, setaddress] = useState('');
  const {userResult} = useSelector(state => state.authReducer);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getCart(userResult.id));
    dispatch(getAddress(userResult.id));
  }, []);

  useEffect(() => {
    if (addressResult) {
      setaddress(
        addressResult?.data.filter(({is_selected}) => is_selected == 1)[0],
      );
    }
  }, [addressResult]);

  var amountPax =
    cartResult && cartResult.data.reduce((n, {amount}) => n + amount, 0);
  var priceTotal =
    cartResult &&
    cartResult.data.reduce((n, {product}) => n + product.price, 0);
  var subTotal =
    cartResult &&
    cartResult.data.reduce(
      (n, {amount, product}) => n + amount * product.price,
      0,
    );

  return (
    <Container
      loading={cartLoading || addressLoading}
      label={'My Chart'}
      type={'detail'}>
      <View style={{flex: 1}}>
        <ListCart data={cartResult.data} />
      </View>

      <View style={[styles.card, {marginBottom: 16}]}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: GRAY_LIGHT,
            paddingBottom: 16,
            marginBottom: 16,
          }}>
          <TextMedium color={'black'}>Order Summary</TextMedium>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 16}}>
          <TextMedium color={'black'}>Subtotal</TextMedium>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <TextMedium color={SECONDARY}>
              Rp. {formatCurrency(priceTotal)}
            </TextMedium>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TextMedium color={'black'}>Jumlah</TextMedium>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <TextMedium color={SECONDARY}>{amountPax} Pax</TextMedium>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <TextMedium color={SECONDARY} fontSize={FONT_SIZE_20}>
          Rp.{formatCurrency(subTotal)}
        </TextMedium>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <TouchableOpacity
            style={styles.btnCart}
            onPress={() => navigation.navigate('Checkout')}>
            <View style={{marginRight: 16}}>
              <Icon color={'white'} size={26} name="shopping-cart" />
            </View>
            <TextSmall color={'white'} fontSize={FONT_SIZE_16}>
              Checkout
            </TextSmall>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default Index;

const styles = StyleSheet.create({
  footer: {
    padding: 16,
    backgroundColor: 'white',
    marginHorizontal: -16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsive(-16),
  },
  btnCart: {
    flexDirection: 'row',
    backgroundColor: PRIMARY,
    padding: 16,
    borderRadius: 16,
    width: responsive(200),
    justifyContent: 'center',
  },
  card: {
    marginTop: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
});
