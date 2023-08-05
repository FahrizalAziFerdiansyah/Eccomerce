import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {FONT_FAMILY_REGULAR, FONT_SIZE_14} from '../../styles/typography';
import {
  ALERT,
  GRAY,
  GRAY_DARK,
  GRAY_LIGHT,
  GRAY_MEDIUM,
  PRIMARY,
} from '../../styles/colors';
import {responsive} from '../../styles/mixins';
import TextMedium from './TextMedium';
import TextSmall from './TextSmall';

const InputPhone = ({placeholder, label, error, onChange, value}) => {
  const [focus, setFocus] = useState(false);
  return (
    <View>
      {label && (
        <View style={{marginBottom: 4}}>
          <TextMedium fontSize={FONT_SIZE_14}>{label}</TextMedium>
        </View>
      )}
      <View style={{marginBottom: responsive(12)}}>
        <View style={styles.input(focus, error)}>
          <View>
            <TextSmall color={GRAY} fontSize={responsive(14)}>
              +62
            </TextSmall>
          </View>
          <View
            style={{
              height: '90%',
              width: 1,
              backgroundColor: GRAY_DARK,
              marginHorizontal: 16,
            }}
          />
          <TextInput
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            style={{fontFamily: FONT_FAMILY_REGULAR, flex: 1, color: PRIMARY}}
            placeholder={placeholder || ''}
            onChangeText={onChange}
            placeholderTextColor={GRAY}
            value={value}
          />
        </View>
        {error && (
          <TextSmall
            style={{textTransform: 'capitalize', marginTop: responsive(6)}}
            color={ALERT}>
            {error}
          </TextSmall>
        )}
      </View>
    </View>
  );
};

export default InputPhone;

const styles = StyleSheet.create({
  input: (focus, error) => ({
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: error ? ALERT : focus ? PRIMARY : GRAY_MEDIUM,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }),
});
