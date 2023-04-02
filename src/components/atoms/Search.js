import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';
import {responsive} from '../../styles/mixins';
import {GRAY, PRIMARY} from '../../styles/colors';
import {useSelector} from 'react-redux';
import {FONT_FAMILY_LIGHT, FONT_FAMILY_REGULAR} from '../../styles/typography';

const Search = () => {
  const {t, i18n} = useTranslation();
  const {theme} = useSelector(state => state.themeReducer);
  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={PRIMARY}
        style={{
          flex: 1,
          height: responsive(40),
          color: PRIMARY,
          fontFamily: FONT_FAMILY_REGULAR,
        }}
        placeholder={t('component:searchHere') + '...'}
      />
      <Icon name="search" color={GRAY} size={responsive(26)} />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
