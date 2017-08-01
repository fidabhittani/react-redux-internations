import { SET_USERS, DELETE_USER, SET_USER, UPDATE_USER } from "../actions/User";

export default function Users(state = [], action = []) {
  switch (action.type) {
    case UPDATE_USER:
      return action.user;
    case SET_USERS:
      return action.users;
    case SET_USER:
      return [action.user, ...state];
    case DELETE_USER:
      return state.filter(item => item._id !== action.userId);
    default:
      return state;
  }
}
