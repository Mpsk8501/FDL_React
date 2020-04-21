import {
  FETCH_RESTORANTS_START,
  FETCH_RESTORANTS_SUCCESS,
  FETCH_RESTORANTS_ERROR
} from '../types'

const initialState = {
  restorants: [],
  loading: false
}

export default function quizReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_RESTORANTS_START:
      return {
        ...state, loading: true
      }
    case FETCH_RESTORANTS_SUCCESS:
      return {
        ...state, loading: false, restorants: action.restorants
      }

    case FETCH_RESTORANTS_ERROR:
      return {
        ...state, loading: false, error: action.error
      }

    default:
      return state
  }
}
