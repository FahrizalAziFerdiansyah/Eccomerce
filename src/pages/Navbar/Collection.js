import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  Container,
  TextLarge,
  TextMedium,
  TextSmall,
} from '../../components/atoms';
import {ListCollection} from '../../components/molecules';
import {dataProduct} from '../../utils';
import {responsive} from '../../styles/mixins';
import {FONT_SIZE_16} from '../../styles/typography';
import {useDispatch, useSelector} from 'react-redux';
import {getProductCollections} from '../../redux/action';

const Collection = () => {
  const {userResult} = useSelector(state => state.authReducer);
  const {
    productCollectionPaginationLoading,
    productCollectionPaginationMoreLoading,
    productCollectionPaginationResult,
    productCollectionPaginationResultPagination,
  } = useSelector(state => state.productReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductCollections(userResult.id, 1, true));
  }, []);
  return (
    <Container type={'navbar'}>
      <View style={{marginBottom: responsive(26)}}>
        <TextLarge>Your Collection</TextLarge>
        <TextSmall fontSize={FONT_SIZE_16}>
          Add to cart if you interest product
        </TextSmall>
      </View>
      <ListCollection
        loading={
          productCollectionPaginationLoading ||
          productCollectionPaginationMoreLoading
        }
        page={productCollectionPaginationResult}
        data={productCollectionPaginationResultPagination}
      />
    </Container>
  );
};

export default Collection;

const styles = StyleSheet.create({});
