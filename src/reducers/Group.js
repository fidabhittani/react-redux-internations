import { SET_GROUPS, SET_GROUP, DELETE_GROUP } from "../actions/Group";

export default function Group(state = [], action = []) {
  switch (action.type) {
    case SET_GROUPS:
      return action.groups;
    case SET_GROUP:
      if (state.length === 0) {
        return [action.group, ...state];
      }
      return state.map(item => {
        if (item._id === action.group._id) return action.group;
        return item;
      });
    case DELETE_GROUP:
      return state.filter(item => item._id !== action.groupId);

    default:
      return state;
  }
}
