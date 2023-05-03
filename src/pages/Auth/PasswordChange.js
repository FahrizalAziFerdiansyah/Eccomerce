import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonAction,
  Container,
  InputPassword,
  TextLarge,
  TextSmall,
  ToastCustom,
} from '../../components/atoms';
import {FONT_SIZE_14} from '../../styles/typography';
import {responsive} from '../../styles/mixins';
import {useDispatch, useSelector} from 'react-redux';
import {changePassword, clearChangePassword} from '../../redux/action';

const PasswordChange = () => {
  const {
    changePasswordResult,
    changePasswordError,
    changePasswordLoading,
    userResult,
  } = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const [form, setform] = useState({
    current_password: '',
    new_password: '',
  });
  const changeForm = (input, value) => {
    setform({
      ...form,
      [input]: value,
    });
  };
  const _submit = () => {
    form['user_id'] = userResult.id;
    dispatch(changePassword(form));
  };

  useEffect(() => {
    if (changePasswordResult) {
      ToastCustom('success', 'Success', changePasswordResult.message);
      dispatch(clearChangePassword());
    }
    return () => {
      dispatch(clearChangePassword());
    };
  }, [changePasswordResult]);

  return (
    <Container
      loading={changePasswordLoading}
      bg={'white'}
      type={'detail'}
      label={'Change Password'}>
      <View style={{flex: 1}}>
        <View style={{marginTop: responsive(16), marginBottom: responsive(32)}}>
          <TextLarge>Change Password</TextLarge>
          <TextSmall fontSize={FONT_SIZE_14}>
            Your new password must be different from previous used password
          </TextSmall>
        </View>
        <InputPassword
          error={changePasswordError?.current_password}
          onChange={text => changeForm('current_password', text)}
          label={'Current Password'}
          placeholder={'Current Password'}
        />

        <InputPassword
          error={changePasswordError?.new_password}
          onChange={text => changeForm('new_password', text)}
          label={'New Password'}
          placeholder={'New Password'}
        />
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <ButtonAction onPress={() => _submit()} title={'Submit'} />
      </View>
    </Container>
  );
};

export default PasswordChange;

const styles = StyleSheet.create({});
