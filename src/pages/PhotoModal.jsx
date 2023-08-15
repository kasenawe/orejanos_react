import "./PhotoModal.css";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import DeletePhotoModal from "../components/DeletePhotoModal";
import Loader from "../components/Loader";

function PhotoModal({
  showPhotoModal,
  setShowPhotoModal,
  images,
  selectedPhotoIndex,
  setSelectedPhotoIndex,
  album,
  render,
  setRender,
}) {
  const admin = useSelector((state) => state.admin);

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

  const [showDeletePhotoModal, setShowDeletePhotoModal] = useState(false);
  const handleDeletePhotoModal = () => {
    setShowDeletePhotoModal(true);
  };

  const [descriptionValue, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setDescription(images[selectedPhotoIndex]?.description || "");
  }, [selectedPhotoIndex, images]);

  const handleEditPhoto = async (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    try {
      console.log(images[selectedPhotoIndex]._id);
      setIsLoading(true);
      const response = await axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_DOMAIN}/admin/album/edit/photo/${
          images[selectedPhotoIndex]._id
        }`,
        data: {
          description: descriptionValue,
        },
        headers: {
          Authorization: "Bearer " + admin.token,
        },
      });
      setRender(render + 1);
      console.log(response.data);
      // Actualiza el estado del álbum con el nuevo nombre
      //setAlbum((prevAlbum) => ({ ...prevAlbum, name: nameValue }));

      // Opcional: mostrar un mensaje de éxito aquí
      //setShowEditModal(true);
    } catch (error) {
      // Manejar el error aquí (puede mostrar un mensaje de error, por ejemplo)
      console.error("Error updating photo description:", error);
      setErrorMessage("Error updating photo description.");
    } finally {
      setIsLoading(false);
    }
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
          {admin && (
            <div
              className="photo-modal-delete-icon"
              onClick={handleDeletePhotoModal}
            >
              <img src="/img/trash3-fill.svg" alt="trash-icon" />
            </div>
          )}
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
          {images[selectedPhotoIndex] && admin ? (
            <>
              <Form
                onSubmit={handleEditPhoto}
                className="album-edit-form gap-2"
              >
                <Form.Label
                  htmlFor="description"
                  classdescription="album-edit-label"
                >
                  Modificar descripcion:
                </Form.Label>
                <Form.Control
                  type="text"
                  id="description"
                  value={descriptionValue}
                  onChange={(event) => setDescription(event.target.value)}
                  className="album-edit-input "
                />
                <button type="submit" className="album-button">
                  Aplicar
                </button>
                {/* Botón para guardar cambios */}
              </Form>
            </>
          ) : (
            images[selectedPhotoIndex] && (
              <p className="text-white text-center mb-0 mt-2">
                {images[selectedPhotoIndex].description}
              </p>
            )
          )}
        </Modal.Body>
        {isLoading && <Loader />}
      </Modal>
      <DeletePhotoModal
        showDeletePhotoModal={showDeletePhotoModal}
        setShowDeletePhotoModal={setShowDeletePhotoModal}
        image={images[selectedPhotoIndex]}
        showPhotoModal={showPhotoModal}
        setShowPhotoModal={setShowPhotoModal}
        album={album}
        render={render}
        setRender={setRender}
      />
    </>
  );
}

export default PhotoModal;
