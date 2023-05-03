import {dispatchError, dispatchLoading, dispatchSuccess} from '../../utils';
import {axiosInstance} from '../../helpers';
import {ToastCustom} from '../../components/atoms';
export const CART = 'CART';
export const STORE_CART = 'STORE_CART';
export const DELETE_CART = 'DELETE_CART';
export const CLEAR_STORE_CART = 'CLEAR_STORE_CART';
export const CLEAR_DELETE_CART = 'CLEAR_DELETE_CART';

export const getCart = id => dispatch => {
  dispatchLoading(dispatch, CART);
  try {
    axiosInstance(dispatch)
      .get(`cart?id=${id}`)
      .then(res => {
        dispatchSuccess(dispatch, CART, res.data);
      })
      .catch(err => {
        dispatchError(dispatch, CART, err.response?.data.errors);
        if (!err.response) {
          ToastCustom('error', 'Network Error', `Please check your connection`);
        }
      });
  } catch (error) {
    dispatchError(dispatch, CART, error.response.data.errors);
  }
};
export const storeCart = data => dispatch => {
  dispatchLoading(dispatch, STORE_CART);
  try {
    axiosInstance(dispatch)
      .post(`cart/store`, data)
      .then(res => {
        dispatchSuccess(dispatch, STORE_CART, res.data.data);
      })
      .catch(err => {
        console.log(err.response);
        dispatchError(dispatch, STORE_CART, err.response?.data.errors);
        if (!err.response) {
          ToastCustom('error', 'Network Error', `Please check your connection`);
        }
      });
  } catch (error) {
    dispatchError(dispatch, CART, error.response.data.errors);
  }
};
export const deleteCart = data => dispatch => {
  dispatchLoading(dispatch, DELETE_CART);
  try {
    axiosInstance(dispatch)
      .post(`cart/delete`, data)
      .then(res => {
        dispatchSuccess(dispatch, DELETE_CART, res.data.data);
      })
      .catch(err => {
        dispatchError(dispatch, DELETE_CART, err.response?.data.errors);
        if (!err.response) {
          ToastCustom('error', 'Network Error', `Please check your connection`);
        }
      });
  } catch (error) {
    dispatchError(dispatch, CART, error.response.data.errors);
  }
};
export const clearStoreCart = () => {
  return dispatch => {
    dispatchSuccess(dispatch, CLEAR_STORE_CART, '');
  };
};
export const clearDeleteCart = () => {
  return dispatch => {
    dispatchSuccess(dispatch, CLEAR_DELETE_CART, '');
  };
};
