import React, { Component } from 'react';
import TagBtns from '../TagBtns';
import ProjectCard from '../ProjectCard';

import './Gallery.css';

const Gallery = props => {
  const tagBtnList = props['tagBtnList'];
  const projects = props['projects'];
  const tagReqArr = props['tagReqArr'];

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
          <h2 className="text-center">Gallery</h2>
          <div className="row">
            <div className="col-3 p-0 tag-box  bg-trans-white">
              <div className="rounded text-center my-2">
                <h5 className="d-block">Tag Selection</h5>
                <label className="d-inline-block mx-2"><input id='tagCustRadioId' type="radio" name="tagOptions" />Custom</label>
                {/* <label className="d-inline-block mx-2"><input type="radio" name="tagOptions" />Show All</label> */}
                <label className="d-inline-block mx-2" ><input id='tagClearRadioId' type="radio" name="tagOptions" onClick={() => props.clearTagFilter()} />Clear</label>
              </div>
              {tagBtnList.map((tagName, index) => (
                <TagBtns
                  key={index}
                  tagName={tagName}
                  selectTag={props.selectTag}
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
};

export default Gallery;

