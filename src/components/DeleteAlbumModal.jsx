import "./DeleteAlbumModal.css";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function DeleteAlbumModal({ showDelete, setShowDelete, album }) {
  const admin = useSelector((state) => state.admin);
  const navigate = useNavigate();

  const handleClose = () => {
    setShowDelete(false);
    setErrorMessage("");
  };
  const handleShow = () => setShow(true);

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_API_DOMAIN}/admin/album/delete/${
          album.id
        }`,

        headers: {
          Authorization: "Bearer " + admin.token,
        },
      });
    } catch (error) {
      console.error("Error al eliminar el álbum:", error);
      setErrorMessage(
        "Error al eliminar el álbum. Por favor, inténtalo nuevamente."
      );
    } finally {
      setIsLoading(false);
      navigate("/galeria");
    }
  };

  return (
    <>
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
      <Modal
        size="md"
        show={showDelete}
        onHide={() => {
          setShowDelete(false);
          setErrorMessage("");
        }}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
      >
        <Modal.Body className="delete-album-modal-body">
          <div
            className="close-button"
            onClick={() => {
              setShowDelete(false);
              setErrorMessage("");
            }}
          >
            <div className="close-circle-black">
              <FontAwesomeIcon icon={faTimes} className="close-icon" />
            </div>
          </div>
          <div className="delete-album-modal-content">
            <h3 className="delete-album-modal-text text-center">
              ¿Esta seguro que quiere eliminar este album y todo su contenido?
            </h3>
            {errorMessage && (
              <p className="delete-album-modal-error-message">{errorMessage}</p>
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

            <div className="d-flex gap-4">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="delete-album-modal-btn"
              >
                No
              </Button>

              <Button
                type="submit"
                variant="primary"
                className="delete-album-modal-btn"
                onClick={() => handleDelete()}
              >
                Si
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteAlbumModal;
