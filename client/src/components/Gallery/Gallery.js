import React, { Component } from 'react';
import TagBtns from '../TagBtns';
import ProjectCard from '../ProjectCard';

import './Gallery.css';

const Gallery = props => {
  const tagBtnList = props['tagBtnList'];
  const projects = props['projects'];

  return (
    <div id="galleryId">
      <div className="parallax-bg gallery_bg-img1">
        <br></br>
        <div className="container">
          <h2 className="text-center">Gallery</h2>
          <div className="row">
            <div className="col-3 p-0 tag-box">
              <div className="border bg-light rounded text-center mb-1">
                <h5 className="d-block">Tag Selection</h5>
                <label className="d-inline-block mx-2"><input type="radio" name="tagOptions" />Custom</label>
                {/* <label className="d-inline-block mx-2"><input type="radio" name="tagOptions" />Show All</label> */}
                <label className="d-inline-block mx-2"><input type="radio" name="tagOptions" />Clear</label>
              </div>
              {tagBtnList.map((tagName, index) => (
                <TagBtns
                  key={index}
                  tagName={tagName}
                  selectTag={props.selectTag}
                  tagReqArr = {props.tagReqArr}
                />
              ))}
            </div>
            <div className="col-9">
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

