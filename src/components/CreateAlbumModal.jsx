import "./CreateAlbumModal.css";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function CreateAlbumModal({ show, setShow, render, setRender }) {
  const admin = useSelector((state) => state.admin);

  const handleClose = () => {
    setShow(false);
    setErrorMessage("");
  };
  const handleShow = () => setShow(true);

  const [nameValue, setName] = useState(""); // Nuevo estado
  const [imagesValue, setImages] = useState([]);

  const [coverImageValue, setCoverImage] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const createAlbum = async (event) => {
    event.preventDefault();

    if (nameValue.trim() === "") {
      alert("Por favor, ingresa un nombre para el álbum.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", nameValue);
      for (let i = 0; i < imagesValue.length; i++) {
        formData.append("images", imagesValue[i]);
      }

      await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_DOMAIN}/admin/album`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + admin.token,
        },
      });
      setRender(render + 1);
      handleClose();
    } catch (error) {
      console.error("Error al crear el álbum:", error);
      setErrorMessage(
        "Error al crear el álbum. Por favor, inténtalo nuevamente."
      );
    }
  };

  return (
    <>
      <Modal
        size="md"
        show={show}
        onHide={() => {
          setShow(false);
          setErrorMessage("");
        }}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
      >
        <Modal.Body className="create-modal-body">
          <div
            className="close-button"
            onClick={() => {
              setShow(false);
              setErrorMessage("");
            }}
          >
            <div className="close-circle-black">
              <FontAwesomeIcon icon={faTimes} className="close-icon" />
            </div>
          </div>
          <div className="create-modal-content">
            <h3 className="create-modal-text text-center">Crear album</h3>
            {errorMessage && (
              <p className="create-modal-error-message">{errorMessage}</p>
            )}
            <Form onSubmit={createAlbum}>
              <Form.Label htmlFor="name" className="create-modal-input-group">
                Nombre
              </Form.Label>
              <Form.Control
                type="text"
                id="name"
                placeholder="Nombre del álbum"
                value={nameValue}
                onChange={(event) => setName(event.target.value)}
                className="create-modal-input-group"
              />

              <Form.Label htmlFor="images" className="create-modal-input-group">
                Imagenes
              </Form.Label>
              <Form.Control
                type="file"
                id="images"
                multiple // Allow multiple file selection
                className="create-modal-input-group"
                onChange={(event) => setImages(event.target.files)}
                required
              />
              <div className="d-flex gap-4">
                <Button
                  variant="secondary"
                  onClick={handleClose}
                  className="create-modal-btn"
                >
                  Cerrar
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  className="create-modal-btn"
                >
                  Crear
                </Button>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateAlbumModal;
