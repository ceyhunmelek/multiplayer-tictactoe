import React from "react";
import {setNick, joinRoom, createRoom} from "./socket";

const App = () => {
	return <div>
		<label>nick</label>
		<input onKeyDown={e => e.key === "Enter" && setNick(e.target.value)} />
		<label>join room</label>
		<input onKeyDown={e => e.key === "Enter" && joinRoom(e.target.value)} />
		<button onClick={createRoom} >Create Room</button>
	</div>;
};

export default App;
