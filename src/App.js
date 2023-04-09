import React from 'react';
import store from './redux/reducers/store';
import './language/IMLocalize';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import Router from './config/router';
import {LogBox} from 'react-native';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {ToastModify} from './components/atoms';

const App = () => {
  const toastConfig = {
    success: props => <ToastModify data={props} type={'success'} />,

    error: props => <ToastModify data={props} type={'error'} />,

    info: props => <ToastModify data={props} type={'info'} />,

    notif: props => <ToastModify data={props} type={'notif'} />,
  };
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router />
        <Toast config={toastConfig} />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
