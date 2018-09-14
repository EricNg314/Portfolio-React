import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from './logo.svg';
import Nav from './components/Nav';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import NoMatch from './pages/NoMatch';
import AboutMe from './components/AboutMe';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="">
          <Nav />
          <div className="App w-100">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <AboutMe />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/gallery" component={Gallery} />
            <Route component={NoMatch} />
          </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
