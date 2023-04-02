import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  ButtonAction,
  Container,
  InputPassword,
  TextLarge,
  TextSmall,
} from '../../components/atoms';
import {FONT_SIZE_14} from '../../styles/typography';
import {responsive} from '../../styles/mixins';

const PasswordChange = () => {
  return (
    <Container bg={'white'} type={'detail'} label={'Change Password'}>
      <View style={{flex: 1}}>
        <View style={{marginTop: responsive(16), marginBottom: responsive(32)}}>
          <TextLarge>Change Password</TextLarge>
          <TextSmall fontSize={FONT_SIZE_14}>
            Your new password must be different from previous used password
          </TextSmall>
        </View>
        <InputPassword
          label={'Current Password'}
          placeholder={'Current Password'}
        />
        <InputPassword label={'New Password'} placeholder={'New Password'} />
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <ButtonAction title={'Submit'} />
      </View>
    </Container>
  );
};

export default PasswordChange;

const styles = StyleSheet.create({});
