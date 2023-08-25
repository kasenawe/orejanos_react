import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
import ButtonNav from "./ButtonNav";
import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeToken } from "../redux/adminSlice";
import { Dropdown } from "react-bootstrap";

import "./NavbarSite.css";

function NavbarSite() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const admin = useSelector((state) => state.admin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseOffcanvas = () => {
    setShowOffcanvas(false);
  };

  const handleShowOffcanvas = () => {
    setShowOffcanvas(true);
  };

  const handleLogout = () => {
    dispatch(removeToken());
    handleCloseOffcanvas();
    navigate("/");
  };

  return (
    <div className="navbar-container">
      {admin && (
        <p className="navbar-loggedas">
          Bienvenido: {admin.firstname} {admin.lastname}
        </p>
      )}
      <Navbar expand="xxl" className="navbar-orejanos navbar-dark ">
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
                  to="/galeria"
                  className="nav-link"
                  onClick={handleCloseOffcanvas}
                >
                  <ButtonNav buttonText="GALERIA" onCanvas="onCanvas" />
                </Link>
                <Link
                  to="/publicaciones"
                  className="nav-link"
                  onClick={handleCloseOffcanvas}
                >
                  <ButtonNav buttonText="PUBLICACIONES" onCanvas="onCanvas" />
                </Link>
                <Link
                  to="/horarios"
                  className="nav-link"
                  onClick={handleCloseOffcanvas}
                >
                  <ButtonNav buttonText="HORARIOS" onCanvas="onCanvas" />
                </Link>
                <Link
                  to="/contacto"
                  className="nav-link"
                  onClick={handleCloseOffcanvas}
                >
                  <ButtonNav buttonText="CONTACTO" onCanvas="onCanvas" />
                </Link>
                {!admin ? (
                  <Link
                    to="/login"
                    className="nav-link"
                    onClick={handleCloseOffcanvas}
                  >
                    <ButtonNav buttonText="LOGIN" onCanvas="onCanvas" />
                  </Link>
                ) : (
                  <Dropdown className="d-flex">
                    <Dropdown.Toggle className="navbar-drop-btn">
                      <ButtonNav
                        buttonText="ADMIN"
                        onCanvas="onCanvas"
                        onLogout="button-nav-logout-color"
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="navbar-drop-menu">
                      <Link to="/admins" className="nav-link navbar-drop-item">
                        Administradores
                      </Link>
                      <Link to="/" className="nav-link navbar-drop-item">
                        Editar publicaciones
                      </Link>
                      <Link
                        to="/"
                        className="nav-link navbar-drop-item"
                        onClick={handleLogout}
                      >
                        Cerrar sesión
                      </Link>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarSite;
