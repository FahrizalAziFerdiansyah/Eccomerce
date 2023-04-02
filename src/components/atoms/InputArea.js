import {StyleSheet, Text, TextInput, View} from 'react-native';
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

const InputArea = ({placeholder, label}) => {
  const [focus, setFocus] = useState(false);
  return (
    <View>
      {label && (
        <View style={{marginBottom: 4}}>
          <TextMedium fontSize={FONT_SIZE_14}>{label}</TextMedium>
        </View>
      )}
      <View style={styles.input(focus)}>
        <TextInput
          multiline
          numberOfLines={4}
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
          style={{fontFamily: FONT_FAMILY_REGULAR, textAlignVertical: 'top'}}
          placeholder={placeholder || ''}
        />
      </View>
    </View>
  );
};

export default InputArea;

const styles = StyleSheet.create({
  input: focus => ({
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: focus ? PRIMARY : GRAY_MEDIUM,
    borderWidth: 1,
    marginBottom: responsive(12),
  }),
});
