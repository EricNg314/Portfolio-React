import React from 'react';

import './ProjectCard.css';

const ProjectCard = props => {
  const image_ref = "." + props['project']['image_ref'].slice(6);
  // console.log(image_ref)

  return (
    <div className="col-sm-12 col-md-6 col-lg-4">
      <div className="portfolio-card card mx-auto mb-4">
        <a href={props['project']['repo_url']} className='hvr-grow'>
          <img src={image_ref} className="card-img-top" alt={props['project']['image_alt']}>
          </img>
        </a>
        <span className='text-center'>{props['project']['name']}</span>
      </div>
    </div>



  )
}

export default ProjectCard;



