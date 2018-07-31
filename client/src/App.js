import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from './logo.svg';
import Nav from './components/Nav';
import NoMatch from './pages/NoMatch';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="">
          <Nav />
          <Switch>
            <div className="App w-100">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
              </header>
              <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
              </p>
            </div>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
