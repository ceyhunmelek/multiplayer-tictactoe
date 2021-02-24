import {SET_ID, SET_NICK} from "../constants";

const initialState = {
  id: undefined,
  nick: undefined,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
  case SET_ID:
    return { ...state, id: payload };
  case SET_NICK:
    return { ...state, nick: payload };
  default: {
    return state;
  }
  }
};

export default userReducer;
