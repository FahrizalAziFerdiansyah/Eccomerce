import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Container, TextMedium, TextSmall} from '../../components/atoms';
import {dataProduct} from '../../utils';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {responsive} from '../../styles/mixins';
import {GRAY, PRIMARY, SECONDARY} from '../../styles/colors';
import {
  FONT_SIZE_14,
  FONT_SIZE_16,
  FONT_SIZE_20,
} from '../../styles/typography';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ListRecomendation} from '../../components/molecules';

const ProductDetail = ({route}) => {
  var param = route.params;
  const horizontalMargin = 20;
  const slideWidth = 280;

  const sliderWidth = Dimensions.get('window').width;
  const itemWidth = slideWidth + horizontalMargin * 2;

  const [active, setActive] = useState(0);
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
    <Container type={'detail'}>
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
            <TextMedium fontSize={FONT_SIZE_20}>{param.name}</TextMedium>
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
                <TouchableOpacity>
                  <Icon color={SECONDARY} name="heart-o" size={20} />
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
            <TextSmall>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. Lorem Ipsum is
              simply dummy text of the printing and typesetting industry.
            </TextSmall>
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
          Rp. 500.0000
        </TextMedium>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <TouchableOpacity style={styles.btnCart}>
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
