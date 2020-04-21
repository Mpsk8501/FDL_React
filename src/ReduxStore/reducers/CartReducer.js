import {
  CART_CLOSE,
  CART_OPEN,
  ADD_REMOVE_TO_CART,
  CART_BTN_BLOCK,
  CART_BTN_NO_BLOCK
} from '../types'

const initialState = {
  cart: {},
  isOpen: false,
  isBlock: false
}

export default function cartReducer (state = initialState, action) {
  switch (action.type) {
    case CART_OPEN:
      return {
        ...state, isOpen: true
      }
    case CART_CLOSE:
      return {
        ...state, isOpen: false
      }
    case CART_BTN_BLOCK:
      return {
        ...state, isBlock: true
      }
    case CART_BTN_NO_BLOCK:
      return {
        ...state, isBlock: false
      }
    case ADD_REMOVE_TO_CART:
      return {
        ...state, cart: { ...action.newCart }
      }
    default:
      return state
  }
}
