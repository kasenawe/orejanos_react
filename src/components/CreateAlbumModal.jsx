import "./CreateAlbumModal.css";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTimes } from "@fortawesome/free-solid-svg-icons";

function CreateAlbumModal({ show, setShow }) {
  const admin = useSelector((state) => state.admin);
  const [albums, setAlbums] = useState([]);
  const [newAlbumName, setNewAlbumName] = useState(""); // Nuevo estado

  const createAlbum = async () => {
    if (newAlbumName.trim() === "") {
      alert("Por favor, ingresa un nombre para el álbum.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_DOMAIN}/albums`,
        {
          name: newAlbumName,
          // Otros campos relevantes para la creación del álbum
        }
      );

      setAlbums([...albums, response.data]);
      setNewAlbumName(""); // Limpiar el campo de entrada después de la creación exitosa
    } catch (error) {
      console.error("Error al crear el álbum:", error);
      // Manejar el error de creación del álbum aquí
    }
  };

  const handleNewAlbumNameChange = (event) => {
    setNewAlbumName(event.target.value);
  };

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Body className="create-modal-body">
          <div className="close-button" onClick={() => setShow(false)}>
            <div className="close-circle-black">
              <FontAwesomeIcon icon={faTimes} className="close-icon" />
            </div>
          </div>
          <div className="create-modal-content">
            <h3 className="text-center">Crear album</h3>{" "}
            <input
              type="text"
              placeholder="Nombre del álbum"
              value={newAlbumName}
              onChange={handleNewAlbumNameChange}
              className="album-name-input"
            />
            <button className="btn-create" onClick={createAlbum}>
              Crear álbum
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateAlbumModal;
