import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonAction,
  Container,
  DateTime,
  IconButton,
  Input,
  InputPhone,
  SelectInput,
  ToastCustom,
} from '../../components/atoms';
import {ImgProfile} from '../../assets';
import {responsive} from '../../styles/mixins';
import {useDispatch, useSelector} from 'react-redux';
import {dataGender, dispatchSuccess} from '../../utils';
import {clearStoreProfile, getProfile, storeProfile} from '../../redux/action';

const ProfileEdit = ({navigation}) => {
  const {
    profileResult,
    profileLoading,
    storeProfileResult,
    storeProfileError,
    storeProfileLoading,
  } = useSelector(state => state.profileReducer);
  const {userResult} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  const [form, setform] = useState({
    user_id: userResult.id,
    name: userResult.name,
    phone: userResult.phone,
    date_of_birth: '',
    gender: '',
  });
  const changeForm = (input, value) => {
    setform({
      ...form,
      [input]: value,
    });
  };
  const _submit = () => {
    dispatch(storeProfile(form));
  };
  useEffect(() => {
    dispatch(getProfile(userResult.id));
  }, []);

  useEffect(() => {
    if (profileResult) {
      const {created_at, updated_at, ...rest} = profileResult;
      const {name, phone} = userResult;
      const tmp = {name, phone, ...rest};
      setform(tmp);
    }
  }, [profileResult]);

  useEffect(() => {
    if (storeProfileResult) {
      console.log(storeProfileResult);
      dispatchSuccess(dispatch, 'PROFILE', storeProfileResult);
      ToastCustom('success', 'Success', 'Success edited profile!');
      dispatch(clearStoreProfile());
      navigation.goBack();
    }
  }, [storeProfileResult]);

  return (
    <Container
      loading={profileLoading || storeProfileLoading}
      bg={'white'}
      label={'Edit Profile'}
      type={'detail'}>
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
        <Input
          onChange={text => changeForm('name', text)}
          value={form.name}
          label={'Full Name'}
          placeholder={'Full Name'}
        />
        <InputPhone
          onChange={text => changeForm('phone', text)}
          value={form.phone}
          label={'Phone'}
          placeholder={'Phone'}
        />
        <DateTime
          onChange={text => changeForm('date_of_birth', text)}
          value={form.date_of_birth}
          label={'Date of Birth'}
          placeholder={'Date of Birth'}
        />
        <SelectInput
          onChange={text => changeForm('gender', text)}
          data={dataGender}
          label={'Gender'}
          placeholder={'Select Gender'}
          value={form.gender}
        />
      </ScrollView>
      <View style={{justifyContent: 'flex-end'}}>
        <ButtonAction onPress={() => _submit()} title={'Submit'} />
      </View>
    </Container>
  );
};

export default ProfileEdit;

const styles = StyleSheet.create({});
