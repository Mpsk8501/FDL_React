import {
  AUTH_MODAL_CLOSE,
  AUTH_MODAL_OPEN,
  AUTH_SUCCESS,
  AUTH_LOGOUT, AUTH_ERROR, AUTH_ADMIN, AUTH_NO_ADMIN

} from '../types'

const initialState = {
  isOpen: false,
  token: null,
  error: null,
  isAdmin: false
}

export default function authReducer (state = initialState, action) {
  switch (action.type) {
    case AUTH_MODAL_OPEN:
      return {
        ...state, isOpen: true
      }
    case AUTH_MODAL_CLOSE:
      return {
        ...state, isOpen: false
      }
    case AUTH_SUCCESS:
      return {
        ...state, token: action.token
      }
    case AUTH_ADMIN:
      return {
        ...state, isAdmin: true
      }
    case AUTH_NO_ADMIN:
      return {
        ...state, isAdmin: false
      }
    case AUTH_ERROR:
      return {
        ...state, error: action.error
      }
    case AUTH_LOGOUT:
      return {
        ...state, token: null, isAdmin: false
      }

    default:
      return state
  }
}
