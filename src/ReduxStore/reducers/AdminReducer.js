import {
  ADMIN_MODAL_CLOSE,
  ADMIN_MESSAGE, ADMIN_MODAL_TYPE_MENU_SET,
  ADMIN_MODAL_TYPE_RESTORANT_SET, ADMIN_MODAL_OPEN,
  ADMIN_GET_ORDERS
} from '../types'

const initialState = {
  isOpen: false,
  modalType: true,
  message: null,
  index: null,
  orders: {}
}

export default function authReducer (state = initialState, action) {
  switch (action.type) {
    case ADMIN_MODAL_TYPE_MENU_SET:
      return {
        ...state, modalType: false
      }
    case ADMIN_MODAL_TYPE_RESTORANT_SET:
      return {
        ...state, modalType: true
      }
    case ADMIN_MODAL_OPEN:
      return {
        ...state, isOpen: true, index: action.index
      }
    case ADMIN_MODAL_CLOSE:
      return {
        ...state, isOpen: false
      }

    case ADMIN_MESSAGE:
      return {
        ...state, message: action.message
      }
    case ADMIN_GET_ORDERS:
      return {
        ...state, orders: { ...action.orders }
      }

    default:
      return state
  }
}
