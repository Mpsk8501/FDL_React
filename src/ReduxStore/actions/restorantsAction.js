import axios from 'axios'

import {
  FETCH_RESTORANTS_START,
  FETCH_RESTORANTS_SUCCESS,
  FETCH_RESTORANTS_ERROR
} from '../types'

export function fetchRestorants () {
  return async dispatch => {
    dispatch(fetchRestorantsStart())
    try {
      const response = await axios.get('https://fooddelivery-305b0.firebaseio.com/rest.json')
      dispatch(fetchRestorantsSuccess(response.data))
    } catch (e) {
      // dispatch(fetchQuizzesError(e));
    }
  }
}

export function fetchRestorantsStart () {
  return {
    type: FETCH_RESTORANTS_START
  }
}

export function fetchRestorantsSuccess (restorants) {
  return {
    type: FETCH_RESTORANTS_SUCCESS,
    restorants
  }
}

export function fetchRestorantsError (e) {
  return {
    type: FETCH_RESTORANTS_ERROR,
    error: e
  }
}
