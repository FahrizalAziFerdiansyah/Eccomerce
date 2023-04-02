import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {TextMedium, TextSmall} from '../atoms';
import {FONT_SIZE_14} from '../../styles/typography';
import {responsive} from '../../styles/mixins';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SECONDARY} from '../../styles/colors';
import {useNavigation} from '@react-navigation/native';

const ListProduct = ({data}) => {
  const navigation = useNavigation();
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{marginRight: 16}}
      onPress={() => navigation.navigate('ProductDetail', item)}>
      <ImageBackground
        imageStyle={{borderRadius: 16}}
        resizeMode="stretch"
        style={styles.image}
        source={{
          uri: item.image,
        }}>
        <TouchableOpacity style={styles.cardLove}>
          <Icon size={16} color={SECONDARY} name="heart-o" />
        </TouchableOpacity>
      </ImageBackground>
      <View style={{marginTop: responsive(12)}}>
        <TextSmall fontSize={FONT_SIZE_14} font>
          {item.name}
        </TextSmall>
        <TextMedium fontSize={FONT_SIZE_14} font>
          Rp. {item.price}
        </TextMedium>
      </View>
    </TouchableOpacity>
  );
  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={renderItem}
        data={data}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ListProduct;

const styles = StyleSheet.create({
  image: {
    width: responsive(150),
    height: responsive(160),
    alignItems: 'flex-end',
  },
  cardLove: {
    backgroundColor: 'white',
    padding: 8,
    margin: 10,
    borderRadius: 10,
  },
});
