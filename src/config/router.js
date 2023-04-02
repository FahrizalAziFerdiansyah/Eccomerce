/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Address,
  AddressCreate,
  Cart,
  Checkout,
  Collection,
  Home,
  Otp,
  PasswordChange,
  ProductDetail,
  Profile,
  ProfileEdit,
  Signin,
  Signup,
} from '../pages/Index';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../styles';
import {responsive} from '../styles/mixins';
import {Appearance} from 'react-native';
import {useDispatch} from 'react-redux';
import {switchMode} from '../redux/action/ThemeAction';
import {GRAY_MEDIUM, PRIMARY} from '../styles/colors';
import {FONT_FAMILY_REGULAR, FONT_SIZE_14} from '../styles/typography';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const MainFeature = () => {
  var tabArr = [
    {
      route: 'Home',
      component: Home,
      icon: 'home',
    },
    {
      route: 'Collection',
      component: Collection,
      icon: 'heart',
    },
    {
      route: 'Profile',
      component: Profile,
      icon: 'user',
    },
  ];
  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveTintColor: GRAY_MEDIUM,
        activeTintColor: PRIMARY,
        style: {backgroundColor: PRIMARY},
      }}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: responsive(60),
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        },
        tabBarLabelStyle: {
          fontFamily: FONT_FAMILY_REGULAR,
          fontSize: FONT_SIZE_14,
          marginTop: -10,
          marginBottom: 10,
        },
        style: {
          backgroundColor: PRIMARY,
        },
        tabBarShowLabel: true,
      }}>
      {tabArr.map(item => (
        <Tab.Screen
          options={{
            tabBarIcon: ({color, focused}) => (
              <Icon
                name={item.icon}
                color={focused ? Colors.PRIMARY : color}
                size={26}
              />
            ),
          }}
          name={item.route}
          component={item.component}
        />
      ))}
    </Tab.Navigator>
  );
};

const Router = () => {
  const dispatch = useDispatch();
  const colorScheme = Appearance.getColorScheme();
  dispatch(switchMode(colorScheme));
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Otp" component={Otp} />
          <Stack.Screen name="MainFeature" component={MainFeature} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
          <Stack.Screen name="Address" component={Address} />
          <Stack.Screen name="AddressCreate" component={AddressCreate} />
          <Stack.Screen name="PasswordChange" component={PasswordChange} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Router;
