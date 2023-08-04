import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import "./Gallery.css";

function Gallery() {
  const [albums, setAlbums] = useState([]);
  const admin = useSelector((state) => state.admin);

  useEffect(() => {
    const getAlbums = async () => {
      const response = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_DOMAIN}/albums`,
      });
      setAlbums(response.data);
    };
    getAlbums();
  }, []);

  return (
    <>
      <h1 className="text-center mt-5 mb-5 gallery-text">Galería de fotos</h1>
      <div className="gallery-container mb-5">
        <div className="gallery-grid">
          {admin && (
            <div className="add-container">
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
                    src={`/img/${album.coverImage}`}
                    alt={album.name}
                    className="album-thumbnail-img"
                  />
                  <h4 className="album-text">{album.name}</h4>
                </div>
              </Link>
              {admin && (
                <div className="d-flex justify-content-center">
                  <button className="btn-delete mb-1">Eliminar album</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Gallery;
