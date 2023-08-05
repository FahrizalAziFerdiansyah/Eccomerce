import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {clearLogin, login} from '../../redux/action/AuthAction';
import {AuthContext} from '../../helpers/Context';
import {getProductCollections} from '../../redux/action';

const Signin = () => {
  const {t, i18n} = useTranslation();
  const {signIn} = useContext(AuthContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {loginLoading, loginResult, loginError} = useSelector(
    state => state.authReducer,
  );
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

  const [form, setform] = useState({
    phone: '',
    password: '',
  });

  const changeForm = (input, value) => {
    dispatch(clearLogin());
    setform({
      ...form,
      [input]: value,
    });
  };

  useEffect(() => {
    if (loginResult) {
      signIn(loginResult.token);
    }
    return () => {
      dispatch(clearLogin());
    };
  }, [loginResult]);

  const _submit = () => {
    dispatch(login(form));
  };

  console.log(loginLoading);
  return (
    <Container loading={loginLoading} bg={'white'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <ImgLogin width={responsive(250)} height={responsive(250)} />
        </View>
        <View style={{marginBottom: 32}}>
          <TextLarge fontSize={responsive(34)}>{t('login:signIn')}</TextLarge>
          <TextSmall color={GRAY_DARK} fontSize={FONT_SIZE_16}>
            {t('login:descSignIn')}
          </TextSmall>
        </View>
        <Input
          onChange={text => changeForm('phone', text)}
          label={'Phone'}
          placeholder={'Phone'}
          error={loginError?.phone}
        />

        <InputPassword
          onChange={text => changeForm('password', text)}
          label={'Password'}
          placeholder={'Password'}
          error={loginError?.password}
        />

        <TouchableOpacity
          style={{alignSelf: 'flex-end', marginBottom: responsive(16)}}>
          <TextMedium> {t('login:forgotPassword')}?</TextMedium>
        </TouchableOpacity>
      </ScrollView>
      <View style={{justifyContent: 'flex-end'}}>
        <ButtonAction onPress={() => _submit()} title={'Login'} />
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
