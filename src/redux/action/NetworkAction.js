import {CLEAR_NETWORK_ERROR, NETWORK_ERROR} from '../../utils';

// switch mode according to what is specified...
export const networkError = error => {
  return {
    type: NETWORK_ERROR,
    payload: error,
  };
};
export const clearNetworkError = () => {
  return {
    type: CLEAR_NETWORK_ERROR,
    payload: false,
  };
};
