import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {FONT_FAMILY_REGULAR, FONT_SIZE_14} from '../../styles/typography';
import {GRAY, GRAY_DARK, GRAY_LIGHT, PRIMARY} from '../../styles/colors';
import {responsive} from '../../styles/mixins';
import TextMedium from './TextMedium';
import TextSmall from './TextSmall';

const InputOtp = props => {
  const [focus, setFocus] = useState(false);
  return (
    <View>
      <View style={styles.input(focus)}>
        <TextInput
          {...props}
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
          style={{fontFamily: FONT_FAMILY_REGULAR}}
        />
      </View>
    </View>
  );
};

export default InputOtp;

const styles = StyleSheet.create({
  input: focus => ({
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: focus ? PRIMARY : GRAY_DARK,
    borderWidth: 1,
    marginBottom: responsive(12),
  }),
});
