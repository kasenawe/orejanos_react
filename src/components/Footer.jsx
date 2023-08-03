import { useInView } from "react-intersection-observer";
import { Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react"; // Importa useRef

import "./Footer.css";

function Footer() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5, // Puedes ajustar este valor según tus necesidades
  });

  // Agrega una referencia para el elemento partner-footer
  const partnerRef = useRef(null);
  // Agrega una referencia para el texto <p>
  const textRef = useRef(null);
  const [textAnimationFinished, setTextAnimationFinished] = useState(false);

  // Usa useEffect para aplicar la animación cuando entre en el viewport
  useEffect(() => {
    if (inView) {
      if (textRef.current) {
        textRef.current.classList.add("appear-from-left");
        textRef.current.addEventListener("transitionend", () => {
          // Marca la animación de texto como finalizada
          setTextAnimationFinished(true);
        });
      }
    }
  }, [inView]);

  useEffect(() => {
    if (textAnimationFinished && partnerRef.current) {
      partnerRef.current.classList.add("appear-from-right");
    }
  }, [textAnimationFinished]);

  return (
    <footer id="footer">
      <Row
        ref={ref}
        className={`footer-partner  ${inView ? "appear-from-right" : ""}`}
      >
        <Col xs={12} md={12} lg={4} className="col-footer">
          <p className="text-partner py-3" ref={textRef}>
            Nos apoya:
          </p>
        </Col>
        <Col xs={12} md={12} lg={4} className="col-footer">
          <img
            ref={partnerRef}
            src="/img/logo_kom.svg"
            alt="OrejanosLogo"
            className="partner-logo"
          />
        </Col>
      </Row>
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
