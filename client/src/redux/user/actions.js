import {SET_ID, SET_NICK} from "../constants";

export const setIdState = id => ({ type: SET_ID, payload: id });
export const setNickState = nick => ({ type: SET_NICK, payload: nick });