import { combineReducers } from "redux";
import taskReducer, { STATE_KEY as TASK_STATE_KEY } from "./task";
import authReducer, { STATE_KEY as AUTH_STATE_KEY } from "./auth";

const appReducer = combineReducers({
  [TASK_STATE_KEY]: taskReducer,
  [AUTH_STATE_KEY]: authReducer,
});

export default appReducer;
