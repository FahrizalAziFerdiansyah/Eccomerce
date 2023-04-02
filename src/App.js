import React from 'react';
import store from './redux/reducers/store';
import './language/IMLocalize';
import {Provider} from 'react-redux';
import Router from './config/router';
import {LogBox} from 'react-native';

const App = () => {
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
