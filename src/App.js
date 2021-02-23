import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import PessoasList from "./components/people-list.component";
import PessoaAdd from './components/people-add.component';

class App extends Component {
  render() {
    return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/people"} className="nav-link">
                Listagem de Pessoas
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Cadastrar
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/people"]} component={PessoasList} />
            <Route exact path="/add" component={PessoaAdd} />
          </Switch>
        </div>
    </div>
    );
  }
}

export default App;