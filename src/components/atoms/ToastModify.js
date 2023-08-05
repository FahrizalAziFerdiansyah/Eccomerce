import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, Mixins, Typography} from '../../styles';
import TextMedium from './TextMedium';
import TextSmall from './TextSmall';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import IconButton from './IconButton';
import {PRIMARY} from '../../styles/colors';

const ToastModify = ({data, type}) => {
  const navigation = useNavigation();
  const width = new Animated.Value(data.isVisible ? 0 : 1);
  var color = '';
  var icon = '';
  var press = '';
  switch (type) {
    case 'error':
      color = Colors.GRAY_PRIMARY;
      icon = 'information-circle-sharp';
      break;
    case 'notif':
      color = Colors.GRAY_PRIMARY;
      icon = 'notifications-circle';
      press = true;
      break;
    default:
      color = Colors.PRIMARY;
      icon = 'checkmark-circle-sharp';
      break;
  }
  Animated.timing(width, {
    toValue: 1,
    duration: 4000,
    easing: Easing.linear,
  }).start();
  const onPress = () => {
    Toast.hide();
    navigation.navigate('Notification');
  };
  return (
    <Pressable
      onPress={() => press && onPress()}
      style={[styles.container, styles.shadow]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Icon
          color={color}
          style={{marginLeft: 16}}
          name={icon}
          size={Mixins.responsive(40)}
        />
        <View style={{padding: 16, borderRadius: 8, flex: 1}}>
          <TextMedium
            color={PRIMARY}
            style={{fontFamily: Typography.FONT_FAMILY_BOLD}}>
            {data.text1}
          </TextMedium>
          <TextSmall color={PRIMARY}>{data.text2}</TextSmall>
        </View>
        <View style={{justifyContent: 'flex-end', marginRight: 16}}>
          <IconButton
            color={Colors.GRAY_DARK}
            onPress={() => Toast.hide()}
            icon={'close'}
          />
        </View>
      </View>
      <Animated.View
        style={[
          styles.line(color),
          {
            width: width.interpolate({
              inputRange: [0, 1],
              outputRange: ['100%', '0%'],
            }),
          },
        ]}
      />
    </Pressable>
  );
};

export default ToastModify;

const styles = StyleSheet.create({
  container: {
    minHeight: Mixins.responsive(70),
    width: '90%',
    borderRadius: 4,
    backgroundColor: 'white',
  },
  shadow: {
    elevation: 4,
    shadowColor: Colors.PRIMARY,
  },
  line: color => ({
    borderBottomColor: color,
    borderBottomWidth: 5,
    justifyContent: 'flex-end',
    flex: 1,
  }),
});
