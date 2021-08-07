import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import "./styles.css";
import Menu from "./Menu";

export default function App() {
  return (
    <div className="AppContainer">
      <Router>
        <Switch>
          <Route exact path="/"  component={Menu} />
        </Switch>
      </Router>
    </div>
  );
}
