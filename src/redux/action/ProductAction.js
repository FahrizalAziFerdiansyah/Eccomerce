import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  storeData,
} from '../../utils';
import {axiosInstance} from '../../helpers';
import {ToastCustom} from '../../components/atoms';
export const PRODUCTS = 'PRODUCTS';
export const SHOW_PRODUCT = 'SHOW_PRODUCT';
export const PRODUCT_CATEGORIES = 'PRODUCT_CATEGORIES';
export const PRODUCT_COLLECTTIONS = 'PRODUCT_COLLECTTIONS';
export const PRODUCT_COLLECTTION_PAGINATION = 'PRODUCT_COLLECTTION_PAGINATION';
export const ADD_PRODUCT_COLLECTION = 'ADD_PRODUCT_COLLECTION';

export const getProductCategories = () => dispatch => {
  dispatchLoading(dispatch, PRODUCT_CATEGORIES);
  try {
    axiosInstance(dispatch)
      .get('product-category')
      .then(res => {
        dispatchSuccess(dispatch, PRODUCT_CATEGORIES, res.data);
      })
      .catch(err => {
        dispatchError(dispatch, PRODUCT_CATEGORIES, err.response?.data.errors);
        if (!err.response) {
          ToastCustom('error', 'Network Error', `Please check your connection`);
        }
      });
  } catch (error) {
    dispatchError(dispatch, PRODUCT_CATEGORIES, error.response.data.errors);
  }
};
export const getProducts =
  (id = '') =>
  dispatch => {
    dispatchLoading(dispatch, PRODUCTS);
    try {
      axiosInstance(dispatch)
        .get(`product?product_category_id=${id}`)
        .then(res => {
          dispatchSuccess(dispatch, PRODUCTS, res.data);
        })
        .catch(err => {
          dispatchError(dispatch, PRODUCTS, err.response?.data.errors);
          if (!err.response) {
            ToastCustom(
              'error',
              'Network Error',
              `Please check your connection`,
            );
          }
        });
    } catch (error) {
      dispatchError(dispatch, PRODUCTS, error.response.data.errors);
    }
  };
export const showProduct =
  (id = '') =>
  dispatch => {
    dispatchLoading(dispatch, SHOW_PRODUCT);
    try {
      axiosInstance(dispatch)
        .get(`product/show?id=${id}`)
        .then(res => {
          dispatchSuccess(dispatch, SHOW_PRODUCT, res.data.data);
        })
        .catch(err => {
          dispatchError(dispatch, SHOW_PRODUCT, err.response?.data.errors);
          if (!err.response) {
            ToastCustom(
              'error',
              'Network Error',
              `Please check your connection`,
            );
          }
        });
    } catch (error) {
      dispatchError(dispatch, SHOW_PRODUCT, error.response.data.errors);
    }
  };

export const addProductCollection = data => dispatch => {
  dispatchLoading(dispatch, ADD_PRODUCT_COLLECTION);
  try {
    axiosInstance(dispatch)
      .post('product/add-collection', data)
      .then(res => {
        console.log(res.data);
        dispatchSuccess(dispatch, ADD_PRODUCT_COLLECTION, res.data);
      })
      .catch(err => {
        console.log(err);
        dispatchError(
          dispatch,
          ADD_PRODUCT_COLLECTION,
          err.response?.data.errors,
        );
        if (!err.response) {
          ToastCustom('error', 'Network Error', `Please check your connection`);
        }
      });
  } catch (error) {
    dispatchError(dispatch, ADD_PRODUCT_COLLECTION, error.response.data.errors);
  }
};

export const getProductCollections =
  (user_id, page, pagination = '', refresh = true) =>
  dispatch => {
    if (pagination) {
      dispatchLoading(dispatch, PRODUCT_COLLECTTION_PAGINATION);
    } else {
      dispatchLoading(dispatch, PRODUCT_COLLECTTIONS);
    }
    try {
      axiosInstance(dispatch)
        .get(`product/collections?user_id=${user_id}&pagination=${pagination}`)
        .then(res => {
          if (pagination) {
            dispatchSuccess(
              dispatch,
              PRODUCT_COLLECTTION_PAGINATION,
              res.data.data,
              pagination,
              refresh,
            );
          } else {
            console.log('aho');
            dispatchSuccess(dispatch, PRODUCT_COLLECTTIONS, res);
          }
        })
        .catch(err => {
          dispatchError(
            dispatch,
            PRODUCT_COLLECTTIONS,
            err.response?.data.errors,
          );
          if (!err.response) {
            ToastCustom(
              'error',
              'Network Error',
              `Please check your connection`,
            );
          }
        });
    } catch (error) {
      dispatchError(dispatch, PRODUCT_COLLECTTIONS, error.response.data.errors);
    }
  };
