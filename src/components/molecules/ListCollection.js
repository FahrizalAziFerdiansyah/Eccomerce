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
import {IconButton, TextMedium, TextSmall, ToastCustom} from '../atoms';
import {responsive} from '../../styles/mixins';
import {FONT_SIZE_14} from '../../styles/typography';
import {formatCurrency} from '../../helpers';
import {useDispatch, useSelector} from 'react-redux';
import {addProductCollection, storeCart} from '../../redux/action';
import Animated, {FadeIn, SlideInRight} from 'react-native-reanimated';

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
  const _addCart = item => {
    let product = item.product;
    if (product.stock > 1) {
      var data = {
        product_id: product.id,
        user_id: userResult.id,
        amount: 1,
      };
      dispatch(storeCart(data));
      navigation.navigate('Cart');
    } else {
      ToastCustom('error', 'Failed', 'Stock not enough!');
    }
  };
  const renderItem = ({item, index}) => {
    console.log(index);
    var product = item.product;
    return (
      <Animated.View
        entering={SlideInRight.delay(index * 100)}
        style={{marginBottom: responsive(16)}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductDetail', product)}
          style={{flexDirection: 'row'}}>
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
                <IconButton
                  onPress={() => _addCart(item)}
                  icon={'shopping-cart'}
                  style={{marginRight: 10}}
                />
                <IconButton
                  onPress={() => deleteCollection(product.id)}
                  color={DANGER}
                  icon={'trash'}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        data={data}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <TextSmall textAlign={'center'}>Collection Empty</TextSmall>
          </View>
        }
      />
    </View>
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
