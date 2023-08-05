import {
  HEADER_MIDTRANS,
  URL_MIDTRANS,
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
} from '../../utils';
import {axiosInstance} from '../../helpers';
import {ToastCustom} from '../../components/atoms';
import axios from 'axios';
export const SNAP_TRNSACTION = 'SNAP_TRNSACTION';
export const CLEAR_SNAP_TRNSACTION = 'CLEAR_SNAP_TRNSACTION';

export const snapTransaction = data => dispatch => {
  dispatchLoading(dispatch, SNAP_TRNSACTION);

  axios({
    method: 'POST',
    url: URL_MIDTRANS + 'transactions',
    headers: HEADER_MIDTRANS,
    data: data,
  })
    .then(res => {
      dispatchSuccess(dispatch, SNAP_TRNSACTION, res.data);
    })
    .catch(err => {
      console.log('ERR', err);
      dispatchError(dispatch, SNAP_TRNSACTION, err);
    });
};
export const clearsnapTransaction = () => {
  return dispatch => {
    dispatchSuccess(dispatch, CLEAR_SNAP_TRNSACTION, '');
  };
};
