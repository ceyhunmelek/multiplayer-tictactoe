import { createStore, combineReducers } from "redux";
import userReducer from "./user/reducer";
import gameReducer from "./game/reducer";

const reducers = combineReducers({ user: userReducer, game: gameReducer});
const store = createStore(reducers);

export default store;