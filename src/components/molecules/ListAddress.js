import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  ButtonAction,
  IconButton,
  TextMedium,
  TextSmall,
  ToastCustom,
} from '../atoms';
import {FONT_SIZE_13} from '../../styles/typography';
import {GRAY_MEDIUM, PRIMARY} from '../../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FlatList} from 'react-native';
import {responsive} from '../../styles/mixins';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearDeleteAddress,
  deleteAddress,
  setAddress,
} from '../../redux/action';
import {useNavigation} from '@react-navigation/native';
import {getCity, getProvince} from '../../helpers';

const ListAddress = ({data}) => {
  const dispatch = useDispatch();
  const {mode} = useSelector(state => state.themeReducer);
  const navigation = useNavigation();
  const {userResult} = useSelector(state => state.authReducer);
  const {deleteAddressResult, addressResult} = useSelector(
    state => state.profileReducer,
  );
  const {
    getProvinceLoading,
    getProvinceResult,
    getCityLoading,
    getCityResult,
    getProvinceError,
  } = useSelector(state => state.ongkirReducer);
  const _setAddress = id => {
    dispatch(setAddress({user_id: userResult.id, id}));
  };
  const _delete = id => {
    dispatch(deleteAddress({id}));
  };

  useEffect(() => {
    if (deleteAddressResult) {
      let index = addressResult.data.findIndex(
        ({id}) => id == deleteAddressResult.id,
      );
      addressResult.data.splice(index, 1);
      ToastCustom('success', 'Success', 'Success deleted address!');
      dispatch(clearDeleteAddress());
    }
  }, [deleteAddressResult]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('AddressEdit', item)}
        style={styles.card(item.is_selected, mode)}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <TextMedium fontSize={FONT_SIZE_13}>{item.type}</TextMedium>
            </View>
            {item.is_selected > 0 ? (
              <Icon
                color={mode == 'light' ? PRIMARY : 'white'}
                size={24}
                name="check"
              />
            ) : (
              <IconButton
                onPress={() => _delete(item.id)}
                backgroundColor={PRIMARY}
                color={'white'}
                icon={'trash'}
              />
            )}
          </View>
          <TextMedium>{item.name}</TextMedium>
          <TextSmall>{item.phone}</TextSmall>
          <TextSmall>
            {getProvince(getProvinceResult, item.province_id)}{' '}
            {getCity(getCityResult, item.city_id)} {item.address}
          </TextSmall>
        </View>
        {item.is_selected == 0 && (
          <View style={{marginTop: responsive(32)}}>
            <ButtonAction
              onPress={() => _setAddress(item.id)}
              title={'Set Address'}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
};

export default ListAddress;

const styles = StyleSheet.create({
  card: (is_selected, mode) => ({
    padding: 16,
    borderColor:
      is_selected > 0 ? (mode == 'light' ? PRIMARY : GRAY_MEDIUM) : GRAY_MEDIUM,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: mode == 'light' ? 'white' : PRIMARY,
    marginBottom: responsive(10),
  }),
});
