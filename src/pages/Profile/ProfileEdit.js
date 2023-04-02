import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  ButtonAction,
  Container,
  DateTime,
  IconButton,
  Input,
  InputPhone,
  SelectInput,
} from '../../components/atoms';
import {ImgProfile} from '../../assets';
import {responsive} from '../../styles/mixins';

const ProfileEdit = () => {
  return (
    <Container bg={'white'} label={'Edit Profile'} type={'detail'}>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <ImgProfile width={responsive(100)} height={responsive(100)} />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              paddingLeft: responsive(50),
            }}>
            <IconButton icon={'camera'} />
          </View>
        </View>
        <Input label={'Full Name'} placeholder={'Full Name'} />
        <InputPhone label={'Phone'} placeholder={'Phone'} />
        <DateTime label={'Date of Birth'} placeholder={'Date of Birth'} />
        <SelectInput label={'Gender'} placeholder={'Select Gender'} />
      </ScrollView>
      <View style={{justifyContent: 'flex-end'}}>
        <ButtonAction title={'Submit'} />
      </View>
    </Container>
  );
};

export default ProfileEdit;

const styles = StyleSheet.create({});
