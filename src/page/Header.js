import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../page/weblogo.png"; // Replace with the path to your logo image
import "../Style/Header.css";

import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        <img src={logo} alt="Company Logo" width="90" height="70" />
        {/* <span className="company-name">
          Avv Innovation Labs Private Limited
        </span> */}
      </Navbar.Brand>

      <Navbar.Collapse id="navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/Home">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/About">
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/Contact">
            Contact
          </Nav.Link>
          <Nav.Link as={Link} to="/">
            My Update Form
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
