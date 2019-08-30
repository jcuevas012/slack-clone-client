import { SET_CURRENT_TEAM } from './constants'

export default function reducer(state, action) {
  switch (action.type) {
    case SET_CURRENT_TEAM:
      return { currentTeam: action.user, ...state }
    default:
      return state
  }
}
