import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  ButtonAction,
  Container,
  TextMedium,
  TextSmall,
  ToastCustom,
} from '../../components/atoms';
import {GRAY_LIGHT, GRAY_MEDIUM, PRIMARY} from '../../styles/colors';
import {FONT_SIZE_13, FONT_SIZE_14} from '../../styles/typography';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {clearSetAddress, getAddress} from '../../redux/action';
import ListAddress from '../../components/molecules/ListAddress';
import {dispatchSuccess} from '../../utils';

const Address = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {userResult} = useSelector(state => state.authReducer);
  const {
    addressResult,
    deleteAddressLoading,
    addressLoading,
    setAddressResult,
    setAddressLoading,
  } = useSelector(state => state.profileReducer);

  useEffect(() => {
    dispatch(getAddress(userResult.id));

    return () => {
      dispatch(clearSetAddress());
    };
  }, []);

  useEffect(() => {
    if (setAddressResult) {
      ToastCustom('success', 'Success', 'Address default success changed');
      dispatchSuccess(dispatch, 'ADDRESS', {data: setAddressResult});
    }
  }, [setAddressResult]);

  return (
    <Container
      loading={addressLoading || setAddressLoading || deleteAddressLoading}
      type={'detail'}
      label={'List Address'}>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddressCreate')}
        style={{marginBottom: 16, alignSelf: 'flex-end'}}>
        <TextSmall fontSize={FONT_SIZE_14}>Add Address</TextSmall>
      </TouchableOpacity>
      <ListAddress data={addressResult.data} />
    </Container>
  );
};

export default Address;

const styles = StyleSheet.create({});
