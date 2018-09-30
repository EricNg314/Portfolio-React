import React from 'react';

import './ProjectCard.css';

const ProjectCard = props => {
  console.log("." + props['project']['image_ref'].slice(6));
  const image_ref = "." + props['project']['image_ref'].slice(6);
  // console.log(image_ref)
  
  return (
  <div className="col-sm-12 col-md-6 col-lg-6">
    <div className="portfolio-card card mx-auto mb-4">
      <img src={image_ref} className="card-img-top" >
      
      </img>
    </div>

  </div>



)}

export default ProjectCard;



