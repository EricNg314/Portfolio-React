import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';
// import { Link } from 'react-router-dom'
// import logo from './logo.svg';
import logo from '../../logo.svg';
import { Col, Row, Container } from "../../components/Grid";

import './Home.css';

class Home extends Component {

  state = {
    projects: []
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
        <div className="col-sm-12 col-md-8 col-md-6 mx-auto md-mt-65px">
          <p className="App-intro">
            Welcome to my new portfolio. Although I am currently fixing up my portfolio, feel free to use the contact form to send me a message. 
            <span> <Link smooth
              to="#contactMeId"
              scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="lg-d-block_md-d-initial md-mx-1">Scroll to Contact Form</Link></span>
          </p>
        </div>

    )
  }



}

export default Home;
