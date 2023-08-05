import {StyleSheet, View} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';
import {Container} from '../../components/atoms';

const Index = ({route}) => {
  var param = route.params;
  return (
    <Container type={'detail'} label={'Payment'}>
      <WebView
        source={{
          uri: param.redirect_url,
        }}
        style={{marginTop: 20}}
      />
    </Container>
  );
};

export default Index;

const styles = StyleSheet.create({});
