import { combineReducers } from 'redux';
import auth_reducer from '../../pages/Auth/Auth_reducer/index';
import product_reducer from '../../pages/Product/reducer/productReducer';
import cart_reducer from '../../pages/Cart/reducer/cartReducer';
import order_reducer from "../../pages/Orders/reducer/orderReducer"

const rootReducer = combineReducers({
  auth_reducer,
  product_reducer,
  cart_reducer,
  order_reducer
});

export default rootReducer;