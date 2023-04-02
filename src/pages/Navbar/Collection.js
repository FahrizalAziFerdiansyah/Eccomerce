import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
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

const Collection = () => {
  return (
    <Container type={'navbar'}>
      <View style={{marginBottom: responsive(26)}}>
        <TextLarge>Your Collection</TextLarge>
        <TextSmall fontSize={FONT_SIZE_16}>
          Add to cart if you interest product
        </TextSmall>
      </View>
      <ListCollection data={dataProduct} />
    </Container>
  );
};

export default Collection;

const styles = StyleSheet.create({});
