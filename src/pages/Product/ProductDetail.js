import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Container,
  TextMedium,
  TextSmall,
  ToastCustom,
} from '../../components/atoms';
import {dataProduct} from '../../utils';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {responsive} from '../../styles/mixins';
import {DANGER, GRAY, PRIMARY, SECONDARY} from '../../styles/colors';
import {
  FONT_SIZE_14,
  FONT_SIZE_16,
  FONT_SIZE_20,
} from '../../styles/typography';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ListRecomendation} from '../../components/molecules';
import {useDispatch, useSelector} from 'react-redux';
import {
  addProductCollection,
  clearStoreCart,
  showProduct,
  storeCart,
} from '../../redux/action';
import {formatCurrency} from '../../helpers';

const ProductDetail = ({route, navigation}) => {
  const {
    showProductResult,
    showProductLoading,
    productCollectionsResult,
    productCollectionPaginationResultPagination,
  } = useSelector(state => state.productReducer);
  const {userLoading, userResult, userError} = useSelector(
    state => state.authReducer,
  );
  const {storeCartError, storeCartLoading, storeCartResult, cartResult} =
    useSelector(state => state.cartReducer);
  var param = route.params;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showProduct(param.id));
  }, []);

  const horizontalMargin = 20;
  const slideWidth = 280;

  const sliderWidth = Dimensions.get('window').width;
  const itemWidth = slideWidth + horizontalMargin * 2;

  const [active, setActive] = useState(0);
  var dataCollection = productCollectionsResult.data?.data;
  var collection = dataCollection.filter(
    ({product_id}) => product_id == param.id,
  );
  const manageCollection = item => {
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
  const _addToCart = () => {
    if (showProductResult.stock > 1) {
      var data = {
        product_id: showProductResult.id,
        user_id: userResult.id,
        amount: 1,
      };
      dispatch(storeCart(data));
    }
  };
  useEffect(() => {
    if (storeCartResult) {
      if (cartResult) {
        var check = cartResult.data.findIndex(
          ({product_id}) => product_id == storeCartResult.product_id,
        );
        cartResult.data[check] = storeCartResult;
      }
      dispatch(clearStoreCart());
      navigation.navigate('Cart');
    }
  }, [storeCartResult]);

  useEffect(() => {
    if (storeCartError) {
      ToastCustom('error', 'Failed', storeCartError);
      dispatch(clearStoreCart());
    }
  }, [storeCartError]);

  const _renderItem = ({item, index}) => {
    return (
      <View style={styles.slide}>
        <Image
          resizeMode="stretch"
          style={{width: '100%', height: responsive(300)}}
          source={{uri: item.image}}
        />
      </View>
    );
  };
  return (
    <Container type={'detail'} loading={showProductLoading || storeCartLoading}>
      <View style={{flex: 1, marginBottom: 16}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Carousel
            data={dataProduct}
            renderItem={_renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            onSnapToItem={index => setActive(index)}
          />
          <Pagination
            containerStyle={{marginVertical: -12}}
            dotsLength={dataProduct.length}
            activeDotIndex={active}
            dotStyle={styles.dot}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
          <View>
            <TextSmall>Kategori</TextSmall>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextMedium fontSize={FONT_SIZE_20}>
                {showProductResult.name}
              </TextMedium>
              <View style={{flex: 1}}>
                <TextSmall textAlign={'right'}>
                  {showProductResult.stock} Pcs
                </TextSmall>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 8,
                alignItems: 'center',
              }}>
              <Icon color={SECONDARY} name="star-o" size={20} />
              <View style={{marginHorizontal: 6}}>
                <TextMedium fontSize={FONT_SIZE_14}>4.4</TextMedium>
              </View>
              <TextSmall>(210 reviews)</TextSmall>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={() => manageCollection(param)}>
                  <Icon
                    size={20}
                    color={collection.length ? DANGER : SECONDARY}
                    name={collection.length ? 'heart' : 'heart-o'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{marginTop: 16}}>
            <View style={{marginBottom: 10}}>
              <TextMedium fontSize={FONT_SIZE_16}>
                Product Description
              </TextMedium>
            </View>
            <TextSmall>{showProductResult.description}</TextSmall>
          </View>
          <View style={{marginTop: 16}}>
            <View style={{marginBottom: 10}}>
              <TextMedium fontSize={FONT_SIZE_16}>You may also like</TextMedium>
            </View>
            <ListRecomendation data={dataProduct} />
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <TextMedium color={PRIMARY} fontSize={FONT_SIZE_20}>
          Rp. {formatCurrency(showProductResult.price)}
        </TextMedium>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={() => _addToCart()} style={styles.btnCart}>
            <View style={{marginRight: 16}}>
              <Icon color={'white'} size={26} name="shopping-cart" />
            </View>
            <TextSmall color={'white'} fontSize={FONT_SIZE_16}>
              Add to cart
            </TextSmall>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: -8,
    backgroundColor: GRAY,
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    marginHorizontal: -16,
    marginBottom: responsive(-16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnCart: {
    flexDirection: 'row',
    backgroundColor: PRIMARY,
    padding: 16,
    borderRadius: 16,
    width: responsive(200),
    justifyContent: 'center',
  },
});
