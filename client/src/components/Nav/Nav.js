import React from 'react';
import './Nav.css';

const Navbar = () => (
  <nav className="navbar sticky-top border bg-light h-100vp m-2 align-items-none d-block pos-fix box-shadow">
    <a className="navbar-brand text-dark d-block" href="/">Eric Ng</a>
    <hr />
    <a className="nav-item d-block" href="/">Home</a>
    <a className="nav-item d-block" href="/gallery">Gallery</a>
    <a className="nav-item d-block" href="/contact">Contact</a>
  </nav>
)

export default Navbar;