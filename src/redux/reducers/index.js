import {combineReducers} from 'redux';
import themeReducer from './theme';
import authReducer from './auth';
import productReducer from './product';
import networkReducer from './network';
import cartReducer from './cart';
import profileReducer from './profile';
import ongkirReducer from './ongkir';
import paymentReducer from './payment';
const rootReducers = combineReducers({
  themeReducer,
  authReducer,
  productReducer,
  networkReducer,
  cartReducer,
  profileReducer,
  ongkirReducer,
  paymentReducer,
});

export default rootReducers;
