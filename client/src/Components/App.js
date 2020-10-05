import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import ToolBox from "./MyToolbox";
import HaikuGenerator from "./HaikuGenerator";
import CreateHaikuDatabase from "./HaikuDataBase";
import About from "./About";

import "./App.css";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <ToolBox />
          </Route>
          <Route path="/HaikuGenerator/:id">
            <HaikuGenerator />
          </Route>
          <Route path="/CreateMyHaikuDataBase/:id">
            <CreateHaikuDatabase />
          </Route>
          <Route path="/About">
            <About />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
