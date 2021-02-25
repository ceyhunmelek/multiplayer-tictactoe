import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { setNick, createRoom, joinRoom } from "../socket";
import { useHistory } from "react-router-dom";

const Lobby = () => {
  const user = useSelector(state => state.user);
  const game = useSelector(state => state.game);
  const history = useHistory();
  useEffect(() => game.id && history.push(`/game/${game.id}`), [game]);
  const [nickInput, setNickInput] = useState("");
  const [roomID, setRoomID] = useState("");
  return <div className="flex flex-col md:w-1/3 space-y-3">
    <div className="flex space-x-3">
      <input type="text" placeholder="Nickname" disabled={user.nick} value={nickInput} onChange={e => setNickInput(e.target.value)} onKeyDown={e => !user.nick && e.key === "Enter" && setNick(nickInput)}
        className="p-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline flex-auto"
      />
      {
        !user.nick && <button type="button" onClick={() => setNick(nickInput)}
          className="bg-yellow-700 rounded p-2 inline-flex items-center justify-center text-white hover:bg-yellow-800 focus:outline-none">
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </button>
      }
    </div>
    {
      user.nick && <>
        <button type="button" onClick={() => createRoom()}
          className="bg-yellow-700 rounded p-2 inline-flex items-center justify-center text-white hover:bg-yellow-800 focus:outline-none mt-10">
          Create Room
        </button>
        <div className="flex space-x-3">
          <input type="text" placeholder="Room ID" value={roomID} onChange={e => setRoomID(e.target.value)}
            className="p-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline flex-auto"
          />
          <button type="button" onClick={() => joinRoom(roomID)}
            className="bg-yellow-700 rounded p-2 inline-flex items-center justify-center text-white hover:bg-yellow-800 focus:outline-none">
            Join Room
          </button>
        </div>
      </>
    }
  </div>;
};

export default Lobby;
