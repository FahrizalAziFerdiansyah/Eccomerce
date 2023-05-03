import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {TextSmall} from '../atoms';
import {responsive} from '../../styles/mixins';
import {GRAY, PRIMARY, SECONDARY} from '../../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {getProducts} from '../../redux/action';

const ListCategory = ({data}) => {
  const [selected, setselected] = useState('');
  const dispatch = useDispatch();
  const _filter = id => {
    setselected(selected == id ? '' : id);
    dispatch(getProducts(selected == id ? '' : id));
  };
  const renderItem = ({item}) => (
    <Pressable
      onPress={() => _filter(item.id)}
      style={styles.card(selected, item.id)}>
      <View style={{marginBottom: 16}}>
        <Icon
          color={selected == item.id ? 'white' : PRIMARY}
          size={24}
          name={item.icon}
        />
      </View>
      <TextSmall color={selected == item.id ? 'white' : GRAY}>
        {item.name}
      </TextSmall>
    </Pressable>
  );
  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ListCategory;
const styles = StyleSheet.create({
  card: (selected, id) => ({
    paddingHorizontal: responsive(14),
    paddingTop: responsive(16),
    paddingBottom: responsive(16),
    backgroundColor: selected == id ? SECONDARY : 'white',
    marginRight: responsive(16),
    borderRadius: responsive(12),
    alignItems: 'center',
  }),
});
