import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Cart,
  Container,
  Search,
  TextLarge,
  TextMedium,
  TextSmall,
} from '../../components/atoms';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {GRAY, GRAY_LIGHT, PRIMARY, SECONDARY} from '../../styles/colors';
import {responsive} from '../../styles/mixins';
import {ListCategory} from '../../components/molecules';
import ListProduct from '../../components/molecules/ListProduct';
import {FONT_SIZE_16, FONT_SIZE_20} from '../../styles/typography';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Banner1, Banner2, Banner3} from '../../assets';
import {getProductCategories, getProducts} from '../../redux/action';
import Animated, {
  SlideInRight,
  Layout,
  SlideOutRight,
} from 'react-native-reanimated';

const Home = (props, {navigation}) => {
  const dispatch = useDispatch();
  const [dataProduct, setdataProduct] = useState();
  const {mode} = useSelector(state => state.themeReducer);
  const {productCategoriesResult, productsLoading, productsResult} =
    useSelector(state => state.productReducer);

  const {t, i18n} = useTranslation();

  const sliderWidth = Dimensions.get('window').width;
  const slideWidth = sliderWidth - 40;
  const itemWidth = slideWidth;
  const dataImage = [Banner1, Banner2, Banner3];
  const [active, setActive] = useState(0);

  useEffect(() => {
    dispatch(getProductCategories());
    dispatch(getProducts());
  }, []);

  const _searchProduct = text => {
    var tmp = productsResult.data?.data.filter(
      ({name}) => name.toLowerCase().indexOf(text.toLowerCase()) > -1,
    );
    setdataProduct(tmp);
  };
  useEffect(() => {
    if (productsResult) {
      setdataProduct(productsResult.data?.data);
    }
  }, [productsResult]);

  const _renderItem = ({item, index}) => {
    return (
      <View>
        <Image
          resizeMode="center"
          style={{width: '100%', height: 200}}
          source={item}
        />
      </View>
    );
  };
  return (
    <Container type={'navbar'}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Pressable
          onPress={() => navigation.navigate('ProductSearch')}
          style={{flex: 1}}>
          <Search search={_searchProduct} />
        </Pressable>
        <Cart />
      </View>
      <View>
        <Carousel
          loop={true}
          autoplay={true}
          layout={'stack'}
          layoutCardOffset={`18`}
          data={dataImage}
          renderItem={_renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          onSnapToItem={index => setActive(index)}
        />
        <Pagination
          containerStyle={{
            marginTop: responsive(-40),
            justifyContent: 'flex-start',
            marginBottom: responsive(-16),
          }}
          dotsLength={dataImage.length}
          activeDotIndex={active}
          dotStyle={styles.dot}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
      <Animated.View
        entering={SlideInRight}
        style={{marginVertical: responsive(16), zIndex: 1}}>
        <ListCategory data={productCategoriesResult.data} />
      </Animated.View>
      <TextMedium fontSize={FONT_SIZE_16}> All Product!</TextMedium>
      <View style={{flex: 1, marginTop: 16}}>
        <ListProduct data={dataProduct} loading={productsLoading} />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  card: mode => ({
    backgroundColor: mode == 'light' ? PRIMARY : GRAY_LIGHT,
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
    height: responsive(120),
  }),
  cardLove: {
    backgroundColor: 'white',
    padding: 8,
    marginLeft: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: -8,
    backgroundColor: GRAY,
  },
});
export default Home;
