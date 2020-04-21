import { CART_OPEN, CART_CLOSE, ADD_REMOVE_TO_CART, CART_BTN_BLOCK, CART_BTN_NO_BLOCK } from '../types'
import axios from 'axios'

export function cartOpen () {
  return {
    type: CART_OPEN
  }
}

export function cartClose () {
  return {
    type: CART_CLOSE
  }
}

export function cartBtnBlock () {
  return {
    type: CART_BTN_BLOCK
  }
}

export function cartBtnNoBlock () {
  return {
    type: CART_BTN_NO_BLOCK
  }
}

export function addRemoveToCart (newCart) {
  return {
    type: ADD_REMOVE_TO_CART,
    newCart
  }
}

export function resetCart () {
  return async dispatch => {
    await axiosPostCart({})
    dispatch(addRemoveToCart({}))
    localStorage.setItem('cart', null)
  }
}

const axiosPostCart = async (cart) => {
  if (!localStorage.getItem('token')) {
    return
  }
  const userId = localStorage.getItem('userId')

  await axios.put(`https://fooddelivery-305b0.firebaseio.com/cart/${userId}.json`, cart)
}

const axiosPostOrder = async (order) => {
  await axios.post('https://fooddelivery-305b0.firebaseio.com/orders.json', order)
}

export const createOrder = (order) => {
  return async dispatch => {
    await axiosPostOrder(order)
  }
}

export const addFromCart = (id) => {
  return async (dispatch, getState) => {
    dispatch(cartBtnBlock())
    const cart = getState().cart.cart
    let score = cart[id]
    const newCart = { ...cart }
    if (score) {
      newCart[id] = ++score
    } else {
      newCart[id] = 1
    }
    await axiosPostCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
    dispatch(addRemoveToCart(newCart))
    dispatch(cartBtnNoBlock())
  }
}

export const removeFromCart = (id, onDelete = false) => {
  return async (dispatch, getState) => {
    dispatch(cartBtnBlock())
    const cart = getState().cart.cart
    let score = cart[id]

    const newCart = { ...cart }
    if (score !== 1 && !onDelete) {
      newCart[id] = --score
    } else {
      delete newCart[id]
    }
    await axiosPostCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
    dispatch(addRemoveToCart(newCart))
    dispatch(cartBtnNoBlock())
  }
}
