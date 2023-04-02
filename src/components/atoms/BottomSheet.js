import {StyleSheet, Modal, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {Colors} from '../../styles';
import IconButton from './IconButton';

const BottomSheet = ({visible, children, onClose}) => {
  const {mode} = useSelector(state => state.themeReducer);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onClose;
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView(mode)}>
          <View style={{alignSelf: 'flex-end', margin: -16, marginBottom: 2}}>
            <IconButton
              onPress={onClose}
              color={mode == 'light' ? Colors.PRIMARY : 'white'}
              icon={'close'}
            />
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52,0.3)',
  },
  modalView: mode => ({
    width: '100%',
    backgroundColor: mode === 'light' ? 'white' : 'black',
    padding: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    justifyContent: 'center',
  }),
});
