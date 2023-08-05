import {dispatchError, dispatchLoading, dispatchSuccess} from '../../utils';
import {axiosInstance} from '../../helpers';
import {ToastCustom} from '../../components/atoms';
export const GET_PROVINCE = 'GET_PROVINCE';
export const GET_CITY = 'GET_CITY';
export const GET_COST = 'GET_COST';
export const CLEAR_GET_COST = 'CLEAR_GET_COST';

export const getProvince = id => dispatch => {
  dispatchLoading(dispatch, GET_PROVINCE);
  try {
    axiosInstance(dispatch)
      .get(`ongkir/province`)
      .then(res => {
        dispatchSuccess(dispatch, GET_PROVINCE, res.data.results);
      })
      .catch(err => {
        console.log(err);
        dispatchError(dispatch, GET_PROVINCE, err.response?.data.errors);
        if (!err.response) {
          ToastCustom('error', 'Network Error', `Please check your connection`);
        }
      });
  } catch (error) {
    dispatchError(dispatch, GET_PROVINCE, error.response.data.errors);
  }
};
export const getCity = id => dispatch => {
  dispatchLoading(dispatch, GET_CITY);
  try {
    axiosInstance(dispatch)
      .get(`ongkir/city`)
      .then(res => {
        dispatchSuccess(dispatch, GET_CITY, res.data.results);
      })
      .catch(err => {
        console.log(err);
        dispatchError(dispatch, GET_CITY, err.response?.data.errors);
        if (!err.response) {
          ToastCustom('error', 'Network Error', `Please check your connection`);
        }
      });
  } catch (error) {
    dispatchError(dispatch, GET_CITY, error.response.data.errors);
  }
};
export const getCost = form => dispatch => {
  dispatchLoading(dispatch, GET_COST);
  try {
    axiosInstance(dispatch)
      .post(`ongkir/cost`, form)
      .then(res => {
        dispatchSuccess(dispatch, GET_COST, res.data.cost);
      })
      .catch(err => {
        console.log(err);
        dispatchError(dispatch, GET_COST, err.response?.data.errors);
        if (!err.response) {
          ToastCustom('error', 'Network Error', `Please check your connection`);
        }
      });
  } catch (error) {
    dispatchError(dispatch, GET_COST, error.response.data.errors);
  }
};

export const clearGetCost = () => {
  return dispatch => {
    dispatchSuccess(dispatch, CLEAR_GET_COST, '');
  };
};
