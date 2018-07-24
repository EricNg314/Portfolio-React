import React, { Component } from 'react';
import logo from './logo.svg';
import Nav from './components/Nav';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="d-flex">
        <Nav />
        <div className="App w-100">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </div>
    );
  }
}

export default App;
