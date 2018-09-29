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
import { getAllProjectsAWS } from './utils/API';

import './App.css';

class App extends Component {

  state = {
    projects: [],
    tagBtnList: ["Show All", "Entertainment", "HTML", "CSS", "Javascript", "jQuery", "Bootstrap", "API", "Google Firebase", "Express.js", "Node.js", "SQL", "Sequelize", "MongoDB", "React", "Redux", "Handlebars"]
  }

  componentDidMount() {
    this.getAllProjects();
  }

  getAllProjects = async () => {
    const data = await getAllProjectsAWS();
    this.setState({ projects: data['data'] });
  }


  render() {
    return (
      <Router>
        <div className="">
          <Nav />
          <AboutMe />
          <Gallery
            tagBtnList={this.state.tagBtnList}
            projects={this.state.projects}
          />

          <div className="App w-100">

            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/Portfolio-React/" component={Home} />
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
