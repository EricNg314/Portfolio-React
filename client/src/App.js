import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import logo from './logo.svg';
// import { Container } from './components/Grid';
import Nav from './components/Nav';
import Home from './pages/Home';
// import Gallery from './pages/Gallery';
import NoMatch from './pages/NoMatch';
import AboutMe from './components/AboutMe';
import Gallery from './components/Gallery';

import ContactMeForm from './components/ContactMeForm';
import './App.css';

class App extends Component {

  state = {
    value: 'no state'

  }

  render() {
    return (
      <BrowserRouter>
        <div className="">
          <div className="App w-100">
            <Routes>
              <Route exact path="/" component={Home} />
              <Route exact path="/Portfolio-React/" component={Home} />
              <Route exact path="/gallery" component={Gallery} />
              <Route component={NoMatch} />
            </Routes>
          </div>
          <Nav />
          <AboutMe />
          <Gallery />
          <ContactMeForm />

        </div>
      </BrowserRouter>
    );
  }
}





export default App;
