import "./DeleteAlbumModal.css";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";

function DeleteArticleModal({
  showDelete,
  setShowDelete,
  render,
  setRender,
  articleIdToDelete,
}) {
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
        url: `${
          import.meta.env.VITE_API_DOMAIN
        }/api/article/delete/${articleIdToDelete}`,

        headers: {
          Authorization: "Bearer " + admin.token,
        },
      });
    } catch (error) {
      console.error("Error al eliminar la publicacion:", error);
      setErrorMessage(
        "Error al eliminar la publicacion. Por favor, inténtalo nuevamente."
      );
    } finally {
      setIsLoading(false);
      setRender(render + 1);
      setShowDelete(false);
      navigate("/admins/publicaciones");
    }
  };

  return (
    <>
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
              ¿Esta seguro que quiere eliminar esta publicacion?
            </h3>
            {errorMessage && (
              <p className="delete-album-modal-error-message">{errorMessage}</p>
            )}
            {isLoading && <Loader />}

            <div className="d-flex gap-4">
              <button
                variant="secondary"
                onClick={handleClose}
                className="delete-album-modal-btn"
              >
                No
              </button>

              <button
                type="submit"
                variant="primary"
                className="delete-album-modal-btn"
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

export default DeleteArticleModal;
