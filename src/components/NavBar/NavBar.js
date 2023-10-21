import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../../assets/logo.png";
import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand>
            <img id="navbar-img" src={logo}></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to={"/pokemon/gallery"}>Gallery</Link>
              <Link to={"/pokemon/list"}>Search</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
