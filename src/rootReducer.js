import { combineReducers } from "redux";
import App from "./reducers/App";
import Users from "./reducers/User";
import Groups from "./reducers/Group";
export default combineReducers({
  App,
  Users,
  Groups
});
