import {CLEAR_LOGIN, LOGIN} from '../../action';
const initialState = {
  loginLoading: false,
  loginResult: false,
  loginError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loginLoading: action.payload.loading,
        loginResult: action.payload.data,
        loginError: action.payload.errorMessage,
      };
    case CLEAR_LOGIN:
      return {
        ...state,
        loginLoading: false,
        loginResult: false,
        loginError: false,
      };
    default:
      return state;
  }
}
