import {CLEAR_GET_COST, GET_CITY, GET_COST, GET_PROVINCE} from '../../action';
const initialState = {
  getProvinceLoading: false,
  getProvinceResult: false,
  getProvinceError: false,

  getCityLoading: false,
  getCityResult: false,
  getCityError: false,

  getCostLoading: false,
  getCostResult: false,
  getCostError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROVINCE:
      return {
        ...state,
        getProvinceLoading: action.payload.loading,
        getProvinceResult: action.payload.data,
        getProvinceError: action.payload.errorMessage,
      };
    case GET_CITY:
      return {
        ...state,
        getCityLoading: action.payload.loading,
        getCityResult: action.payload.data,
        getCityError: action.payload.errorMessage,
      };
    case GET_COST:
      return {
        ...state,
        getCostLoading: action.payload.loading,
        getCostResult: action.payload.data,
        getCostError: action.payload.errorMessage,
      };
    case CLEAR_GET_COST:
      return {
        ...state,
        getCostLoading: false,
        getCostResult: false,
        getCostError: false,
      };

    default:
      return state;
  }
}
