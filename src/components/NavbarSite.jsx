import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import ButtonNav from "./ButtonNav";
import React from "react";
import { useState } from "react";
import "./NavbarSite.css";

function NavbarSite() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleCloseOffcanvas = () => {
    setShowOffcanvas(false);
  };

  const handleShowOffcanvas = () => {
    setShowOffcanvas(true);
  };

  return (
    <>
      <Navbar expand="xl" className="navbar-orejanos navbar-dark ">
        <Container fluid>
          <Navbar.Brand>
            <Link to="/">
              <img
                className="navbar-logo"
                src="/img/Orejanos_green_black.png"
                alt=""
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="offcanvasNavbar-expand-md"
            onClick={handleShowOffcanvas}
          />

          <Navbar.Offcanvas
            show={showOffcanvas}
            onHide={handleCloseOffcanvas}
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
            className="offcanvas-orejanos"
          >
            <Offcanvas.Header
              closeButton
              data-bs-theme="dark"
              className="pt-2 pb-0 px-4"
              onClick={handleCloseOffcanvas}
            >
              <Offcanvas.Title
                id={`offcanvasNavbarLabel-expand-lg`}
                className="mt-3"
              >
                OREJANOS
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Link
                  to="/coordinadores"
                  className="nav-link"
                  onClick={handleCloseOffcanvas}
                >
                  <ButtonNav buttonText="COORDINADORES" onCanvas="onCanvas" />
                </Link>
                <Link
                  to="/fotos"
                  className="nav-link"
                  onClick={handleCloseOffcanvas}
                >
                  <ButtonNav buttonText="FOTOS" onCanvas="onCanvas" />
                </Link>
                <Link
                  to="/salidas"
                  className="nav-link"
                  onClick={handleCloseOffcanvas}
                >
                  <ButtonNav buttonText="SALIDAS" onCanvas="onCanvas" />
                </Link>
                <Link
                  to="/contacto"
                  className="nav-link"
                  onClick={handleCloseOffcanvas}
                >
                  <ButtonNav buttonText="CONTACTO" onCanvas="onCanvas" />
                </Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarSite;
