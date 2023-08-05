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
import {clearUpdateAddress, updateAddress} from '../../redux/action';

const AddressEdit = ({navigation, route}) => {
  var param = route.params;
  const dispatch = useDispatch();
  const {
    updateAddressLoading,
    updateAddressResult,
    updateAddressError,
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
    id: param.id,
    name: param.name,
    phone: param.phone,
    address: param.address,
    type: param.type,
    province_id: param.province_id,
    city_id: param.city_id,
    user_id: userResult.id,
  });

  const changeForm = (input, value) => {
    dispatch(clearUpdateAddress());
    setform({
      ...form,
      [input]: value,
    });
  };
  useEffect(() => {
    if (updateAddressResult) {
      let index = addressResult.data.findIndex(
        ({id}) => id == updateAddressResult.id,
      );
      addressResult.data[index] = updateAddressResult;
      ToastCustom('success', 'Success', 'Success create address');
      navigation.goBack();
    }
    return () => {
      dispatch(clearUpdateAddress());
    };
  }, [updateAddressResult]);
  const _submit = () => {
    dispatch(updateAddress(form));
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
      loading={updateAddressLoading}
      bg={'white'}
      label={'Add Address'}
      type={'detail'}>
      <View style={{flex: 1}}>
        <ScrollView>
          <Input
            value={form.type}
            error={updateAddressError.type}
            label={'Type'}
            placeholder={'Type'}
            onChange={text => changeForm('type', text)}
          />
          <Input
            value={form.name}
            error={updateAddressError.name}
            label={'Nama'}
            placeholder={'Nama'}
            onChange={text => changeForm('name', text)}
          />
          <InputPhone
            value={form.phone}
            error={updateAddressError.phone}
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
            value={form.address}
            error={updateAddressError.address}
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

export default AddressEdit;

const styles = StyleSheet.create({});
