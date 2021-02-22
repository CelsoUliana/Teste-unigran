import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import PessoasList from "./components/people-list.component";

class App extends Component {
  render() {
    return (
    <div>
      <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/people"} className="nav-link">
                Home
              </Link>
            </li>
        </div>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/people"]} component={PessoasList} />
          </Switch>
        </div>
    </div>
    );
  }
}

export default App;