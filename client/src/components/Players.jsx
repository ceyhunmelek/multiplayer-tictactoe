import React from "react";
import { useSelector } from "react-redux";

const Players = () => {
  const { opponent, turn } = useSelector(state => state.game);
  const user = useSelector(state => state.user);
  return <div className="flex space-x-4 w-full">
    <div className={`rounded p-3 w-1/2 ring-2 ring-yellow-300 ${turn ? "bg-yellow-200" : ""}`}>
      {user.nick}
    </div>
    <div className={`rounded p-3 w-1/2 ring-2 ring-yellow-300 text-right ${!turn ? "bg-yellow-200" : ""}`}>
      {opponent ? opponent.nick : "Waiting opponent"}
    </div>
  </div>;
};

export default Players;
