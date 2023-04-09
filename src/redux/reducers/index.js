import {combineReducers} from 'redux';
import themeReducer from './theme';
import authReducer from './auth';
const rootReducers = combineReducers({
  themeReducer,
  authReducer,
});

export default rootReducers;
