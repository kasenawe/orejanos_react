import "./Footer.css";

import { Col, Container, Row } from "react-bootstrap";

function Footer() {
  return (
    <footer id="footer">
      <Row className="footer-fat">
        <Col xs={12} md={12} lg={4} className="col-footer">
          <img
            src="/img/Orejanos_green_black.png"
            alt="OrejanosLogo"
            className="footer-logo"
          />
        </Col>
        <Col xs={12} md={12} lg={4} className="col-footer">
          <p className="footer-title text-start">Info Legal</p>

          <button className="footer-text text-start">
            Política de privacidad
          </button>

          <button className="footer-text text-start">
            Política de cookies
          </button>

          <button className="footer-text text-start">Contacto</button>
        </Col>{" "}
        <Col xs={12} md={12} lg={4} className="col-footer">
          <p className="footer-title text-start">Síguenos</p>

          <button className="footer-text text-start">Facebook</button>

          <button className="footer-text text-start">Instagram</button>
        </Col>
      </Row>
      <Row className="footer-thin d-flex justify-content-center">
        <Col xs={12} md={6} lg={4} lg-offset={4}>
          <p className="footer-text-copy-names">
            © 2023 OREJANOS BANDA | Webmaster - Kasenawe
          </p>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
