import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  Container,
  TextLarge,
  TextMedium,
  TextSmall,
} from '../../components/atoms';
import {ImgProfile} from '../../assets';
import {responsive} from '../../styles/mixins';
import {GRAY, GRAY_DARK, GRAY_LIGHT, PRIMARY} from '../../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation, CommonActions} from '@react-navigation/native';

const Menu = ({label, value, border = true, mb = true}) => {
  return (
    <View style={styles.valueMenu(border, mb)}>
      <TextMedium>{label}</TextMedium>
      <View style={styles.rightMenu}>
        <View style={{marginRight: 4}}>
          <TextMedium color={GRAY_DARK}>{value}</TextMedium>
        </View>
        {/* <Icon color={GRAY_DARK} name="chevron-right" /> */}
      </View>
    </View>
  );
};
const MenuColor = ({label, value, color, icon, mb = true, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.valueMenu(false, mb)}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: color || GRAY,
            padding: 10,
            paddingHorizontal: 12,
            borderRadius: 10,
            marginRight: 16,
          }}>
          <Icon color={'white'} name={icon} />
        </View>
        <TextMedium>{label}</TextMedium>
      </View>
      <View style={styles.rightMenu}>
        <Icon color={PRIMARY} name="chevron-right" />
      </View>
    </TouchableOpacity>
  );
};
const Profile = () => {
  const navigation = useNavigation();
  return (
    <Container type={'navbar'}>
      <View style={{alignItems: 'center', marginTop: 16}}>
        <ImgProfile width={responsive(100)} height={responsive(100)} />
        <View style={{marginBottom: 32, alignItems: 'center'}}>
          <TextMedium fontSize={responsive(20)}>Fahrizal Azi</TextMedium>
          <TextSmall>Phone : 0859180657182</TextSmall>
        </View>
        <View style={styles.cardMenu}>
          <Menu label={'Email'} value={'fahrizaldev@gmail.com'} />
          <Menu label={'Date of birth'} value={'20-10-1999'} />
          <Menu label={'Gender'} value={'Male'} border={false} mb={false} />
        </View>
        <View style={[styles.cardMenu, {marginVertical: 16}]}>
          <MenuColor
            onPress={() => navigation.navigate('ProfileEdit')}
            icon={'pencil'}
            color={'#81ecec'}
            label={'Edit Profile'}
          />
          <MenuColor
            onPress={() => navigation.navigate('PasswordChange')}
            icon={'unlock'}
            color={'#fab1a0'}
            label={'Change Password'}
          />
          <MenuColor
            onPress={() => navigation.navigate('Address')}
            icon={'home'}
            color={'#a29bfe'}
            label={'Address'}
          />
          <MenuColor icon={'question'} label={'Help'} mb={false} />
        </View>
        <View style={[styles.cardMenu, {marginVertical: 16}]}>
          <MenuColor
            mb={false}
            icon={'sign-out'}
            color={'#ff7675'}
            label={'Sign Out'}
            onPress={() =>
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{name: 'Signin'}],
                }),
              )
            }
          />
        </View>
      </View>
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({
  cardMenu: {
    backgroundColor: 'white',
    width: '100%',
    padding: 16,
    borderRadius: 16,
  },
  valueMenu: (border, mb) => ({
    flexDirection: 'row',
    borderBottomColor: GRAY_LIGHT,
    borderBottomWidth: border ? 1 : 0,
    paddingBottom: border ? 16 : 0,
    marginBottom: mb ? 16 : 0,
  }),
  rightMenu: {
    justifyContent: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderEndColor: GRAY,
  },
});