import React, { useState } from "react";
import { Navbar, Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom';

function Header() {
  let { pathname } = useLocation();
  const [selectedNav, setSelectedNav] = useState(pathname || '/');
  return (
    <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto" activeKey="/">
        <Link 
          className="nav-link" 
          style={selectedNav === '/' ? 
            { textDecoration: 'underline', textDecorationStyle: 'solid' } : null } 
          onClick={() => setSelectedNav('/')} 
          to="/"
        >
          All
        </Link>
        <Link 
          className="nav-link" 
          onClick={() => setSelectedNav('/shorlisted-cities')} 
          to="/shorlisted-cities"
          style={selectedNav === '/shorlisted-cities' ? 
            { textDecoration: 'underline', textDecorationStyle: 'solid' } : null }
        >
          Shortlist
        </Link>
      </Nav>
    </Navbar>
  );
}
export default Header;