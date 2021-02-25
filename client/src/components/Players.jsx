import React from "react";
import { useSelector } from "react-redux";

const Players = () => {
  const { opponent, turn, score } = useSelector(state => state.game);
  const user = useSelector(state => state.user);
  return <div className="flex space-x-4 w-full">
    <div className={`rounded p-3 w-1/2 ring-2 ring-yellow-300 flex justify-between ${turn ? "bg-yellow-200" : ""}`}>
      <span>{user.nick}</span>
      <span className="font-extrabold text-yellow-900">{score && score[user.id] || "0"}</span>
    </div>
    <div className={`rounded p-3 w-1/2 ring-2 ring-yellow-300 flex flex-row-reverse justify-between ${!turn ? "bg-yellow-200" : ""}`}>
      {opponent ? <>
        <span>{opponent.nick}</span>
        <span className="font-extrabold text-yellow-900">{score && score[opponent.id] || "0"}</span>
      </> : "Waiting opponent"}
    </div>
  </div>;
};

export default Players;
