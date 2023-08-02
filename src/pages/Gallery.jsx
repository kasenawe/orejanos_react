import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Gallery.css";

function Gallery() {
  const [albums, setAlbums] = useState([]);

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
          {albums.map((album) => (
            <Link to={`/album/${album.slug}`} key={album.id}>
              <div className="album-thumbnail-container my-4">
                <img
                  src={`/img/${album.coverImage}`}
                  alt={album.name}
                  className="album-thumbnail-img"
                />
                <h4 className="album-text">{album.name}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Gallery;