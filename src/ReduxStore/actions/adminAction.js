import {
  ADMIN_GET_ORDERS, ADMIN_MESSAGE,
  ADMIN_MODAL_CLOSE,
  ADMIN_MODAL_OPEN,
  ADMIN_MODAL_TYPE_MENU_SET,
  ADMIN_MODAL_TYPE_RESTORANT_SET
} from '../types'
import axios from 'axios'
import { fetchRestorants } from './restorantsAction'

export function adminModalSetTypeRestorant () {
  return {
    type: ADMIN_MODAL_TYPE_RESTORANT_SET
  }
}
export function adminModalSetTypeMenu () {
  return {
    type: ADMIN_MODAL_TYPE_MENU_SET
  }
}
export function adminModalOpen (index) {
  return {
    type: ADMIN_MODAL_OPEN,
    index
  }
}

export function adminModalClose () {
  return {
    type: ADMIN_MODAL_CLOSE
  }
}

export function adminGetOrders (orders) {
  return {
    type: ADMIN_GET_ORDERS,
    orders
  }
}

export function openModalRestorant () {
  return dispatch => {
    dispatch(adminModalSetTypeRestorant())
    dispatch(adminModalOpen())
  }
}
export function openModalMenu (index = null) {
  return dispatch => {
    dispatch(adminModalSetTypeMenu())
    dispatch(adminModalOpen(index))
  }
}

async function addRest (data, num) {
  return axios.patch(`https://fooddelivery-305b0.firebaseio.com/rest/${num}.json`, data)
}
async function addMenuItem (data, num, num2) {
  return axios.patch(`https://fooddelivery-305b0.firebaseio.com/rest/${num}/menu/${num2}.json`, data)
}

async function deleteRestorant (restorants) {
  return axios.put('https://fooddelivery-305b0.firebaseio.com/rest.json', restorants)
}

async function deleteMenuItem (num, item) {
  return axios.put(`https://fooddelivery-305b0.firebaseio.com/rest/${num}/menu.json`, item)
}

export function putNewRestorant (data, num) {
  return async dispatch => {
    try {
      await addRest(data, num)
      dispatch(adminMessage('Ресторан добавлен'))
      dispatch(fetchRestorants())
      setTimeout(() => {
        dispatch(adminMessage(null))
        dispatch(adminModalClose())
      }, 2000)
    } catch (e) {
      dispatch(adminMessage('Ресторан небыл добавлен'))
      setTimeout(() => {
        dispatch(adminMessage(null))
      }, 2000)
    }
  }
}

export function putNewMenuItem (menuItem) {
  return async (dispatch, getState) => {
    const num = getState().admin.index
    const menu = getState().restorants.restorants[num].menu
    let num2 = 0
    if (menu) {
      num2 = Object.keys(menu).length
    }
    menuItem.id = Date.now()

    try {
      await addMenuItem(menuItem, num, num2)
      dispatch(adminMessage('Блюдо добавлено'))
      dispatch(fetchRestorants())
      setTimeout(() => {
        dispatch(adminMessage(null))
        dispatch(adminModalClose())
      }, 2000)
    } catch (e) {
      dispatch(adminMessage('Блюдо небыло добавлено'))
      setTimeout(() => {
        dispatch(adminMessage(null))
      }, 2000)
    }
  }
}

export function delRestorant (num) {
  return async (dispatch, getState) => {
    try {
      const restorants = getState().restorants.restorants
      restorants.splice(num, 1)
      await deleteRestorant(restorants)
      dispatch(fetchRestorants())
    } catch (e) {

    }
  }
}
export function delMenuOneItem (num1, num2) {
  return async (dispatch, getState) => {
    try {
      const menu = getState().restorants.restorants[num1].menu
      menu.splice(num2, 1)
      await deleteMenuItem(num1, menu)
      dispatch(fetchRestorants())
    } catch (e) {

    }
  }
}

export function adminMessage (message) {
  return {
    type: ADMIN_MESSAGE,
    message
  }
}

export function getOrders () {
  return async (dispatch, getState) => {
    const orders = await axios.get('https://fooddelivery-305b0.firebaseio.com/orders.json')
    dispatch(adminGetOrders(orders.data))
  }
}
