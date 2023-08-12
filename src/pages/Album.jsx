import { useState, useEffect } from "react";
import React from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PhotoModal from "./PhotoModal";
import DeleteAlbumModal from "../components/deleteAlbumModal";
import axios from "axios";

import "./Album.css";

function Album() {
  const params = useParams();
  const [album, setAlbum] = useState({});
  const admin = useSelector((state) => state.admin);
  const [errorMessage, setErrorMessage] = useState("");
  const [nameValue, setName] = useState("");

  useEffect(() => {
    const getAlbum = async () => {
      const response = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_DOMAIN}/album/${params.name}`,
      });
      setAlbum(response.data.album);
      setName(response.data.album.name);
    };
    getAlbum();
  }, []);

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [show, setShow] = useState(null);

  const handlePhotoClick = (photoIndex) => {
    setSelectedPhotoIndex(photoIndex);
    setShow(true);
  };

  const [showDelete, setShowDelete] = useState(null);

  const handleDeleteClick = () => {
    setShowDelete(true);
  };

  const handleEditAlbum = async (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    try {
      const response = await axios({
        method: "PATCH", // Utiliza el método HTTP adecuado para actualizar
        url: `${import.meta.env.VITE_API_DOMAIN}/admin/album/edit/${album.id}`,
        data: {
          name: nameValue, // Utiliza el nuevo valor del nombre
        },
        headers: {
          Authorization: "Bearer " + admin.token,
        },
      });

      // Actualiza el estado del álbum con el nuevo nombre
      setAlbum((prevAlbum) => ({
        ...prevAlbum,
        name: nameValue,
      }));

      // Opcional: Podrías mostrar un mensaje de éxito aquí si lo deseas
    } catch (error) {
      // Maneja el error aquí (puedes mostrar un mensaje de error, por ejemplo)
      console.error("Error updating album name:", error);
      setErrorMessage("Error updating album name.");
    }
  };

  return (
    <div className="album-container">
      <div className="album-button-container">
        <Link to="/galeria">
          <button className="album-button">VOLVER</button>
        </Link>
        {admin && album && (
          <Link>
            <button
              className="album-btn-delete-2"
              onClick={() => handleDeleteClick()}
            >
              ELIMINAR
            </button>
          </Link>
        )}
      </div>

      {album && admin ? (
        <Form onSubmit={handleEditAlbum} className="album-edit-form gap-2">
          <Form.Label htmlFor="name" className="album-edit-label">
            Nombre del album:
          </Form.Label>
          <Form.Control
            type="text"
            id="name"
            value={nameValue}
            onChange={(event) => setName(event.target.value)}
            className="album-edit-input"
          />
          <Button type="submit" className="album-button">
            Guardar cambios
          </Button>{" "}
          {/* Botón para guardar cambios */}
        </Form>
      ) : (
        <h2 className="text-center gallery-text mt-4 mb-5">{album.name}</h2>
      )}

      <div className="album-photo-grid">
        {album &&
          album.images &&
          album.images.map((img, index) => (
            <React.Fragment key={index}>
              <div
                className="album-photo-thumbnail-container"
                onClick={() => setShow(true)}
              >
                <img
                  src={`${import.meta.env.VITE_SUPABASE_IMG_URL}${img.src}`}
                  alt={img.alt}
                  onClick={() => handlePhotoClick(index)}
                  className="album-photo-thumbnail-img"
                />
                <div className="img-caption">{img.alt}</div>
              </div>

              <PhotoModal
                key={`modal-${index}`}
                show={show}
                setShow={setShow}
                images={album.images} // Pasar todas las imágenes del álbum a PhotoModal
                selectedPhotoIndex={selectedPhotoIndex}
                setSelectedPhotoIndex={setSelectedPhotoIndex}
              />
              <DeleteAlbumModal
                showDelete={showDelete}
                setShowDelete={setShowDelete}
                album={album}
              />
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}

export default Album;
