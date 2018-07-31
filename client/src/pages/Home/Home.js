import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import logo from './logo.svg';
import logo from '../../logo.svg';
import { Col, Row, Container } from "../../components/Grid";

import './Home.css';

class Home extends Component {

  state = {
    projectss: []
  }

  componentDidMount (){
    this.SampleProjects();
  }

  //Function to add projects.
  SampleProjects = () => {
    //API.getSampleProjects
  }

  render() {
    return (

        <div className="w-100">
          <p className="App-intro">
            Welcome to my new portfolio. It's currently under construction, so please visit my old html/javascript portfolio in the mean time. 
          </p>
          <a href="https://ericng314.github.io/Portfolio/">https://ericng314.github.io/Portfolio/</a>
        </div>

    )
  }



}

export default Home;
