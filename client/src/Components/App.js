import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import ToolBox from "./MyToolbox";
import HaikuGenerator from "./HaikuGenerator";
import CreateHaikuDatabase from "./HaikuDataBase";
import Header from "./Header";
import Footer from "./Footer";
import ManageDb from "./ManageDB"
import About from "./About";

import "./App.css";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <ToolBox />
          </Route>
          <Route path="/HaikuGenerator/:id">
            <CreateHaikuDatabase />
          </Route>
          <Route path="/Generate/:id">
            <HaikuGenerator />
          </Route>
          <Route path="/ManageDb/:id">
            <ManageDb />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
