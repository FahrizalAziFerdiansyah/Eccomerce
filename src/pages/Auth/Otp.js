import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {createRef, useEffect, useState} from 'react';
import {
  ButtonAction,
  Container,
  Input,
  TextLarge,
  TextMedium,
  TextSmall,
} from '../../components/atoms';
import {ImgOtp} from '../../assets';
import {GRAY_DARK, PRIMARY} from '../../styles/colors';
import {responsive} from '../../styles/mixins';
import {
  FONT_BOLD,
  FONT_FAMILY_BOLD,
  FONT_SIZE_16,
} from '../../styles/typography';

const Otp = () => {
  const [elRefs, setElRefs] = useState([]);
  const [formOtp, setformOtp] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: '',
  });
  const onInputChangeOtp = (value, input) => {
    setformOtp({
      ...formOtp,
      [input]: value,
    });
  };
  const setNullForm = () => {
    Object.keys(formOtp).forEach(k => (formOtp[k] = ''));
  };
  useEffect(() => {
    // add or remove refs
    setElRefs(elRefs =>
      Object.keys(formOtp).map((_, i) => elRefs[i] || createRef()),
    );
  }, []);
  return (
    <Container bg={'white'} label={'OTP'} type={'detail'}>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <ImgOtp width={200} height={250} />
        </View>
        <View style={{alignItems: 'center'}}>
          <View style={{marginBottom: 16}}>
            <TextLarge>Verification Code</TextLarge>
          </View>

          <TextMedium textAlign={'center'} color={GRAY_DARK}>
            We have sent the code verification to your Mobile Phone
            <TextMedium> +62</TextMedium>
          </TextMedium>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 16,
            }}>
            {Object.keys(formOtp).map((item, index) => {
              return (
                <View style={styles.input}>
                  <TextInput
                    style={{
                      alignItems: 'center',
                      textAlign: 'center',
                      fontFamily: FONT_FAMILY_BOLD,
                    }}
                    returnKeyType={'next'}
                    onSubmitEditing={val => {
                      elRefs[index + 1]?.current?.focus();
                    }}
                    ref={elRefs[index]}
                    maxLength={1}
                    keyboardType={'numeric'}
                    value={formOtp[item]}
                    onChangeText={text => {
                      onInputChangeOtp(text, [item]);
                      if (text) {
                        elRefs[index + 1]?.current?.focus();
                      } else {
                        elRefs[index - 1]?.current?.focus();
                      }
                    }}
                  />
                </View>
              );
            })}
          </View>
          <View style={{flexDirection: 'row'}}>
            <TextSmall fontSize={FONT_SIZE_16}>Donr receive code?</TextSmall>
            <TouchableOpacity>
              <TextMedium> Request Again</TextMedium>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <ButtonAction title={'Submit'} />
    </Container>
  );
};

export default Otp;

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: PRIMARY,
    borderWidth: 1.5,
    marginBottom: responsive(12),
    alignItems: 'center',
    marginRight: 10,
  },
});
