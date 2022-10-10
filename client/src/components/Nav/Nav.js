import React from 'react';
// import { HashLink as Link } from 'react-router-hash-link';
import { NavLink } from 'react-router-dom'
import './Nav.css';

const Navbar = () => (
  <nav className="navbar sticky-top border h-100vp align-items-none lg-d-block_md-d-inline-flex pos-fix box-shadow bg-trans-white">
    <NavLink
      to="/"
      className="navbar-brand text-dark d-block">Eric Ng</NavLink>
    <hr className="md-hide" />
    <div className="md-ml-auto md-my-auto">
      <NavLink
        to="#aboutId"
        scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        className="lg-d-block_md-d-initial md-mx-1">About</NavLink>
      <NavLink
        to="#galleryId"
        scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        className="lg-d-block_md-d-initial md-mx-1">Gallery</NavLink>
      <NavLink smooth
        to="#contactMeId"
        scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        className="lg-d-block_md-d-initial md-mx-1">Contact</NavLink>
      <hr className="md-hide" />
      <div className="dropdown lg-d-block_md-d-initial md-mx-1">
        <button className="btn btn-color btn-outline-dark dropdown-toggle p-1" type="button" id="dropdownMenuButton_nav" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Profiles
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton_nav">
          <a className="dropdown-item" href="https://www.linkedin.com/in/ng-eric/">LinkedIn</a>
          <a className="dropdown-item" href="https://github.com/EricNg314">Github</a>
        </div>
      </div>
    </div>
  </nav>
)

export default Navbar;