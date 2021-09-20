import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import "./styles.css";
import Menu from "./Menu";
import { AccountBox } from './components/accountBox';
import Dashboard from "./components/Dashboard/Dashboard";
import Session from 'react-session-api';

export default function App() {

  useEffect(() => {
    Session.set("loggedIn", false);
    Session.set("status", false);
    Session.set("table_number", "");
  }, []);
  

  return (
    <div className="AppContainer">
      <Router>
        <Switch>
          <Route exact path="/menu"  component={Menu} />
          <Route exact path="/"  component={AccountBox} />
          <Route exact path="/dashboard"  component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}
