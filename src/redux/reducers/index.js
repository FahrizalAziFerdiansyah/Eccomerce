import {combineReducers} from 'redux';
import themeReducer from './theme';
import authReducer from './auth';
import productReducer from './product';
import networkReducer from './network';
import cartReducer from './cart';
const rootReducers = combineReducers({
  themeReducer,
  authReducer,
  productReducer,
  networkReducer,
  cartReducer,
});

export default rootReducers;
