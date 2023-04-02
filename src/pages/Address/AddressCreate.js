import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  ButtonAction,
  Container,
  Input,
  InputArea,
  InputPhone,
} from '../../components/atoms';

const AddressCreate = () => {
  return (
    <Container bg={'white'} label={'Add Address'} type={'detail'}>
      <View style={{flex: 1}}>
        <Input label={'Nama'} placeholder={'Nama'} />
        <InputPhone label={'Phone'} placeholder={'Phone'} />
        <InputArea label={'Address'} placeholder={'Address'} />
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <ButtonAction title={'Submit'} />
      </View>
    </Container>
  );
};

export default AddressCreate;

const styles = StyleSheet.create({});
