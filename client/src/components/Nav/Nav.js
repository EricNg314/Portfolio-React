import React from 'react';
import {HashLink as Link} from 'react-router-hash-link';
import './Nav.css';

const Navbar = () => (
  <nav className="navbar sticky-top border bg-light h-100vp m-2 align-items-none d-block pos-fix box-shadow">
    <Link className="navbar-brand text-dark d-block" to="/">Eric Ng</Link>
    <hr />
    <Link to="#aboutId" className="d-block">About</Link>
    <Link to="#galleryId" className="d-block">Gallery</Link>
    <Link to="#contactId" className="d-block">Contact</Link>
  </nav>
)

export default Navbar;