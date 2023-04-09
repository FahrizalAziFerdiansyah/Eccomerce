import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  FONT_FAMILY_REGULAR,
  FONT_SIZE_12,
  FONT_SIZE_13,
  FONT_SIZE_14,
} from '../../styles/typography';
import {ALERT, GRAY_DARK, PRIMARY} from '../../styles/colors';
import {responsive} from '../../styles/mixins';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextMedium from './TextMedium';
import TextSmall from './TextSmall';

const InputPassword = ({placeholder, label, onChange, error}) => {
  const [show, setShow] = useState(true);
  const [focus, setFocus] = useState(false);

  return (
    <View>
      {label && (
        <View style={{marginBottom: 4}}>
          <TextMedium fontSize={FONT_SIZE_14}>{label}</TextMedium>
        </View>
      )}
      <View style={{marginBottom: responsive(16)}}>
        <View style={styles.input(focus, error)}>
          <TextInput
            onChangeText={onChange}
            style={{fontFamily: FONT_FAMILY_REGULAR, flex: 1}}
            placeholder={placeholder || ''}
            secureTextEntry={show}
          />
          <TouchableOpacity
            onPress={() => setShow(!show)}
            style={{alignSelf: 'center', marginRight: 4}}>
            <Icon name={show ? 'eye-slash' : 'eye'} size={responsive(20)} />
          </TouchableOpacity>
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

export default InputPassword;

const styles = StyleSheet.create({
  input: (focus, error) => ({
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: error ? ALERT : focus ? PRIMARY : GRAY_DARK,
    borderWidth: 1,
    flexDirection: 'row',
  }),
});
