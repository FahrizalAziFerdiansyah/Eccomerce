import {
  ADDRESS,
  CLEAR_SET_ADDRESS,
  CLEAR_STORE_ADDRESS,
  SET_ADDRESS,
  STORE_ADDRESS,
  UPDATE_ADDRESS,
  CLEAR_UPDATE_ADDRESS,
  DELETE_ADDRESS,
  CLEAR_DELETE_ADDRESS,
  CLEAR_STORE_PROFILE,
  PROFILE,
  STORE_PROFILE
} from '../../action';
const initialState = {
  addressLoading: false,
  addressResult: false,
  addressError: false,

  profileLoading: false,
  profileResult: false,
  profileError: false,

  storeProfileLoading: false,
  storeProfileResult: false,
  storeProfileError: false,

  storeAddressLoading: false,
  storeAddressResult: false,
  storeAddressError: false,

  updateAddressLoading: false,
  updateAddressResult: false,
  updateAddressError: false,

  setAddressLoading: false,
  setAddressResult: false,
  setAddressError: false,

  deleteAddressLoading: false,
  deleteAddressResult: false,
  deleteAddressError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADDRESS:
      return {
        ...state,
        addressLoading: action.payload.loading,
        addressResult: action.payload.data,
        addressError: action.payload.errorMessage,
      };
    case PROFILE:
      return {
        ...state,
        profileLoading: action.payload.loading,
        profileResult: action.payload.data,
        profileError: action.payload.errorMessage,
      };
    case STORE_PROFILE:
      return {
        ...state,
        storeProfileLoading: action.payload.loading,
        storeProfileResult: action.payload.data,
        storeProfileError: action.payload.errorMessage,
      };
    case CLEAR_STORE_PROFILE:
      return {
        ...state,
        storeProfileLoading: false,
        storeProfileResult: false,
        storeProfileError: false,
      };
    case STORE_ADDRESS:
      return {
        ...state,
        storeAddressLoading: action.payload.loading,
        storeAddressResult: action.payload.data,
        storeAddressError: action.payload.errorMessage,
      };
    case UPDATE_ADDRESS:
      return {
        ...state,
        updateAddressLoading: action.payload.loading,
        updateAddressResult: action.payload.data,
        updateAddressError: action.payload.errorMessage,
      };
    case SET_ADDRESS:
      return {
        ...state,
        setAddressLoading: action.payload.loading,
        setAddressResult: action.payload.data,
        setAddressError: action.payload.errorMessage,
      };
    case DELETE_ADDRESS:
      return {
        ...state,
        deleteAddressLoading: action.payload.loading,
        deleteAddressResult: action.payload.data,
        deleteAddressError: action.payload.errorMessage,
      };
    case CLEAR_STORE_ADDRESS:
      return {
        ...state,
        storeAddressLoading: false,
        storeAddressResult: false,
        storeAddressError: false,
      };
    case CLEAR_DELETE_ADDRESS:
      return {
        ...state,
        deleteAddressLoading: false,
        deleteAddressResult: false,
        deleteAddressError: false,
      };
    case CLEAR_UPDATE_ADDRESS:
      return {
        ...state,
        updateAddressLoading: false,
        updateAddressResult: false,
        updateAddressError: false,
      };
    case CLEAR_SET_ADDRESS:
      return {
        ...state,
        setAddressLoading: false,
        setAddressResult: false,
        setAddressError: false,
      };
    default:
      return state;
  }
}
