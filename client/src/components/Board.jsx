import React from "react";
import { useSelector } from "react-redux";
import { makeMove } from "../socket";

const Board = () => {
  const { board, turn, id: gameID } = useSelector(state => state.game);
  const { id } = useSelector(state => state.user);
  return <div className="grid grid-cols-3 grid-rows-3 grid-flow-col bg-yellow-200 gap-2 mx-auto">
    { board && board.map((col, i) => {
      return col.map((row, k) => row ? <div key={i+row} className="bg-yellow-100 w-32 h-32 flex flex-col justify-center items-center text-yellow-300 text-8xl">
        {id === row ? "X" : "O"}
      </div> : <div key={i+ (Math.random() * 20)} className={`bg-yellow-100 w-32 h-32 flex flex-col justify-center items-center text-yellow-100 text-8xl transition-colors cursor-${turn ? "pointer hover:text-yellow-300" : "default"}`}
        onClick={() => turn && makeMove(gameID, { x: i, y: k })}>X
      </div>);
    }) }
  </div>;
};

export default Board;
