import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import "./NavbarSite.css";

function NavbarSite() {
  return (
    <>
      <Navbar expand="lg" className="navbar-orejanos mb-3 navbar-dark ">
        <Container fluid>
          <Navbar.Brand>
            <Link to="/">
              <img
                className="navbar-logo"
                src="/img/Orejanos_green_black.svg"
                alt=""
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />

          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1" className="text-white">
                  Inicio
                </Nav.Link>
                <Nav.Link href="#action2" className="text-white">
                  La Directiva
                </Nav.Link>
                <Nav.Link href="#action2" className="text-white">
                  Galeria
                </Nav.Link>
                <Nav.Link href="#action2" className="text-white">
                  Salidas
                </Nav.Link>
                <Nav.Link href="#action2" className="text-white">
                  Contacto
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
