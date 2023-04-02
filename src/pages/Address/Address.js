import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  ButtonAction,
  Container,
  TextMedium,
  TextSmall,
} from '../../components/atoms';
import {GRAY_LIGHT, GRAY_MEDIUM, PRIMARY} from '../../styles/colors';
import {FONT_SIZE_13, FONT_SIZE_14} from '../../styles/typography';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation, CommonActions} from '@react-navigation/native';

const Address = () => {
  const navigation = useNavigation();
  return (
    <Container type={'detail'} label={'List Address'}>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddressCreate')}
        style={{marginBottom: 16, alignSelf: 'flex-end'}}>
        <TextSmall fontSize={FONT_SIZE_14}>Add Address</TextSmall>
      </TouchableOpacity>

      <View style={styles.card}>
        <View style={{marginBottom: 32}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <TextMedium fontSize={FONT_SIZE_13}>Rumah</TextMedium>
            </View>
            <Icon color={PRIMARY} size={24} name="check" />
          </View>
          <TextMedium>Fahrizal Azi Ferdiansyah</TextMedium>
          <TextSmall>+62859180657182</TextSmall>
          <TextSmall>Jl. Darmokalu Gg. Irigasi No.87 </TextSmall>
        </View>
        <ButtonAction title={'Change Address'} />
      </View>
    </Container>
  );
};

export default Address;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderColor: GRAY_MEDIUM,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
