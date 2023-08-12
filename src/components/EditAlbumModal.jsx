import "./EditAlbumModal.css";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function EditAlbumModal({ showEdit, setShowEdit }) {
  const handleClose = () => {
    setShowEdit(false);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        size="md"
        show={showEdit}
        onHide={() => {
          setShowEdit(false);
          setErrorMessage("");
        }}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
      >
        <Modal.Body className="edit-album-modal-body">
          <div
            className="close-button"
            onClick={() => {
              setShowEdit(false);
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
              <Button
                variant="secondary"
                onClick={handleClose}
                className="edit-album-modal-btn"
              >
                Aceptar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditAlbumModal;
