import Toast from 'react-native-toast-message';
import TextSmall from './TextSmall';
const ToastCustom = (type, title, message, position) => {
  Toast.show({
    type: type,
    text1: title || 'Success',
    text2: message,
    position: position || 'top',
  });
};

export default ToastCustom;
