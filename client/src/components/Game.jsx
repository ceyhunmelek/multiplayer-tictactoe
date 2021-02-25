import React from "react";
import { useSelector } from "react-redux";
import Players from "./Players";
import Board from "./Board";
import { useHistory } from "react-router-dom";

const Game = () => {
  const history = useHistory();
  const game = useSelector(state => state.game);
  if(!game.id) history.push("/");
  return <div className="w-full md:w-1/2 flex flex-col space-y-10">
    <Players />
    { game.board && <Board /> }
    { !game.board && <div className="text-center bg-yellow-800 rounded text-white p-3">Room ID: {game.id}</div> }
  </div>;
};

export default Game;
