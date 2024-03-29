import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonAction,
  Container,
  Input,
  InputArea,
  InputPhone,
  SelectInput,
  ToastCustom,
} from '../../components/atoms';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearStoreAddress,
  getCity,
  getProvince,
  storeAddress,
} from '../../redux/action';
import {dispatchSuccess} from '../../utils';

const AddressCreate = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    storeAddressLoading,
    storeAddressResult,
    storeAddressError,
    addressResult,
  } = useSelector(state => state.profileReducer);
  const {userResult} = useSelector(state => state.authReducer);
  const {
    getProvinceLoading,
    getProvinceResult,
    getCityLoading,
    getCityResult,
    getProvinceError,
  } = useSelector(state => state.ongkirReducer);
  const [city, setcity] = useState([]);
  const [form, setform] = useState({
    name: '',
    phone: '',
    address: '',
    type: '',
    province_id: '',
    city_id: '',
    user_id: userResult.id,
  });

  const changeForm = (input, value) => {
    dispatch(clearStoreAddress());
    setform({
      ...form,
      [input]: value,
    });
  };
  useEffect(() => {
    if (storeAddressResult) {
      addressResult.data.push(storeAddressResult);
      ToastCustom('success', 'Success', 'Success create address');
      navigation.goBack();
    }
    return () => {
      dispatch(clearStoreAddress());
    };
  }, [storeAddressResult]);
  const _submit = () => {
    dispatch(storeAddress(form));
  };

  useEffect(() => {
    if (form.province_id) {
      const tmpArr = getCityResult.filter(
        ({province_id}) => province_id == form.province_id,
      );
      setcity(tmpArr);
    }
  }, [form.province_id]);
  return (
    <Container
      loading={storeAddressLoading || getProvinceLoading || getCityLoading}
      bg={'white'}
      label={'Add Address'}
      type={'detail'}>
      <View style={{flex: 1}}>
        <ScrollView>
          <Input
            error={storeAddressError.type}
            label={'Type'}
            placeholder={'Type'}
            onChange={text => changeForm('type', text)}
          />
          <Input
            error={storeAddressError.name}
            label={'Nama'}
            placeholder={'Nama'}
            onChange={text => changeForm('name', text)}
          />
          <InputPhone
            error={storeAddressError.phone}
            label={'Phone'}
            placeholder={'Phone'}
            onChange={text => changeForm('phone', text)}
          />
          <SelectInput
            value={form.province_id}
            customKey={['province', 'province_id']}
            label={'Provinsi'}
            isSearch={true}
            placeholder={'Pilih Provinsi'}
            data={getProvinceResult}
            onChange={text => changeForm('province_id', text)}
          />
          {form.province_id && (
            <SelectInput
              value={form.city_id}
              customKey={['city_name', 'city_id']}
              label={'Kota'}
              isSearch={true}
              placeholder={'Pilih Kota'}
              data={city}
              onChange={text => changeForm('city_id', text)}
            />
          )}
          <InputArea
            error={storeAddressError.address}
            label={'Address'}
            placeholder={'Address'}
            onChange={text => changeForm('address', text)}
          />
        </ScrollView>
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <ButtonAction title={'Submit'} onPress={() => _submit()} />
      </View>
    </Container>
  );
};

export default AddressCreate;

const styles = StyleSheet.create({});
