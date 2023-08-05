/* eslint-disable react/no-unstable-nested-components */
import React, {useContext, useEffect, useMemo, useReducer} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Address,
  AddressCreate,
  AddressEdit,
  Cart,
  Checkout,
  Collection,
  Home,
  Otp,
  PasswordChange,
  Payment,
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
import {Appearance, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {switchMode} from '../redux/action/ThemeAction';
import {GRAY_MEDIUM, PRIMARY} from '../styles/colors';
import {FONT_FAMILY_REGULAR, FONT_SIZE_14} from '../styles/typography';
import {getData, removeData} from '../utils';
import {AuthContext} from '../helpers/Context';
import {axiosInstance} from '../helpers';
import {ToastCustom} from '../components/atoms';
import {clearNetworkError} from '../redux/action/NetworkAction';
import {
  getCart,
  getCity,
  getProductCollections,
  getProfile,
  getProvince,
  getUser,
} from '../redux/action';
import ProductSearch from '../pages/Product/ProductSearch';

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
  const disp = useDispatch();
  const {error} = useSelector(state => state.networkReducer);
  const {userLoading, userResult, userError} = useSelector(
    state => state.authReducer,
  );
  const colorScheme = Appearance.getColorScheme();
  disp(switchMode(colorScheme));
  const initialLoginState = {
    isLoading: true,
    userToken: null,
  };
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.userToken,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
        };
    }
  };
  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);
  const authContext = useMemo(
    () => ({
      signIn: async foundUser => {
        try {
          dispatch({
            type: 'LOGIN',
            userToken: foundUser,
          });
          disp(getUser());
        } catch (error) {}
      },
      signOut: async () => {
        try {
          removeData('token');
          dispatch({type: 'LOGOUT'});
        } catch (e) {}
      },
    }),
    [],
  );

  useEffect(() => {
    const _condition = async () => {
      let token = await getData('token');
      dispatch({
        type: 'LOGIN',
        userToken: token,
      });
      if (token) {
        disp(getUser());
      }
    };
    setTimeout(() => {
      _condition();
    }, 100);
  }, []);

  useEffect(() => {
    if (userResult) {
      disp(getProductCollections(userResult.id));
      disp(getCart(userResult.id));
      disp(getProfile(userResult.id));
      disp(getProvince());
      disp(getCity());
    }
  }, [userResult]);

  useEffect(() => {
    if (error == 401) {
      ToastCustom('success', 'Signout', `Please log back in`);
      authContext.signOut();
      disp(clearNetworkError());
    }
  }, [error]);

  if (loginState.isLoading) {
    return <View style={styles.pendingView} />;
  }
  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {loginState.userToken ? (
          <Stack.Screen name="MainFeature" component={MainFeature} />
        ) : (
          <Stack.Group>
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Otp" component={Otp} />
          </Stack.Group>
        )}
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
        <Stack.Screen name="Address" component={Address} />
        <Stack.Screen name="AddressCreate" component={AddressCreate} />
        <Stack.Screen name="AddressEdit" component={AddressEdit} />
        <Stack.Screen name="PasswordChange" component={PasswordChange} />
        <Stack.Screen name="ProductSearch" component={ProductSearch} />
        <Stack.Screen name="Payment" component={Payment} />
      </Stack.Navigator>
    </AuthContext.Provider>
  );
};

export default Router;
const styles = StyleSheet.create({
  pendingView: {backgroundColor: 'white', flex: 1},
});
