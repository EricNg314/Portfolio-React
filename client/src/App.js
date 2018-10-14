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
    tagBtnList: ['Entertainment', 'HTML', 'CSS', 'Javascript', 'jQuery', 'Bootstrap', 'API', 'Google Firebase', 'Express.js', 'Node.js', 'SQL', 'Sequelize', 'MongoDB', 'React', 'Redux', 'Handlebars'],
    projects: [],
    tagReqArr: [],
    display_projects: []

  }

  componentDidMount() {
    this.getAllProjects();
  }

  getAllProjects = async () => {
    const response = await getAllProjectsAWS();
    this.setState({ projects: response['data']['data'] });
    this.updateStateDisplay(this.state.tagReqArr);

  }

  // Selecting a project if ALL selected tags are in the array within each project's tags.
  // NOTE: Currently not in use, using OR conditional instead of AND.
  filterDisplayProjAnd = (tagReqArr) => {
    // If there is no tags selected, then show all items.
    if(tagReqArr.length === 0) {
      return this.state.projects
    }

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

  // Selecting a project if ANY selected tags are in the array within each project's tags.
  filterDisplayProjOr = (tagReqArr) => {
    // If there is no tags selected, then show all items.
    if(tagReqArr.length === 0) {
      return this.state.projects
    }

    let display = this.state.projects.filter(project => {
      const containsAll = tagReqArr.length;
      let count = 0;

      for (let i = 0; i < tagReqArr.length; i++) {
        if (project['tags'].indexOf(tagReqArr[i]) !== -1) {
          return true;
        }
      }
      return false;
    })
    return display
  };


  // Updating display_projects state based on tags required array.
  updateStateDisplay = (tagReqArr) => {
    // Showing display based on OR tag conditional.
    const display = this.filterDisplayProjOr(tagReqArr);
    this.setState({ display_projects: display});
  }

  selectTag = (selectedTag) => {
    document.getElementById('tagCustRadioId').checked = true;
    let currTags = this.state.tagReqArr;
    
    if(currTags.indexOf(selectedTag) === -1){
      currTags.push(selectedTag);

      this.setState({tagReqArr: currTags});
      this.updateStateDisplay(this.state.tagReqArr);
    } else {
      const removeIndex = currTags.indexOf(selectedTag);
      currTags.splice(removeIndex, 1);

      this.setState({tagReqArr: currTags});
      this.updateStateDisplay(this.state.tagReqArr);
    }
  }

  clearTagFilter = () => {
    // setState takes a moment to update, so can not pass tagReqArr state to function, else it uses old tagReqArr
    // Would prefer to avoid async await.
    // Thus passing empty array to invoke function.
    this.updateStateDisplay([]);
    this.setState({tagReqArr: []});
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
            clearTagFilter = {this.clearTagFilter}
            tagReqArr = {this.state.tagReqArr}
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
