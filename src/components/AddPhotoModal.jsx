import "./AddPhotoModal.css";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";

function AddPhotoModal({ showAdd, setShowAdd, render, setRender, album }) {
  const admin = useSelector((state) => state.admin);

  const handleClose = () => {
    setShowAdd(false);
    setImages([]);
    setDescriptions([]);
    setErrorMessage("");
  };

  const [imagesValue, setImages] = useState([]);
  const [descriptions, setDescriptions] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddPhoto = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData();

      for (let i = 0; i < imagesValue.length; i++) {
        formData.append("images", imagesValue[i]);
        formData.append("descriptions", descriptions[i] || ""); // Si no hay descripción, se agrega una cadena vacía
      }

      await axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_DOMAIN}/api/album/add/${album.id}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + admin.token,
        },
      });
      setRender(render + 1);
      setImages([]);
      setDescriptions([]);
      handleClose();
    } catch (error) {
      console.error("Error al crear el álbum:", error);
      setErrorMessage(
        "Error al crear el álbum. Por favor, inténtalo nuevamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        size="md"
        show={showAdd}
        onHide={() => {
          setShowAdd(false);
          setErrorMessage("");
          setImages([]);
          setDescriptions([]);
        }}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
      >
        <Modal.Body className="add-photo-modal-body">
          <div
            className="close-button"
            onClick={() => {
              setShowAdd(false);
              setErrorMessage("");
              setImages([]);
              setDescriptions([]);
            }}
          >
            <div className="close-circle-black">
              <FontAwesomeIcon icon={faTimes} className="close-icon" />
            </div>
          </div>
          <div className="add-photo-modal-content">
            <h3 className="add-photo-modal-text text-center">
              Agregar Fotos al album
            </h3>
            {errorMessage && (
              <p className="add-photo-modal-error-message">{errorMessage}</p>
            )}
            {isLoading && <Loader />}
            <Form onSubmit={handleAddPhoto}>
              <Form.Label
                htmlFor="images"
                className="add-photo-modal-input-group"
              >
                Agregar Imagenes
              </Form.Label>
              <Form.Control
                type="file"
                id="images"
                multiple // Allow multiple file selection
                className="add-photo-modal-input-group text-white"
                onChange={(event) => setImages(event.target.files)}
                required
              />

              {imagesValue.length > 0 &&
                Array.from(imagesValue).map((image, index) => (
                  <div key={index} className="add-photo-modal-input-group">
                    <Form.Label htmlFor={`description-${index}`}>
                      Descripción de la Foto {index + 1}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id={`description-${index}`}
                      value={descriptions[index] || ""}
                      onChange={(event) => {
                        const updatedDescriptions = [...descriptions];
                        updatedDescriptions[index] = event.target.value;
                        setDescriptions(updatedDescriptions);
                      }}
                    />
                  </div>
                ))}
              <div className="d-flex gap-4">
                <button
                  type="button"
                  variant="secondary"
                  onClick={handleClose}
                  className="add-photo-modal-btn"
                >
                  Cerrar
                </button>

                <button
                  type="submit"
                  variant="primary"
                  className="add-photo-modal-btn"
                >
                  Aceptar
                </button>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddPhotoModal;
