import "./CreateAlbumModal.css";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";

function CreateAlbumModal({ show, setShow, render, setRender }) {
  const admin = useSelector((state) => state.admin);

  const handleClose = () => {
    setShow(false);
    setImages([]);
    setDescriptions([]);
    setErrorMessage("");
  };
  const handleShow = () => setShow(true);

  const [nameValue, setName] = useState(""); // Nuevo estado
  const [imagesValue, setImages] = useState([]);
  const [descriptions, setDescriptions] = useState([]);

  const [coverImageValue, setCoverImage] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createAlbum = async (event) => {
    event.preventDefault();

    if (nameValue.trim() === "") {
      alert("Por favor, ingresa un nombre para el álbum.");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();

      formData.append("name", nameValue);
      for (let i = 0; i < imagesValue.length; i++) {
        formData.append("images", imagesValue[i]);
        formData.append("descriptions", descriptions[i] || ""); // Si no hay descripción, se agrega una cadena vacía
      }

      await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_DOMAIN}/api/album`,
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
        show={show}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
      >
        <Modal.Body className="create-modal-body">
          <div className="close-button" onClick={handleClose}>
            <div className="close-circle-black">
              <FontAwesomeIcon icon={faTimes} className="close-icon" />
            </div>
          </div>
          <div className="create-modal-content">
            <h3 className="create-modal-text text-center">Crear album</h3>
            {errorMessage && (
              <p className="create-modal-error-message">{errorMessage}</p>
            )}
            {isLoading && <Loader />}
            <Form onSubmit={createAlbum}>
              <Form.Label htmlFor="name">Nombre</Form.Label>
              <Form.Control
                type="text"
                id="name"
                placeholder="Nombre del álbum"
                onChange={(event) => setName(event.target.value)}
              />

              <Form.Label htmlFor="images">Imagenes</Form.Label>
              <Form.Control
                type="file"
                id="images"
                multiple // Allow multiple file selection
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
                  className="create-modal-btn"
                >
                  Cerrar
                </button>

                <button
                  type="submit"
                  variant="primary"
                  className="create-modal-btn"
                >
                  Crear
                </button>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateAlbumModal;
