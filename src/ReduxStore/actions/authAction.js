import axios from 'axios'

import {
  AUTH_MODAL_OPEN,
  AUTH_MODAL_CLOSE,
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_ADMIN,
  AUTH_NO_ADMIN
} from '../types'
import { addRemoveToCart, resetCart } from './cartActions'

export function authOpen () {
  return {
    type: AUTH_MODAL_OPEN
  }
}

export function authClose () {
  return {
    type: AUTH_MODAL_CLOSE
  }
}

function setAdmin () {
  return {
    type: AUTH_ADMIN
  }
}

function setNoAdmin () {
  return {
    type: AUTH_NO_ADMIN
  }
}

async function loadCart (userId) {
  return await axios.get(`https://fooddelivery-305b0.firebaseio.com/cart/${userId}.json`)
}

async function loadUser (userId) {
  return await axios.get(`https://fooddelivery-305b0.firebaseio.com/users/${userId}.json`)
}

export function auth (email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email,
      password,
      returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDaQrpwFeIHeUlgeBFN_ECgALdmzzv2wRA'

    if (!isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDaQrpwFeIHeUlgeBFN_ECgALdmzzv2wRA'
    }
    try {
      const response = await axios.post(url, authData)

      const data = response.data

      const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

      localStorage.setItem('token', data.idToken)
      localStorage.setItem('userId', data.localId)
      localStorage.setItem('expirationDate', expirationDate)

      dispatch(authSuccess(data.idToken))
      dispatch(autoLogout(data.expiresIn))

      if (isLogin) {
        if (data.localId === 'iwS6pLLr4qQLQlWkAU9vfWUK4ww1') {
          dispatch(setAdmin())
        } else {
          const cart = await loadCart(data.localId)
          const user = await loadUser(data.localId)
          localStorage.setItem('userName', user.data.userName)
          localStorage.setItem('userPhone', user.data.userPhone)
          localStorage.setItem('cart', JSON.stringify(cart.data))
          dispatch(addRemoveToCart(cart.data))
          dispatch(setNoAdmin())
        }
        dispatch(authClose())
      } else {
        dispatch(setNoAdmin())
      }
    } catch (e) {
      dispatch(authError('Неправильный логин или пароль'))
      setTimeout(() => {
        dispatch(authError(null))
      }, 3000)
    }
  }
}

export function register (email, password, name, phone) {
  return async dispatch => {
    try {
      await dispatch(auth(email, password, false))
      const userId = localStorage.getItem('userId')
      await axios.put(`https://fooddelivery-305b0.firebaseio.com/users/${userId}.json`, {
        userName: name,
        userPhone: phone
      })
      localStorage.setItem('userName', name)
      localStorage.setItem('userPhone', phone)
      dispatch(authError(`Поздравляем вы зарегистрированы ${name}!`))
      setTimeout(() => {
        dispatch(resetCart())
        dispatch(authError(null))
        dispatch(authClose())
      }, 3000)
    } catch (e) {
      console.log(e.message)
    }
  }
}

export function autoLogin () {
  return dispatch => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    dispatch(addRemoveToCart(cart))
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('userId')

    if (!token) {
      dispatch(logout())
      dispatch(setNoAdmin())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout())
        dispatch(setNoAdmin())
      } else {
        if (id === 'iwS6pLLr4qQLQlWkAU9vfWUK4ww1') {
          dispatch(setAdmin())
        } else {
          dispatch(setNoAdmin())
        }
        dispatch(authSuccess(token))
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}

export function logout () {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT
  }
}

export function autoLogout (time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}

export function authSuccess (token) {
  return {
    type: AUTH_SUCCESS,
    token
  }
}
export function authError (error) {
  return {
    type: AUTH_ERROR,
    error
  }
}
