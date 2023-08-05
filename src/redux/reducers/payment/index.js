import {CLEAR_SNAP_TRNSACTION, SNAP_TRNSACTION} from '../../action';
const initialState = {
  snapTransactionLoading: false,
  snapTransactionResult: false,
  snapTransactionError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SNAP_TRNSACTION:
      return {
        ...state,
        snapTransactionLoading: action.payload.loading,
        snapTransactionResult: action.payload.data,
        snapTransactionError: action.payload.errorMessage,
      };
    case CLEAR_SNAP_TRNSACTION:
      return {
        ...state,
        snapTransactionLoading: false,
        snapTransactionResult: false,
        snapTransactionError: false,
      };
    default:
      return state;
  }
}
