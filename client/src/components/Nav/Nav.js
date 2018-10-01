import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import './Nav.css';

const Navbar = () => (
  <nav className="navbar sticky-top border bg-light h-100vp m-2 align-items-none d-block pos-fix box-shadow">
    <Link 
      to="/"
      className="navbar-brand text-dark d-block">Eric Ng</Link>
    <hr />
    <Link
      to="#aboutId"
      scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
      className="d-block">About</Link>
    <Link
      to="#galleryId"
      scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
      className="d-block">Gallery</Link>
    <Link smooth
      to="#contactId"
      scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
      className="d-block">Contact</Link>
  </nav>
)

export default Navbar;