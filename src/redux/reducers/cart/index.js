import {
  CART,
  CLEAR_DELETE_CART,
  CLEAR_STORE_CART,
  DELETE_CART,
  STORE_CART,
} from '../../action';
const initialState = {
  cartLoading: false,
  cartResult: false,
  cartError: false,

  storeCartLoading: false,
  storeCartResult: false,
  storeCartError: false,

  deleteCartLoading: false,
  deleteCartResult: false,
  deleteCartError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CART:
      return {
        ...state,
        cartLoading: action.payload.loading,
        cartResult: action.payload.data,
        cartError: action.payload.errorMessage,
      };
    case STORE_CART:
      return {
        ...state,
        storeCartLoading: action.payload.loading,
        storeCartResult: action.payload.data,
        storeCartError: action.payload.errorMessage,
      };
    case DELETE_CART:
      return {
        ...state,
        deleteCartLoading: action.payload.loading,
        deleteCartResult: action.payload.data,
        deleteCartError: action.payload.errorMessage,
      };
    case CLEAR_DELETE_CART:
      return {
        ...state,
        deleteCartLoading: false,
        deleteCartResult: false,
        deleteCartError: false,
      };
    case CLEAR_STORE_CART:
      return {
        ...state,
        storeCartLoading: false,
        storeCartResult: false,
        storeCartError: false,
      };
    default:
      return state;
  }
}
