import React, { Component } from 'react';
import TagBtns from '../TagBtns';
import ProjectCard from '../ProjectCard';
import { getAllProjectsAWS } from '../../utils/API';
import './Gallery.css';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagBtnList: ['Entertainment', 'HTML', 'CSS', 'Javascript', 'jQuery', 'Bootstrap', 'API', 'Google Firebase', 'Express.js', 'Node.js', 'SQL', 'Sequelize', 'MongoDB', 'React', 'Redux', 'Handlebars'],
      projects: [],
      tagReqArr: [],
      display_projects: []
    }
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
    if (tagReqArr.length === 0) {
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
    if (tagReqArr.length === 0) {
      return this.state.projects
    }

    let display = this.state.projects.filter(project => {
      // const containsAll = tagReqArr.length;
      // let count = 0;

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
    this.setState({ display_projects: display });
  }

  selectTag = (selectedTag) => {
    document.getElementById('tagCustRadioId').checked = true;
    let currTags = this.state.tagReqArr;

    if (currTags.indexOf(selectedTag) === -1) {
      currTags.push(selectedTag);

      this.setState({ tagReqArr: currTags });
      this.updateStateDisplay(this.state.tagReqArr);
    } else {
      const removeIndex = currTags.indexOf(selectedTag);
      currTags.splice(removeIndex, 1);

      this.setState({ tagReqArr: currTags });
      this.updateStateDisplay(this.state.tagReqArr);
    }
  }

  clearTagFilter = () => {
    // setState takes a moment to update, so can not pass tagReqArr state to function, else it uses old tagReqArr
    // Would prefer to avoid async await.
    // Thus passing empty array to invoke function.
    this.updateStateDisplay([]);
    this.setState({ tagReqArr: [] });
  }

  render() {
    const tagBtnList = this.state.tagBtnList;
    const projects = this.state.display_projects;
    const tagReqArr = this.state.tagReqArr;

    let tagSelectedText = () => {
      if (tagReqArr.length > 1) {
        return `Selecting ${tagReqArr.slice(0, tagReqArr.length - 1).join(', ')} or ${tagReqArr[tagReqArr.length - 1]}.`
      } else if (tagReqArr.length === 1) {
        return `Selecting only ${tagReqArr[0]}.`
      } else {
        return "";
      }
    }

    return (
      <div id="galleryId">
        <div className="parallax-bg gallery_bg-img1">
          <br></br>
          <div className="container">
            <h2 className="text-center py-5">Gallery</h2>
            <div className="row">
              <div className="col-3 p-0 tag-box  bg-trans-white">
                <div className="rounded text-center my-2">
                  <h5 className="d-block">Tag Selection</h5>
                  <label className="d-inline-block mx-2"><input id='tagCustRadioId' type="radio" name="tagOptions" />Custom</label>
                  <label className="d-inline-block mx-2" ><input id='tagClearRadioId' type="radio" name="tagOptions" onClick={() => this.clearTagFilter()} />Clear</label>
                </div>
                {tagBtnList.map((tagName, index) => (
                  <TagBtns
                    key={index}
                    tagName={tagName}
                    selectTag={this.selectTag}
                    tagReqArr={tagReqArr}
                  />
                ))}
              </div>
              <div className="col-9">
                <h5 className="text-center bg-trans-white rounded">{tagSelectedText()}</h5>
                <div className="row">
                  {projects.map((project, index) => (
                    <ProjectCard
                      key={index}
                      project={project}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default Gallery;

