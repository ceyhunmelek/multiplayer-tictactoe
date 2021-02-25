import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Lobby from "./components/Lobby";
import Game from "./components/Game";

const App = () => {
  return <div className="flex flex-col h-screen w-100 items-center justify-center p-10">
    <Router>
      <Switch>
        <Route path={"/game/:id"} component={Game} exact/>
        <Route path={"/"} component={Lobby}/>
      </Switch>
    </Router>
  </div>;
};

export default App;
