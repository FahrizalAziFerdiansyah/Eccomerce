import {dispatchError, dispatchLoading, dispatchSuccess} from '../../utils';
import {axiosInstance} from '../../helpers';
import {ToastCustom} from '../../components/atoms';
export const PROFILE = 'PROFILE';
export const STORE_PROFILE = 'STORE_PROFILE';
export const CLEAR_STORE_PROFILE = 'CLEAR_STORE_PROFILE';
export const ADDRESS = 'ADDRESS';
export const STORE_ADDRESS = 'STORE_ADDRESS';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
export const SET_ADDRESS = 'SET_ADDRESS';
export const DELETE_ADDRESS = 'DELETE_ADDRESS';
export const CLEAR_DELETE_ADDRESS = 'CLEAR_DELETE_ADDRESS';
export const CLEAR_UPDATE_ADDRESS = 'CLEAR_UPDATE_ADDRESS';
export const CLEAR_STORE_ADDRESS = 'CLEAR_STORE_ADDRESS';
export const CLEAR_SET_ADDRESS = 'CLEAR_SET_ADDRESS';

export const getAddress = id => dispatch => {
  dispatchLoading(dispatch, ADDRESS);
  try {
    axiosInstance(dispatch)
      .get(`profile/address?user_id=${id}`)
      .then(res => {
        dispatchSuccess(dispatch, ADDRESS, res.data);
      })
      .catch(err => {
        dispatchError(dispatch, ADDRESS, err.response?.data.errors);
        if (!err.response) {
          ToastCustom('error', 'Network Error', `Please check your connection`);
        }
      });
  } catch (error) {
    dispatchError(dispatch, ADDRESS, error.response.data.errors);
  }
};
export const getProfile = id => dispatch => {
  dispatchLoading(dispatch, PROFILE);
  try {
    axiosInstance(dispatch)
      .get(`profile?user_id=${id}`)
      .then(res => {
        dispatchSuccess(dispatch, PROFILE, res.data.data);
      })
      .catch(err => {
        dispatchError(dispatch, PROFILE, err.response?.data.errors);
        if (!err.response) {
          ToastCustom('error', 'Network Error', `Please check your connection`);
        }
      });
  } catch (error) {
    dispatchError(dispatch, ADDRESS, error.response.data.errors);
  }
};
export const storeProfile = data => dispatch => {
  dispatchLoading(dispatch, STORE_PROFILE);
  try {
    axiosInstance(dispatch)
      .post(`profile/store`, data)
      .then(res => {
        dispatchSuccess(dispatch, STORE_PROFILE, res.data.data);
      })
      .catch(err => {
        console.log(err.response);
        dispatchError(dispatch, STORE_PROFILE, err.response?.data.errors);
        if (!err.response) {
          ToastCustom('error', 'Network Error', `Please check your connection`);
        }
      });
  } catch (error) {
    dispatchError(dispatch, STORE_PROFILE, error.response.data.errors);
  }
};
export const storeAddress = data => dispatch => {
  dispatchLoading(dispatch, STORE_ADDRESS);
  try {
    axiosInstance(dispatch)
      .post(`profile/create-address`, data)
      .then(res => {
        dispatchSuccess(dispatch, STORE_ADDRESS, res.data.data);
      })
      .catch(err => {
        console.log(err.response);
        dispatchError(dispatch, STORE_ADDRESS, err.response?.data.errors);
        if (!err.response) {
          ToastCustom('error', 'Network Error', `Please check your connection`);
        }
      });
  } catch (error) {
    dispatchError(dispatch, STORE_ADDRESS, error.response.data.errors);
  }
};
export const updateAddress = data => dispatch => {
  dispatchLoading(dispatch, UPDATE_ADDRESS);
  try {
    axiosInstance(dispatch)
      .post(`profile/update-address`, data)
      .then(res => {
        dispatchSuccess(dispatch, UPDATE_ADDRESS, res.data.data);
      })
      .catch(err => {
        console.log(err.response);
        dispatchError(dispatch, UPDATE_ADDRESS, err.response?.data.errors);
        if (!err.response) {
          ToastCustom('error', 'Network Error', `Please check your connection`);
        }
      });
  } catch (error) {
    dispatchError(dispatch, UPDATE_ADDRESS, error.response.data.errors);
  }
};
export const setAddress = data => dispatch => {
  dispatchLoading(dispatch, SET_ADDRESS);
  try {
    axiosInstance(dispatch)
      .post(`profile/set-address`, data)
      .then(res => {
        dispatchSuccess(dispatch, SET_ADDRESS, res.data.data);
      })
      .catch(err => {
        console.log(err.response);
        dispatchError(dispatch, SET_ADDRESS, err.response?.data.errors);
        if (!err.response) {
          ToastCustom('error', 'Network Error', `Please check your connection`);
        }
      });
  } catch (error) {
    dispatchError(dispatch, SET_ADDRESS, error.response.data.errors);
  }
};
export const deleteAddress = data => dispatch => {
  dispatchLoading(dispatch, DELETE_ADDRESS);
  try {
    axiosInstance(dispatch)
      .post(`profile/delete-address`, data)
      .then(res => {
        dispatchSuccess(dispatch, DELETE_ADDRESS, res.data.data);
      })
      .catch(err => {
        console.log(err.response);
        dispatchError(dispatch, DELETE_ADDRESS, err.response?.data.errors);
        if (!err.response) {
          ToastCustom('error', 'Network Error', `Please check your connection`);
        }
      });
  } catch (error) {
    dispatchError(dispatch, DELETE_ADDRESS, error.response.data.errors);
  }
};

export const clearStoreAddress = () => {
  return dispatch => {
    dispatchSuccess(dispatch, CLEAR_STORE_ADDRESS, '');
  };
};
export const clearSetAddress = () => {
  return dispatch => {
    dispatchSuccess(dispatch, CLEAR_SET_ADDRESS, '');
  };
};
export const clearUpdateAddress = () => {
  return dispatch => {
    dispatchSuccess(dispatch, CLEAR_UPDATE_ADDRESS, '');
  };
};
export const clearDeleteAddress = () => {
  return dispatch => {
    dispatchSuccess(dispatch, CLEAR_DELETE_ADDRESS, '');
  };
};
export const clearStoreProfile = () => {
  return dispatch => {
    dispatchSuccess(dispatch, CLEAR_STORE_PROFILE, '');
  };
};
