import "./PhotoModal.css";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

function PhotoModal({
  showPhotoModal,
  setShowPhotoModal,
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

  const handleClosePhotoModal = () => {
    setShowPhotoModal(false);
  };

  return (
    <>
      <Modal
        size="lg"
        show={showPhotoModal}
        onHide={handleClosePhotoModal}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
      >
        <Modal.Body className="modal-body">
          <div className="close-button" onClick={handleClosePhotoModal}>
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
                  src={`${import.meta.env.VITE_SUPABASE_IMG_URL}${img.src}`}
                  alt={img.alt}
                  className="carousel-image"
                />
                <Carousel.Caption className="img-caption"></Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
          <p className="text-white text-center mb-0 mt-2">
            {images[selectedPhotoIndex].description}
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PhotoModal;
