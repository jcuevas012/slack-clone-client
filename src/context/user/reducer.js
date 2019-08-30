import { LOGIN } from './constants'

export default function reducer(state, action) {
  switch (action.type) {
    case LOGIN:
      return { currentUser: action.user, ...state }
    default:
      return state
  }
}
