import { SET_BOARD, SET_OPPONENT, SET_TURN, SET_GAME_ID, } from "../constants";

const initialState = {
	id: undefined,
	opponent: undefined,
	board: undefined,
	turn: undefined,
};

const gameReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
	case SET_BOARD:
		return { ...state, board: payload };
	case SET_GAME_ID:
		return { ...state, id: payload };
	case SET_OPPONENT:
		return { ...state, opponent: payload };
	case SET_TURN:
		return { ...state, turn: payload };
	default: {
		return state;
	}
	}
};

export default gameReducer;
