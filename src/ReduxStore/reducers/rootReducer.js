import { combineReducers } from 'redux'
import restourantsReducer from './restourantsReducer'
import CartReducer from './CartReducer'
import authReducer from './AuthReducer'
import AdminReducer from './AdminReducer'

export default combineReducers({
  restorants: restourantsReducer,
  cart: CartReducer,
  auth: authReducer,
  admin: AdminReducer
})
