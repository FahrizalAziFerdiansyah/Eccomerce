import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {responsive} from '../../styles/mixins';
import {useSelector} from 'react-redux';
import {GRAY_LIGHT, PRIMARY, SECONDARY} from '../../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import TextMedium from './TextMedium';
import {FONT_SIZE_16, FONT_SIZE_20} from '../../styles/typography';
import Animated, {
  SlideInRight,
  Layout,
  SlideOutRight,
  FadeIn,
} from 'react-native-reanimated';

const Container = ({children, type, label, loading, bg}) => {
  const navigation = useNavigation();
  const {mode} = useSelector(state => state.themeReducer);
  if (type == 'detail') {
    return (
      <SafeAreaView style={styles.container(bg, mode)}>
        {loading && (
          <ActivityIndicator
            color={PRIMARY}
            size={'large'}
            style={styles.loading}
          />
        )}
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.btnBack}>
              <Icon size={12} color={SECONDARY} name="chevron-left" />
            </TouchableOpacity>
            {label && (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <TextMedium fontSize={FONT_SIZE_20}>{label}</TextMedium>
              </View>
            )}
          </View>
          <View style={{marginTop: 16, flex: 1, paddingBottom: responsive(16)}}>
            {children}
          </View>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView
      style={[styles.container(bg, mode), {paddingBottom: responsive(16)}]}>
      {loading && (
        <Animated.View style={{zIndex: 100}} entering={FadeIn}>
          <ActivityIndicator
            color={PRIMARY}
            size={'large'}
            style={styles.loading}
          />
        </Animated.View>
      )}
      <Animated.View
        entering={FadeIn.delay(100)}
        style={{flex: 1, marginBottom: type == 'navbar' ? responsive(50) : 0}}>
        {children}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: (bg, mode) => ({
    paddingTop: responsive(16),
    paddingHorizontal: responsive(16),
    backgroundColor: mode == 'light' ? bg || GRAY_LIGHT : PRIMARY,
    flex: 1,
  }),
  btnBack: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    padding: responsive(12),
    borderRadius: responsive(10),
  },
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 100,
  },
});
export default Container;
