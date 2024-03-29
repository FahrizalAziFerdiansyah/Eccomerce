import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {TextMedium, TextSmall, ToastCustom} from '../atoms';
import {FONT_SIZE_14} from '../../styles/typography';
import {responsive} from '../../styles/mixins';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DANGER, PRIMARY, SECONDARY} from '../../styles/colors';
import {useNavigation} from '@react-navigation/native';
import {formatCurrency} from '../../helpers';
import {useDispatch, useSelector} from 'react-redux';
import {dispatchSuccess} from '../../utils';
import {addProductCollection} from '../../redux/action';
import Animated, {FadeIn, SlideInRight} from 'react-native-reanimated';

const ListProduct = ({data, loading}) => {
  const {mode} = useSelector(state => state.themeReducer);
  const {
    productCollectionsResult,
    addProductCollectionResult,
    productCollectionPaginationResultPagination,
  } = useSelector(state => state.productReducer);
  const {userLoading, userResult, userError} = useSelector(
    state => state.authReducer,
  );
  var dataCollection = productCollectionsResult.data?.data;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const addCollection = item => {
    dispatch(
      addProductCollection({user_id: userResult.id, product_id: item.id}),
    );
    var indexProduct = dataCollection.findIndex(
      ({product_id}) => product_id == item.id,
    );
    var indexProductCollection =
      productCollectionPaginationResultPagination.findIndex(
        ({product}) => product.id == item.id,
      );
    if (indexProduct >= 0) {
      dataCollection.splice(indexProduct, 1);
      productCollectionPaginationResultPagination.splice(
        indexProductCollection,
        1,
      );
    } else {
      dataCollection.push({product_id: item.id});
      productCollectionPaginationResultPagination.push({
        product: item,
      });
    }
  };
  useEffect(() => {
    if (addProductCollectionResult) {
      ToastCustom('success', 'Success', addProductCollectionResult.message);
    }
  }, [addProductCollectionResult]);
  const renderItem = ({item, index}) => {
    var available = [];
    if (productCollectionsResult) {
      available = dataCollection.filter(
        ({product_id}) => product_id == item.id,
      );
    }
    return (
      <Animated.View
        entering={SlideInRight.delay(index * 100)}
        onPress={() => navigation.navigate('ProductDetail', item)}>
        <ImageBackground
          imageStyle={{borderRadius: 16}}
          resizeMode="stretch"
          style={styles.image}
          source={{
            uri: item.image,
          }}>
          <TouchableOpacity
            style={styles.cardLove}
            onPress={() => {
              addCollection(item);
            }}>
            <Icon
              size={16}
              color={available.length ? DANGER : SECONDARY}
              name={available.length ? 'heart' : 'heart-o'}
            />
          </TouchableOpacity>
        </ImageBackground>
        <View style={{marginTop: responsive(12)}}>
          <TextSmall fontSize={FONT_SIZE_14} font>
            {item.name}
          </TextSmall>
          <TextMedium fontSize={FONT_SIZE_14} font>
            Rp. {formatCurrency(item.price)}
          </TextMedium>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {loading ? (
        <ActivityIndicator
          color={mode == 'light' ? PRIMARY : 'white'}
          size={'large'}
        />
      ) : (
        <Animated.View entering={FadeIn}>
          <FlatList
            columnWrapperStyle={{
              justifyContent: 'space-around',
              marginBottom: 16,
            }}
            numColumns={2}
            renderItem={renderItem}
            data={data}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <TextSmall textAlign={'center'}>Product Empty</TextSmall>
            }
          />
        </Animated.View>
      )}
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
