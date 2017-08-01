import { IS_LOADING, IS_ERROR } from "../actions/App";

export default function app(state = [], action = []) {
  switch (action.type) {
    case IS_LOADING:
      if (action.isLoading) {
        state.errors = [];
      }
      return { ...state, isLoading: action.isLoading };
    case IS_ERROR:
      return { ...state, errors: action.errors };
    default:
      return state;
  }
}
