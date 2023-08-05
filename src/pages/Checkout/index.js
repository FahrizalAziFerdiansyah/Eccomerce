import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Container,
  SelectInput,
  TextMedium,
  TextSmall,
  ToastCustom,
} from '../../components/atoms';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ListCart} from '../../components/molecules';
import {DANGER, GRAY_LIGHT, PRIMARY, SECONDARY} from '../../styles/colors';
import {
  clearGetCost,
  clearsnapTransaction,
  getAddress,
  getCost,
  snapTransaction,
} from '../../redux/action';
import {formatCurrency} from '../../helpers';
import {FONT_SIZE_16, FONT_SIZE_20} from '../../styles/typography';
import Icon from 'react-native-vector-icons/FontAwesome';
import {responsive} from '../../styles/mixins';
import {dataCourier} from '../../utils';

const Index = () => {
  const dispatch = useDispatch();
  const {cartResult, cartLoading} = useSelector(state => state.cartReducer);
  const {addressResult, addressLoading} = useSelector(
    state => state.profileReducer,
  );
  const {snapTransactionLoading, snapTransactionResult, snapTransactionError} =
    useSelector(state => state.paymentReducer);
  const [address, setaddress] = useState('');
  const [courier, setCourier] = useState('');
  const [ongkir, setOngkir] = useState('0');
  const {userResult} = useSelector(state => state.authReducer);
  const {getCostResult, getCostLoading} = useSelector(
    state => state.ongkirReducer,
  );
  const navigation = useNavigation();

  useEffect(() => {
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

  useEffect(() => {
    if (courier) {
      const data = {
        origin: '160',
        destination: '160',
        weight: `${500 * amountPax}`,
        courier,
      };
      dispatch(getCost(data));
    }
  }, [courier]);

  useEffect(() => {
    if (getCostResult) {
      setOngkir(getCostResult);
    }
  }, [getCostResult]);

  useEffect(() => {
    return () => {
      dispatch(clearGetCost());
    };
  }, []);

  const _submit = () => {
    var date = new Date().getTime();
    const data = {
      transaction_details: {
        order_id: `ORDER-${date}-${userResult.id}`,
        gross_amount: subTotal + ongkir,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: userResult.name,
        email: userResult.email,
        phone: userResult.phone,
      },
    };
    dispatch(snapTransaction(data));
  };

  useEffect(() => {
    if (snapTransactionResult) {
      navigation.navigate('Payment', snapTransactionResult);
      dispatch(clearsnapTransaction());
      ToastCustom('success', 'Success', 'Lakukan pembayaran');
    }
  }, [snapTransactionResult]);

  return (
    <Container
      loading={addressLoading || getCostLoading || snapTransactionLoading}
      type={'detail'}
      label={'Checkout'}>
      <View style={{flex: 2}}>
        <ListCart isEdit={false} data={cartResult.data} />
      </View>
      <View style={styles.card}>
        <View style={{flexDirection: 'row'}}>
          <TextMedium color={'black'}> Address</TextMedium>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            {address ? (
              <TextSmall color={SECONDARY}>
                ({address.type})/{address.name}/{address.address}
              </TextSmall>
            ) : (
              <TouchableOpacity onPress={() => navigation.navigate('Address')}>
                <TextSmall color={DANGER}>Set Address</TextSmall>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={{marginTop: responsive(16)}}>
          <TextMedium color={'black'} mb={16}>
            {' '}
            Kurir
          </TextMedium>
          <SelectInput
            value={courier}
            onChange={text => setCourier(text)}
            data={dataCourier}
            placeholder={'Pilih Kurir'}
          />
        </View>
      </View>
      <View style={[styles.card, {marginBottom: 16}]}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
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
        <View style={{flexDirection: 'row', marginBottom: 16}}>
          <TextMedium color={'black'}>Biaya Ongkir</TextMedium>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <TextMedium color={SECONDARY}>
              Rp. {formatCurrency(ongkir)}
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
          Rp.{formatCurrency(subTotal + ongkir)}
        </TextMedium>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <TouchableOpacity style={styles.btnCart} onPress={() => _submit()}>
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
  card: {
    marginTop: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
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
});
