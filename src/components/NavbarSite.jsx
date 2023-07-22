import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import ButtonNav from "./ButtonNav";
import "./NavbarSite.css";

function NavbarSite() {
  return (
    <>
      <Navbar expand="lg" className="navbar-orejanos navbar-dark ">
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
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />

          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
            className="offcanvas-orejanos"
          >
            <Offcanvas.Header
              closeButton
              data-bs-theme="dark"
              className="pt-2 pb-0 px-4"
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
                <Nav.Link href="" className="">
                  <ButtonNav buttonText="INICIO" />
                </Nav.Link>
                <Nav.Link href="" className="">
                  <ButtonNav buttonText="LA DIRECTIVA" />
                </Nav.Link>
                <Nav.Link href="" className="">
                  <ButtonNav buttonText="GALERIA" />
                </Nav.Link>
                <Nav.Link href="" className="">
                  <ButtonNav buttonText="SALIDAS" />
                </Nav.Link>
                <Nav.Link href="" className="">
                  <ButtonNav buttonText="CONTACTO" />
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarSite;
