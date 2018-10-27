import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import './Nav.css';

const Navbar = () => (
  <nav className="navbar sticky-top border h-100vp m-2 align-items-none lg-d-block_md-d-inline-flex pos-fix box-shadow bg-trans-white">
    <Link
      to="/"
      className="navbar-brand text-dark d-block">Eric Ng</Link>
    <hr className="med-scrn" />
    <div className="md-ml-auto md-my-auto">
      <Link
        to="#aboutId"
        scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        className="lg-d-block_md-d-initial md-mx-1">About</Link>
      <Link
        to="#galleryId"
        scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        className="lg-d-block_md-d-initial md-mx-1">Gallery</Link>
      <Link smooth
        to="#contactMeId"
        scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        className="lg-d-block_md-d-initial md-mx-1">Contact</Link>
    </div>
  </nav>
)

export default Navbar;