import {combineReducers} from 'redux'
import restourantsReducer from "./restourantsReducer";
import CartReducer from "./CartReducer";
import authReducer from "./AuthReducer";



export default combineReducers({
    restorants: restourantsReducer,
    cart:CartReducer,
    auth:authReducer
})