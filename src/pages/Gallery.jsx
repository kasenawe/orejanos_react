import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import CreateAlbumModal from "../components/CreateAlbumModal";
import "./Gallery.css";

function Gallery() {
  const admin = useSelector((state) => state.admin);
  const [albums, setAlbums] = useState([]);
  const [show, setShow] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [render, setRender] = useState(0);

  useEffect(() => {
    const getAlbums = async () => {
      const response = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_DOMAIN}/albums`,
      });
      setAlbums(response.data);
    };
    getAlbums();
  }, [render]);

  const handleCreateClick = () => {
    setShow(true);
  };

  const handleDelete = async (album) => {
    try {
      const imageFilename = album.coverImage;

      // Eliminar la imagen de Supabase
      await axios({
        method: "DELETE",
        url: `${
          import.meta.env.VITE_API_DOMAIN
        }/admin/album/delete-image/${imageFilename}`,
        headers: {
          Authorization: "Bearer " + admin.token,
        },
      });

      await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_API_DOMAIN}/admin/album/${album.id}`,

        headers: {
          Authorization: "Bearer " + admin.token,
        },
      });
      setRender(render + 1);
    } catch (error) {
      console.error("Error al eliminar el álbum:", error);
      setErrorMessage(
        "Error al eliminar el álbum. Por favor, inténtalo nuevamente."
      );
    }
  };

  return (
    <>
      <h1 className="text-center mt-5 mb-5 gallery-text">Galería de fotos</h1>
      <div className="gallery-container mb-5">
        <div className="gallery-grid">
          {admin && (
            <div className="add-container" onClick={handleCreateClick}>
              <div className="album-effect-line album-effect-line2" />
              <div className="album-effect-line" />

              <div className="album-thumbnail-container">
                <p className="plus-icon">+</p>
                <h4 className="album-text">Crear album</h4>
              </div>
            </div>
          )}

          {albums.map((album) => (
            <div className={admin ? "" : ""} key={album.id}>
              <Link to={`/album/${album.slug}`}>
                <div className="album-effect-line album-effect-line2" />
                <div className="album-effect-line" />

                <div className="album-thumbnail-container">
                  <img
                    src={`${import.meta.env.VITE_SUPABASE_IMG_URL}${
                      album.coverImage
                    }`}
                    alt={album.name}
                    className="album-thumbnail-img"
                  />
                  <h4 className="album-text">{album.name}</h4>
                </div>
              </Link>
              {admin && (
                <div className="d-flex justify-content-center">
                  <button
                    className="btn-delete mb-1"
                    onClick={() => handleDelete(album)}
                  >
                    Eliminar album
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <CreateAlbumModal
        show={show}
        setShow={setShow}
        render={render}
        setRender={setRender}
      />
    </>
  );
}

export default Gallery;
