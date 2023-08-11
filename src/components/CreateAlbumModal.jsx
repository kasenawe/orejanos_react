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
    } finally {
      setIsLoading(false);
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
            {isLoading && (
              <div className="loader-overlay">
                <div className="loader-container">
                  <svg
                    className="loader"
                    viewBox="0 0 48 30"
                    width="48px"
                    height="30px"
                  >
                    <g
                      fill="none"
                      stroke="#1bfd9c"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                    >
                      <g transform="translate(9.5,19)">
                        <circle
                          className="loader_tire"
                          r="9"
                          strokeDasharray="56.549 56.549"
                        ></circle>
                        <g
                          className="loader_spokes-spin"
                          strokeDasharray="31.416 31.416"
                          strokeDashoffset="-23.562"
                        >
                          <circle className="loader_spokes" r="5"></circle>
                          <circle
                            className="loader_spokes"
                            r="5"
                            transform="rotate(180,0,0)"
                          ></circle>
                        </g>
                      </g>
                      <g transform="translate(24,19)">
                        <g
                          className="loader_pedals-spin"
                          strokeDasharray="25.133 25.133"
                          strokeDashoffset="-21.991"
                          transform="rotate(67.5,0,0)"
                        >
                          <circle className="loader_pedals" r="4"></circle>
                          <circle
                            className="loader_pedals"
                            r="4"
                            transform="rotate(180,0,0)"
                          ></circle>
                        </g>
                      </g>
                      <g transform="translate(38.5,19)">
                        <circle
                          className="loader_tire"
                          r="9"
                          strokeDasharray="56.549 56.549"
                        ></circle>
                        <g
                          className="loader_spokes-spin"
                          strokeDasharray="31.416 31.416"
                          strokeDashoffset="-23.562"
                        >
                          <circle className="loader_spokes" r="5"></circle>
                          <circle
                            className="loader_spokes"
                            r="5"
                            transform="rotate(180,0,0)"
                          ></circle>
                        </g>
                      </g>
                      <polyline
                        className="loader_seat"
                        points="14 3,18 3"
                        strokeDasharray="5 5"
                      ></polyline>
                      <polyline
                        className="loader_body"
                        points="16 3,24 19,9.5 19,18 8,34 7,24 19"
                        strokeDasharray="79 79"
                      ></polyline>
                      <path
                        className="loader_handlebars"
                        d="m30,2h6s1,0,1,1-1,1-1,1"
                        strokeDasharray="10 10"
                      ></path>
                      <polyline
                        className="loader_front"
                        points="32.5 2,38.5 19"
                        strokeDasharray="19 19"
                      ></polyline>
                    </g>
                  </svg>
                </div>
              </div>
            )}
            <Form onSubmit={createAlbum}>
              <Form.Label htmlFor="name" className="create-modal-input-group">
                Nombre
              </Form.Label>
              <Form.Control
                type="text"
                id="name"
                placeholder="Nombre del álbum"
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
