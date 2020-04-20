import {
  CART_CLOSE,
  CART_OPEN,
  ADD_REMOVE_TO_CART,
  RESET_CART,
  ADD_BTN_TO_CART,
  REMOVE_BTN_TO_CART
} from "../types";

const initialState = {
  cart:[],
  inCart:{},
  isOpen:false,
};

export default function cartReducer (state=initialState,action) {
  switch (action.type) {
    case CART_OPEN:
      return {
        ...state,isOpen: true
      };
    case CART_CLOSE:
      return {
        ...state,isOpen: false
      };

    case ADD_REMOVE_TO_CART:
      return {
        ...state, cart: [...action.newCart]
      };
    case RESET_CART:
      return {
        ...state, cart: []
      };
    case ADD_BTN_TO_CART:
      return {
        ...state, inCart: {...state.inCart, [action.item]:action.item}
      };
    case REMOVE_BTN_TO_CART:
      return {
        ...state, inCart: {...action.item}
      };


    default:
      return state
  }
}