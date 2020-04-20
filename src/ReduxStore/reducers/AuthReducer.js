import {
  AUTH_MODAL_CLOSE,
  AUTH_MODAL_OPEN,

} from "../types";

const initialState = {
  isOpen:false,
};

export default function authReducer (state=initialState,action) {
  switch (action.type) {
    case AUTH_MODAL_OPEN:
      return {
        ...state,isOpen: true
      };
    case AUTH_MODAL_CLOSE:
      return {
        ...state,isOpen: false
      };

    default:
      return state
  }
}