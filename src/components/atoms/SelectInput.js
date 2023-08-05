import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TextSmall from './TextSmall';
import BottomSheet from './BottomSheet';
import TextMedium from './TextMedium';
import {FONT_FAMILY_REGULAR, FONT_SIZE_14} from '../../styles/typography';
import Icon from 'react-native-vector-icons/FontAwesome';
import {responsive} from '../../styles/mixins';
import {GRAY, GRAY_MEDIUM, PRIMARY} from '../../styles/colors';
import Search from './Search';

const SelectInput = ({
  label,
  placeholder,
  value,
  onChange,
  data,
  customKey,
  returnVal,
  isSearch,
}) => {
  const [show, setShow] = useState(false);
  const [focus, setFocus] = useState(false);
  const [val, setval] = useState('');
  const [dataOri, setdataOri] = useState([]);
  const [dataList, setdataList] = useState([]);

  var keyToDisplay = ['name', 'id'];
  useEffect(() => {
    if (data && data.length > 0) {
      var tmpArr = data;
      const tmp = tmpArr.map(obj => {
        const newObj = {};
        keyToDisplay.forEach((key, index) => {
          let keyVal = customKey ? customKey[index] : key;
          newObj[key] = obj[keyVal];
        });
        return newObj;
      });
      setdataList(tmp);
      setdataOri(tmp);
      setval('');
    }
  }, [data]);

  const _searchData = text => {
    var tmp = dataOri.filter(
      ({name}) => name.toLowerCase().indexOf(text.toLowerCase()) > -1,
    );
    setdataList(tmp);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      if (value !== '') {
        if (dataOri.find(({id}) => id == value)) {
          setval(dataOri.find(({id}) => id == value).name);
        }
      }
    }
  }, [value, dataOri]);

  return (
    <View>
      {label && (
        <View style={{marginBottom: 4}}>
          <TextMedium fontSize={FONT_SIZE_14}>{label}</TextMedium>
        </View>
      )}
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={styles.input(focus)}>
        <TextInput
          value={val}
          editable={false}
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
          style={{fontFamily: FONT_FAMILY_REGULAR, flex: 1, color: 'black'}}
          placeholder={placeholder || ''}
          placeholderTextColor={GRAY}
        />
        <View style={{alignSelf: 'center', paddingRight: 10}}>
          <Icon
            color={PRIMARY}
            size={responsive(16)}
            name={show ? 'chevron-up' : 'chevron-down'}
          />
        </View>
      </TouchableOpacity>
      <BottomSheet
        visible={show}
        onClose={() => {
          setShow(false);
          setdataList(dataOri);
        }}>
        {isSearch && <Search search={_searchData} />}
        <ScrollView style={dataList.length > 5 ? styles.scroll : null}>
          {dataList.map(item => (
            <TouchableOpacity
              onPress={() => {
                onChange(returnVal == 'label' ? item.name : item.id);
                setShow(false);
                setdataList(dataOri);
              }}
              style={{padding: responsive(16)}}>
              <TextMedium>{item.name}</TextMedium>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </BottomSheet>
    </View>
  );
};

export default SelectInput;

const styles = StyleSheet.create({
  input: focus => ({
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: focus ? PRIMARY : GRAY_MEDIUM,
    borderWidth: 1,
    marginBottom: responsive(12),
    flexDirection: 'row',
  }),

  scroll: {height: responsive(200)},
});
