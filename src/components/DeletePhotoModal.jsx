import "./DeletePhotoModal.css";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";

function DeletePhotoModal({
  showDeletePhotoModal,
  setShowDeletePhotoModal,
  image,
  album,
  showPhotoModal,
  setShowPhotoModal,
  render,
  setRender,
}) {
  const admin = useSelector((state) => state.admin);
  const navigate = useNavigate();

  const handleClose = () => {
    setShowDeletePhotoModal(false);
    setErrorMessage("");
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_API_DOMAIN}/api/album/delete/image/${
          image._id
        }`,

        headers: {
          Authorization: "Bearer " + admin.token,
        },
      });
    } catch (error) {
      console.error("Error al eliminar la foto:", error);
      setErrorMessage(
        "Error al eliminar la foto. Por favor, inténtalo nuevamente."
      );
    } finally {
      setIsLoading(false);
      setShowDeletePhotoModal(false);
      setShowPhotoModal(false);
      console.log(album.images);
      if (album.images.length < 2) {
        navigate(`/galeria`);
      } else {
        setRender(render + 1);
        navigate(`/album/${album.slug}`);
      }
    }
  };

  return (
    <>
      <Modal
        size="md"
        show={showDeletePhotoModal}
        onHide={() => {
          setShowDeletePhotoModal(false);
          setErrorMessage("");
        }}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
      >
        <Modal.Body className="delete-photo-modal-body">
          <div
            className="close-button"
            onClick={() => {
              setShowDeletePhotoModal(false);
              setErrorMessage("");
            }}
          >
            <div className="close-circle-black">
              <FontAwesomeIcon icon={faTimes} className="close-icon" />
            </div>
          </div>
          <div className="delete-photo-modal-content">
            <h3 className="delete-photo-modal-text text-center">
              ¿Esta seguro que quiere eliminar esta foto?
            </h3>
            {errorMessage && (
              <p className="delete-photo-modal-error-message">{errorMessage}</p>
            )}
            {isLoading && <Loader />}

            <div className="d-flex gap-4">
              <button
                type="button"
                variant="secondary"
                onClick={handleClose}
                className="delete-photo-modal-btn"
              >
                No
              </button>

              <button
                type="submit"
                variant="primary"
                className="delete-photo-modal-btn"
                onClick={() => handleDelete()}
              >
                Si
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeletePhotoModal;
