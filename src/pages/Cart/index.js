import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Container, TextMedium, TextSmall} from '../../components/atoms';
import {ListCart} from '../../components/molecules';
import {dataProduct} from '../../utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  GRAY,
  GRAY_DARK,
  GRAY_LIGHT,
  PRIMARY,
  SECONDARY,
} from '../../styles/colors';
import {FONT_SIZE_16, FONT_SIZE_20} from '../../styles/typography';
import {responsive} from '../../styles/mixins';
import {useNavigation} from '@react-navigation/native';

const Index = () => {
  const navigation = useNavigation();
  var dataCart = dataProduct.splice(0, 3);
  return (
    <Container label={'My Chart'} type={'detail'}>
      <View style={{flex: 1}}>
        <ListCart data={dataCart} />
      </View>
      <View style={styles.card}>
        <View style={{flexDirection: 'row'}}>
          <TextMedium>Address</TextMedium>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <TextMedium color={SECONDARY}>Rp. 250,000</TextMedium>
          </View>
        </View>
      </View>
      <View style={[styles.card, {marginBottom: 16}]}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: GRAY_LIGHT,
            paddingBottom: 16,
            marginBottom: 16,
          }}>
          <TextMedium>Order Summary</TextMedium>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 16}}>
          <TextMedium>Subtotal</TextMedium>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <TextMedium color={SECONDARY}>Rp. 250,000</TextMedium>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TextMedium>Jumlah</TextMedium>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <TextMedium color={SECONDARY}>2 Pax</TextMedium>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <TextMedium color={SECONDARY} fontSize={FONT_SIZE_20}>
          Rp. 500.0000
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
