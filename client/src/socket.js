import { io } from "socket.io-client";
import {toast} from "react-toastify";
import store from "./redux";
import {setIdState, setNickState} from "./redux/user/actions";

const ENDPOINT = "http://localhost:8081";

const socket = io(ENDPOINT).connect();

socket.on("NICK_EXISTS", () => {
	toast.error("Nickname already in use");
});
socket.on("NICK_SET", (nick) => {
	store.dispatch(setNickState(nick));
	store.dispatch(setIdState(socket.id));
	toast.success(`Welcome ${nick}!`);
});
socket.on("ROOM_IS_FULL", res => {
	console.log(res);
	toast.warn("Game is full");
});
socket.on("ROOM_IS_NOT_EXIST", () => {
	console.log("ROOM_IS_NOT_EXIST");
});
socket.on("JOINED_GAME", res => {
	console.log("joined the game");
	console.log(res);
});
socket.on("WAITING_FOR_OPPONENT", () => {
	console.log("Waiting opponent");
});
socket.on("GAME_STARTED", res => {
	console.log("started");
	console.log(res);
});

export const setNick = (nick) => socket.emit("SET_NICK", nick);
export const createRoom = () => socket.emit("CREATE_ROOM");
export const joinRoom = (id) => socket.emit("JOIN_ROOM", id);

export default socket;
