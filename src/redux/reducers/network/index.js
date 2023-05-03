import {NETWORK_ERROR, CLEAR_NETWORK_ERROR} from '../../../utils';

// Initially we will have a light mode
const initialState = {
  error: '',
};

// Handle our action of changing the theme
const networkReducer = (state = initialState, action) => {
  switch (action.type) {
    case NETWORK_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_NETWORK_ERROR:
      return {
        ...state,
        error: false,
      };
    default:
      return state;
  }
};

export default networkReducer;
