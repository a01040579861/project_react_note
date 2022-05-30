import React from "react";
import Board from "./Board";
import Edit from "./Edit";
import Word from "./Word";
import { Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Board />
        </Route>
        <Route path="/edit/:idx" component={Edit}></Route>
        <Route path="/word" component={Word}></Route>
      </Switch>
    </div>
  );
}

export default App;