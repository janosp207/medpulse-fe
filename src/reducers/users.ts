import User from "../classes/user";
import { SET_USER } from "../constants";

interface IActionSetUser {
  type: string,
  payload: any,
}

type Action = IActionSetUser

const INITIAL_STATE = {
  user: null,
}

export default function users(state = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: new User(action.payload),
      }
    default:
      return state
  }
}
