import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  storeData,
} from '../../utils';
import {axiosInstance} from '../../helpers';
import {ToastCustom} from '../../components/atoms';
export const LOGIN = 'LOGIN';
export const USER = 'USER';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CLEAR_LOGIN = 'CLEAR_LOGIN';
export const CLEAR_CHANGE_PASSWORD = 'CLEAR_CHANGE_PASSWORD';

export const login = (form, signIn) => dispatch => {
  dispatchLoading(dispatch, LOGIN);
  try {
    axiosInstance(dispatch)
      .post('auth/login', form)
      .then(res => {
        ToastCustom('success', 'Success', `Your login success`);
        dispatchSuccess(dispatch, LOGIN, res.data);
        storeData('token', res.data.token);
      })
      .catch(err => {
        console.log(err);
        dispatchError(dispatch, LOGIN, err.response?.data.errors);
        if (!err.response) {
          ToastCustom('error', 'Network Error', `Please check your connection`);
        }
      });
  } catch (error) {
    dispatchError(dispatch, LOGIN, error.response.data.errors);
  }
};

export const getUser = () => dispatch => {
  dispatchLoading(dispatch, USER);
  try {
    axiosInstance(dispatch)
      .get('user')
      .then(res => {
        dispatchSuccess(dispatch, USER, res.data);
      })
      .catch(err => {
        dispatchError(dispatch, USER, err.response?.data.errors);
        if (!err.response) {
          ToastCustom('error', 'Network Error', `Please check your connection`);
        }
      });
  } catch (error) {
    dispatchError(dispatch, USER, error.response.data.errors);
  }
};
export const changePassword = data => dispatch => {
  dispatchLoading(dispatch, CHANGE_PASSWORD);
  try {
    axiosInstance(dispatch)
      .post('auth/change-password', data)
      .then(res => {
        dispatchSuccess(dispatch, CHANGE_PASSWORD, res.data);
      })
      .catch(err => {
        console.log(err.response?.data);
        dispatchError(dispatch, CHANGE_PASSWORD, err.response?.data.errors);
        if (!err.response) {
          ToastCustom('error', 'Network Error', `Please check your connection`);
        }
      });
  } catch (error) {
    dispatchError(dispatch, USER, error.response.data.errors);
  }
};

export const clearLogin = () => {
  return dispatch => {
    dispatchSuccess(dispatch, CLEAR_LOGIN, '');
  };
};
export const clearChangePassword = () => {
  return dispatch => {
    dispatchSuccess(dispatch, CLEAR_CHANGE_PASSWORD, '');
  };
};
