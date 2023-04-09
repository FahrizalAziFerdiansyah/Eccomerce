import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  storeData,
} from '../../utils';
import {axiosInstance} from '../../helpers';
import {ToastCustom} from '../../components/atoms';
export const LOGIN = 'LOGIN';
export const CLEAR_LOGIN = 'CLEAR_LOGIN';

export const login = (form, signIn) => dispatch => {
  dispatchLoading(dispatch, LOGIN);
  try {
    axiosInstance()
      .post('auth/login', form)
      .then(res => {
        ToastCustom('success', 'Success', `Your login success`);
        dispatchSuccess(dispatch, LOGIN, res.data);
        storeData('token', res.data.token);
      })
      .catch(err => {
        dispatchError(dispatch, LOGIN, err.response?.data.errors);
        if (!err.response) {
          ToastCustom('error', 'Network Error', `Please check your connection`);
        }
      });
  } catch (error) {
    dispatchError(dispatch, LOGIN, error.response.data.errors);
  }
};

export const clearLogin = () => {
  return dispatch => {
    dispatchSuccess(dispatch, CLEAR_LOGIN, '');
  };
};
