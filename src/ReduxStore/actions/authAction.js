import {AUTH_MODAL_OPEN,AUTH_MODAL_CLOSE} from "../types";

export function authOpen() {
  return {
    type: AUTH_MODAL_OPEN
  }
}

export function authClose() {
  return {
    type: AUTH_MODAL_CLOSE
  }
}