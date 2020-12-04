import { combineReducers } from "redux";
import serverInfoReducer from "./serverInfo/serverInfo.reducer";

const rootReducer = combineReducers({
  serverInfo: serverInfoReducer,
});

export default rootReducer;
