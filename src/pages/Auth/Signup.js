import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  ButtonAction,
  Container,
  Input,
  InputPassword,
  InputPhone,
  TextLarge,
  TextMedium,
  TextSmall,
} from '../../components/atoms';
import {responsive} from '../../styles/mixins';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';

const Signup = () => {
  const navigation = useNavigation();
  return (
    <Container label={'Signup'} type={'detail'} bg={'white'}>
      <ScrollView>
        <View style={{marginBottom: 16}}>
          <View style={{marginBottom: 4}}>
            <TextLarge>Create Account</TextLarge>
          </View>
          <TextSmall fontSize={responsive(16)}>
            Connect with your friends today!
          </TextSmall>
        </View>
        {/* <TextMedium></TextMedium> */}
        <Input label={'Email'} placeholder={'Email'} />
        <Input label={'Full Name'} placeholder={'Full Name'} />
        <InputPhone label={'Phone'} placeholder={'Phone'} />
        <InputPassword label={'Password'} placeholder={'Password'} />
        <InputPassword
          label={'Password Confirmation'}
          placeholder={'Password Confirmation'}
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox />
          <TextSmall fontSize={responsive(16)}>
            I agree to the terms and conditions{' '}
          </TextSmall>
        </View>
      </ScrollView>
      <View style={{justifyContent: 'flex-end'}}>
        <ButtonAction
          title={'Signup'}
          onPress={() => navigation.navigate('Otp')}
        />
      </View>
    </Container>
  );
};

export default Signup;

const styles = StyleSheet.create({});
