import "./PhotoModal.css";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChevronLeft,
  faChevronRight,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

function PhotoModal({
  show,
  setShow,
  alt,
  url,
  images,
  selectedPhotoIndex,
  setSelectedPhotoIndex,
}) {
  const handleCarouselSelect = (selectedIndex) => {
    // Esta función actualiza el índice de la foto seleccionada en el carousel.
    setSelectedPhotoIndex(selectedIndex);
  };

  const [arrowIcons, setArrowIcons] = useState(false);

  const handleImageHover = (isHovering) => {
    setArrowIcons(isHovering);
  };

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Body className="modal-body">
          <div className="close-button" onClick={() => setShow(false)}>
            <div className="close-circle-black">
              <FontAwesomeIcon icon={faTimes} className="close-icon" />
            </div>
          </div>
          <Carousel
            className="mt-4"
            controls={arrowIcons}
            activeIndex={selectedPhotoIndex}
            onSelect={handleCarouselSelect}
            interval={null} // No cambia automáticamente las fotos
            keyboard // Habilita la navegación con teclado
            prevIcon={
              <div className="circle-black">
                <FontAwesomeIcon
                  icon={faArrowAltCircleLeft}
                  className="arrow-white"
                />
              </div>
            }
            nextIcon={
              <div className="circle-black">
                <FontAwesomeIcon
                  icon={faArrowAltCircleRight}
                  className="arrow-white"
                />
              </div>
            }
            onMouseEnter={(e) => handleImageHover(true)}
            onMouseLeave={(e) => handleImageHover(false)}
          >
            {images.map((img, index) => (
              <Carousel.Item key={index}>
                <img
                  src={`/img/${img.src}`}
                  alt={img.alt}
                  className="carousel-image"
                />
                <Carousel.Caption className="img-caption">
                  {img.alt}
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PhotoModal;
