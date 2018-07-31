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
                Welcome to my new portfolio, it's currently under construction so please visit my old html/javascript portfolio in the mean time. 
              </p>
              <a href="https://ericng314.github.io/Portfolio/">https://ericng314.github.io/Portfolio/</a>
            </div>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
