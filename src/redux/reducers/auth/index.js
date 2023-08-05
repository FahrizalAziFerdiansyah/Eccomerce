import {
  CHANGE_PASSWORD,
  CLEAR_CHANGE_PASSWORD,
  CLEAR_LOGIN,
  LOGIN,
  USER,
} from '../../action';
const initialState = {
  loginLoading: false,
  loginResult: false,
  loginError: false,

  userLoading: false,
  userResult: false,
  userError: false,

  changePasswordLoading: false,
  changePasswordResult: false,
  changePasswordError: false,
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
    case USER:
      return {
        ...state,
        userLoading: action.payload.loading,
        userResult: action.payload.data,
        userError: action.payload.errorMessage,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        changePasswordLoading: action.payload.loading,
        changePasswordResult: action.payload.data,
        changePasswordError: action.payload.errorMessage,
      };
    case CLEAR_CHANGE_PASSWORD:
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordResult: false,
        changePasswordError: false,
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
