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
    tagBtnList: ['Show All', 'Entertainment', 'HTML', 'CSS', 'Javascript', 'jQuery', 'Bootstrap', 'API', 'Google Firebase', 'Express.js', 'Node.js', 'SQL', 'Sequelize', 'MongoDB', 'React', 'Redux', 'Handlebars'],
    projects: [],
    tagReqArr: ['Show All'],
    display_projects: []

  }

  componentDidMount() {
    this.getAllProjects();
  }

  getAllProjects = async () => {
    const response = await getAllProjectsAWS();
    console.log(response);
    this.setState({ projects: response['data']['data'] });
    const display = this.displayProjects(this.state.tagReqArr);
    this.setState({ display_projects: display});

  }

  // Selecting a project only if all selected tag array are within each project's tags.
  displayProjects = (tagReqArr) => {
    let display = this.state.projects.filter(project => {

      const containsAll = tagReqArr.length;
      let count = 0;

      for (let i = 0; i < tagReqArr.length; i++) {
        if (project['tags'].indexOf(tagReqArr[i]) !== -1) {
          count++;
        }
      }

      if (count === containsAll) {
        return true;
      }
      return false;

    })
    return display
  };

  selectTag = (selectedTag) => {
    let currTags = this.state.tagReqArr;
    
    if(currTags.indexOf(selectedTag) === -1){
      currTags.push(selectedTag);

      this.setState({tagReqArr: currTags});
    } else {
      const removeIndex = currTags.indexOf(selectedTag);
      currTags.splice(removeIndex, 1);

      this.setState({tagReqArr: currTags});
    }
  }


  render() {
    return (
      <Router>
        <div className="">
          <Nav />
          <AboutMe />
          <Gallery
            tagBtnList={this.state.tagBtnList}
            selectTag = {this.selectTag}
            projects={this.state.display_projects}
          />

          <div className="App w-100">

            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/Portfolio-React/" component={Home} />
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
