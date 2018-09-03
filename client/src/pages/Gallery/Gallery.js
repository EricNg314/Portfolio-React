import React, { Component } from 'react';
import { getAllProjects } from '../../utils/API';

import { Col, Row, Container } from '../../components/Grid';

class Gallery extends Component {

  state = {
    projectss: []
  }

  componentDidMount() {
    this.loadProjects();
  }

  //Function to add projects.
  loadProjects = () => {
    getAllProjects();
  }

  render() {
    return (
      <Container fluid>
        <h1 className='text-center'>
          Gallery Under Construction
        </h1>
        <div className='text-center'>
          <p className="App-intro">
            Welcome to my new portfolio. It's currently under construction, so please visit my old html/javascript portfolio in the mean time.
          </p>
          <a href="https://ericng314.github.io/Portfolio/">https://ericng314.github.io/Portfolio/</a>
        </div>
      </Container>
    )
  }



}

export default Gallery;

