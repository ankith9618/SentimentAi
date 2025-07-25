import React, { useState } from 'react';
import './Navbar.css';
import { FiMenu, FiX } from 'react-icons/fi';
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';


export default function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated, isLoading} = useAuth0();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="nav-root">
      <nav className="nav-bar">
        <div className="nav-logo">
          <NavLink to="/" className="reset">
            <span className="logo-icon">🌟</span>
            <span className="logo-text">SentimentAI</span>
          </NavLink>
        </div>

        <div className="nav-actions">
          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* Nav Menu */}
      <ul className={`nav-menu ${isOpen ? 'show' : ''}`} onClick={toggleMenu}>
        <li><NavLink to="/" >Home</NavLink></li>
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
            Dashboard
          </NavLink>
        </li>
        <li><NavLink href="/platforms">Platforms</NavLink></li>
        <li><NavLink href="/demo" >Demo</NavLink></li>
        <li><NavLink href="/contact" >Contact</NavLink></li>
        <div className="nav-buttons">
          {isLoading ? <button className='signin'><ClipLoader size={25} /></button>
            :
            (!isAuthenticated ?
              <button className='signin' onClick={() => loginWithRedirect()}>Sign In</button> :

              <div className="logout" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Logout
              </div>
            )
          }
          <button className="btn get-started">Get Started</button>
        </div>
      </ul>
    </header>
  );
}
