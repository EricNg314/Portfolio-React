import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import logo from './logo.svg';
// import { Container } from './components/Grid';
import Nav from './components/Nav';
import Home from './pages/Home';
// import Gallery from './pages/Gallery';
import NoMatch from './pages/NoMatch';
import AboutMe from './components/AboutMe';
import Gallery from './components/Gallery';

import './App.css';

class App extends Component {

  state = {
    projects: []
  }

  componentDidMount(){
    
  }


  render() {
    return (
      <Router>
        <div className="">
          <Nav />
          <AboutMe />
          <Gallery />

          <div className="App w-100">

            <Switch>
              <Route exact path="/" component={Home} />
              {/* <Route exact path="/gallery" component={Gallery} /> */}
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
