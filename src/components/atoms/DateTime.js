import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {FONT_FAMILY_REGULAR, FONT_SIZE_14} from '../../styles/typography';
import {
  GRAY,
  GRAY_DARK,
  GRAY_LIGHT,
  GRAY_MEDIUM,
  PRIMARY,
} from '../../styles/colors';
import {responsive} from '../../styles/mixins';
import TextMedium from './TextMedium';
import TextSmall from './TextSmall';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

const DateTime = ({placeholder, label, type, value, onChange}) => {
  const [focus, setFocus] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const _setDate = (event, currentDate) => {
    setShow(false);
    setDate(currentDate);
    onChange(moment(date).format('DD-MM-YYYY'));
  };
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
          <Icon size={responsive(20)} name="calendar" />
        </View>
      </TouchableOpacity>
      {show && <RNDateTimePicker value={new Date(date)} onChange={_setDate} />}
    </View>
  );
};

export default DateTime;

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
