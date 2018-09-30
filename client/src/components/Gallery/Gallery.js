import React from 'react';
import TagBtns from '../TagBtns';
import ProjectCard from '../ProjectCard';

import './Gallery.css';

const Gallery = props => {
  const tagBtnList = props['tagBtnList'];
  const projects = props['projects'];
  // let tagReqArr = props['tagReqArr']

  console.log(tagBtnList);
  console.log(projects);

  const displayProjects = (tagReqArr) => {
    let display = projects.filter(project => {

      let containsAll = tagReqArr.length;
      let count = 0;

      for (let i = 0; i < tagReqArr.length; i++) {
        if (project['tags'].includes(tagReqArr[i])) {
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


  console.log(displayProjects(['Show All']));



  return (
    <div id="galleryId">
      <div className="parallax-bg gallery_bg-img1">
        <br></br>
        <div className="container">
          <h2 className="text-center">Gallery</h2>
          <div className="row">
            <div className="col-3">
              {tagBtnList.map((tagName, index) => (
                <TagBtns
                  key={index}
                  tagName={tagName}

                />
              ))}
            </div>
            <div className="col-9">
              <div className="row">
                {displayProjects(['Show All']).map((project, index) => (
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
};

export default Gallery;

