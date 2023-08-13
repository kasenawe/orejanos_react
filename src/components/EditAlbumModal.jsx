import "./EditAlbumModal.css";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function EditAlbumModal({
  showEditModal,
  setShowEditModal,
  render,
  setRender,
}) {
  const handleClose = () => {
    setShowEditModal(false);
    setRender(render + 1);
  };

  return (
    <>
      <Modal
        size="md"
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false);
          setErrorMessage("");
        }}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
      >
        <Modal.Body className="edit-album-modal-body">
          <div
            className="close-button"
            onClick={() => {
              setShowEditModal(false);
              setErrorMessage("");
            }}
          >
            <div className="close-circle-black">
              <FontAwesomeIcon icon={faTimes} className="close-icon" />
            </div>
          </div>
          <div className="edit-album-modal-content">
            <h3 className="edit-album-modal-text text-center">
              ¡Ha cambiado de nombre el album exitosamente!
            </h3>

            <div className="d-flex">
              <button
                variant="secondary"
                onClick={handleClose}
                className="edit-album-modal-btn"
              >
                Aceptar
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditAlbumModal;
