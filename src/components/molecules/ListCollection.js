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
import Icon from 'react-native-vector-icons/FontAwesome';
import {DANGER, SECONDARY} from '../../styles/colors';
import {IconButton, TextMedium, TextSmall} from '../atoms';
import {responsive} from '../../styles/mixins';
import {FONT_SIZE_14} from '../../styles/typography';
import {formatCurrency} from '../../helpers';
import {useDispatch, useSelector} from 'react-redux';
import {addProductCollection} from '../../redux/action';

const ListCollection = ({data}) => {
  const navigation = useNavigation();
  const {
    productCollectionsLoading,
    productCollectionsResult,
    productCollectionPaginationResultPagination,
  } = useSelector(state => state.productReducer);
  const {userResult} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  var dataCollection = productCollectionsResult.data?.data;
  const deleteCollection = id => {
    dispatch(addProductCollection({user_id: userResult.id, product_id: id}));
    var indexProduct = dataCollection.findIndex(
      ({product_id}) => product_id == id,
    );
    var indexProductCollection =
      productCollectionPaginationResultPagination.findIndex(
        ({product}) => product.id == id,
      );
    if (indexProduct >= 0) {
      dataCollection.splice(indexProduct, 1);
      productCollectionPaginationResultPagination.splice(
        indexProductCollection,
        1,
      );
    }
  };
  const renderItem = ({item}) => {
    var product = item.product;
    return (
      <TouchableOpacity
        style={{marginBottom: responsive(16)}}
        onPress={() => navigation.navigate('ProductDetail', product)}>
        <View style={{flexDirection: 'row'}}>
          <Image
            resizeMode="stretch"
            style={styles.image}
            source={{
              uri: product?.image,
            }}
          />
          <View style={{marginLeft: responsive(16), flex: 1}}>
            <View>
              <TextSmall fontSize={FONT_SIZE_14} font>
                {product.name}
              </TextSmall>
              <TextMedium fontSize={FONT_SIZE_14} font>
                Rp. {formatCurrency(product.price)}
              </TextMedium>
            </View>
            <TextSmall>{product.description?.substring(1, 80)}...</TextSmall>
            <View
              style={{
                alignSelf: 'flex-end',
                justifyContent: 'flex-end',
                flex: 1,
              }}>
              <View style={{flexDirection: 'row'}}>
                <IconButton icon={'shopping-cart'} style={{marginRight: 10}} />
                <IconButton
                  onPress={() => deleteCollection(product.id)}
                  color={DANGER}
                  icon={'trash'}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
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
    width: responsive(120),
    height: responsive(120),
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
