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
    handleDropdownItemClick();
    navigate("/");
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDropdownItemClick = () => {
    setShowDropdown(false); // Contraer el menú al hacer clic en un elemento
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
                ) : showOffcanvas === false ? (
                  <Dropdown
                    className="d-flex"
                    show={showDropdown}
                    onToggle={handleDropdownToggle}
                  >
                    <Dropdown.Toggle
                      variant="danger"
                      className="navbar-drop-btn"
                    >
                      ADMIN
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="navbar-drop-menu">
                      <Link
                        to="/admins"
                        className="nav-link navbar-drop-item"
                        onClick={handleDropdownItemClick}
                      >
                        Administradores
                      </Link>
                      <Link
                        to="/admins/publicaciones"
                        className="nav-link navbar-drop-item"
                        onClick={handleDropdownItemClick}
                      >
                        Editar publicaciones
                      </Link>
                      <Link
                        to="/admins"
                        className="nav-link navbar-drop-item"
                        onClick={handleLogout}
                      >
                        Cerrar sesión
                      </Link>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <>
                    <Link
                      to="/admins"
                      className="nav-link"
                      onClick={handleCloseOffcanvas}
                    >
                      <ButtonNav
                        buttonText="ADMINISTRADORES"
                        onCanvas="onCanvas"
                        onLogout="button-nav-logout-color"
                      />
                    </Link>
                    <Link
                      to="/admins/publicaciones"
                      className="nav-link"
                      onClick={handleCloseOffcanvas}
                    >
                      <ButtonNav
                        buttonText="EDITAR PUBLICACIONES"
                        onCanvas="onCanvas"
                        onLogout="button-nav-logout-color"
                      />
                    </Link>
                    <Link
                      to="/login"
                      className="nav-link"
                      onClick={handleLogout}
                    >
                      <ButtonNav
                        buttonText="CERRAR SESION"
                        onCanvas="onCanvas"
                        onLogout="button-nav-logout-color"
                      />
                    </Link>
                  </>
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
