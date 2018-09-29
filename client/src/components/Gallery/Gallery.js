import React from "react";
import './Gallery.css';

const Gallery = props =>{
  console.log(props['tagBtnList']);
  console.log(props['projects']);
  return (
  <div id="galleryId">
    <div className="parallax-100vh gallery_bg-img1">
        <br></br>
        <div className="container">
          <h2 className="text-center">Gallery</h2>


        </div>

    </div>
  </div>
)};

export default Gallery;

