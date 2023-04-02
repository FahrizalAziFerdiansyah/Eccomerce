import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {
  ButtonAction,
  Container,
  Input,
  InputPassword,
  TextLarge,
  TextMedium,
  TextSmall,
} from '../../components/atoms';
import {ImgLogin} from '../../assets';
import {responsive} from '../../styles/mixins';
import {FONT_SIZE_14, FONT_SIZE_16} from '../../styles/typography';
import {GRAY_DARK, PRIMARY} from '../../styles/colors';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {configGoogle} from '../../utils';

const Signin = () => {
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  useEffect(() => {
    GoogleSignin.configure(configGoogle);
  }, []);
  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {user} = await GoogleSignin.signIn();
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Container bg={'white'}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ImgLogin width={responsive(250)} height={responsive(250)} />
      </View>
      <View style={{marginBottom: 32}}>
        <TextLarge fontSize={responsive(34)}>{t('login:signIn')}</TextLarge>
        <TextSmall color={GRAY_DARK} fontSize={FONT_SIZE_16}>
          {t('login:descSignIn')}
        </TextSmall>
      </View>
      <Input label={'Phone'} placeholder={'Phone'} />
      <InputPassword label={'Password'} placeholder={'Password'} />

      <TouchableOpacity style={{alignSelf: 'flex-end'}}>
        <TextMedium> {t('login:forgotPassword')}?</TextMedium>
      </TouchableOpacity>

      <View style={{justifyContent: 'flex-end', flex: 1}}>
        <ButtonAction
          onPress={() => navigation.navigate('MainFeature')}
          title={'Login'}
        />
        <View
          style={{flexDirection: 'row', alignSelf: 'center', marginTop: 16}}>
          <TextSmall fontSize={FONT_SIZE_14}>
            {t('login:haventAccount')}
          </TextSmall>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <TextMedium fontSize={FONT_SIZE_14}>
              {t('login:createAccount')}
            </TextMedium>
          </TouchableOpacity>
          {/* <ButtonAction
            onPress={() => {
              _signIn();
            }}
            title={'Google'}
          /> */}
        </View>
      </View>
    </Container>
  );
};

export default Signin;

const styles = StyleSheet.create({});
