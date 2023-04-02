import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IconButton, TextMedium, TextSmall} from '../atoms';
import {responsive} from '../../styles/mixins';
import {FONT_SIZE_14} from '../../styles/typography';
import {DANGER, GRAY, GRAY_LIGHT} from '../../styles/colors';
import {formatCurrency} from '../../helpers';

const ListCollection = ({data}) => {
  const navigation = useNavigation();
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{
        marginBottom: responsive(10),
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 8,
      }}
      onPress={() => navigation.navigate('ProductDetail', item)}>
      <View style={{flexDirection: 'row'}}>
        <Image
          resizeMode="stretch"
          style={styles.image}
          source={{
            uri: item.image,
          }}
        />
        <View style={{marginLeft: responsive(16), flex: 1}}>
          <View>
            <TextSmall color={GRAY}>Kategori</TextSmall>
            <TextMedium fontSize={FONT_SIZE_14}>{item.name}</TextMedium>
          </View>
          <TextMedium fontSize={FONT_SIZE_14}>
            Rp. {formatCurrency(item.price)}
          </TextMedium>
          <View
            style={{
              justifyContent: 'flex-end',
              flex: 1,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <IconButton backgroundColor={GRAY_LIGHT} icon={'minus'} />
                <View style={{marginHorizontal: 8}}>
                  <TextMedium>1</TextMedium>
                </View>
                <IconButton backgroundColor={GRAY_LIGHT} icon={'plus'} />
              </View>
              <View
                style={{
                  justifyContent: 'flex-end',
                  alignSelf: 'flex-end',
                  flex: 1,
                }}>
                <IconButton
                  style={{alignSelf: 'flex-end'}}
                  color={DANGER}
                  icon={'trash'}
                  backgroundColor={GRAY_LIGHT}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      data={data}
    />
  );
};

export default ListCollection;

const styles = StyleSheet.create({
  image: {
    width: responsive(100),
    height: responsive(100),
    alignItems: 'flex-end',
    borderRadius: 6,
  },
  cardLove: {
    backgroundColor: 'white',
    padding: 8,
    margin: 10,
    borderRadius: 10,
  },
});
