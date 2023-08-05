import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import TextSmall from './TextSmall';
import BottomSheet from './BottomSheet';
import TextMedium from './TextMedium';
import {FONT_FAMILY_REGULAR, FONT_SIZE_14} from '../../styles/typography';
import Icon from 'react-native-vector-icons/FontAwesome';
import {responsive} from '../../styles/mixins';
import {GRAY_MEDIUM, PRIMARY} from '../../styles/colors';

const SelectInput = ({label, placeholder, value, onChange, data}) => {
  const [show, setShow] = useState(false);
  const [focus, setFocus] = useState(false);
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
          value={value}
          editable={false}
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
          style={{fontFamily: FONT_FAMILY_REGULAR, flex: 1, color: PRIMARY}}
          placeholder={placeholder || ''}
        />
        <View style={{alignSelf: 'center', paddingRight: 10}}>
          <Icon
            size={responsive(20)}
            name={show ? 'chevron-up' : 'chevron-down'}
          />
        </View>
      </TouchableOpacity>
      <BottomSheet visible={show} onClose={() => setShow(false)}>
        {data.map(item => (
          <TouchableOpacity
            onPress={() => {
              onChange(item);
              setShow(false);
            }}
            style={{padding: responsive(16)}}>
            <TextMedium>{item}</TextMedium>
          </TouchableOpacity>
        ))}
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
});
