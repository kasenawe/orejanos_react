import { useState, useEffect } from "react";
import React from "react";
import PhotoModal from "./PhotoModal";
import axios from "axios";

import "./Photos.css";

function Photos() {
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

  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [selectedPhotoAlt, setSelectedPhotoAlt] = useState(null);
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState(null);

  const [show, setShow] = useState(null);

  const handleAlbumClick = (albumIndex) => {
    setSelectedAlbum(albumIndex);
  };
  const handlePhotoClick = (photoIndex) => {
    setSelectedPhotoIndex(photoIndex);
    setSelectedPhotoAlt(albums[selectedAlbum].images[photoIndex].alt);
    setSelectedPhotoUrl(albums[selectedAlbum].images[photoIndex].src);
    setShow(true);
  };

  return (
    <>
      <h1 className="text-center mt-5 mb-5 gallery-text">Galería de fotos</h1>
      <div className="gallery-container mb-5">
        {selectedAlbum === null ? (
          <div className="gallery-grid">
            {albums.map((album, index) => (
              <div
                key={index}
                className="album-thumbnail-container my-4"
                onClick={() => handleAlbumClick(index)}
              >
                <img
                  src={`/img/${album.coverImage}`}
                  alt={album.name}
                  className="album-thumbnail-img"
                />
                <h4 className="album-text">{album.name}</h4>
              </div>
            ))}
          </div>
        ) : (
          // Mostrar las fotos del álbum seleccionado
          <>
            <button
              className="button-gallery"
              onClick={() => setSelectedAlbum(null)}
            >
              VOLVER
            </button>
            <h2 className="gallery-text mt-4">{albums[selectedAlbum].name}</h2>

            <div className="photo-grid">
              {albums[selectedAlbum].images.map((img, index) => (
                <React.Fragment key={index}>
                  <div
                    className="photo-thumbnail-container"
                    onClick={() => setShow(true)}
                  >
                    <img
                      src={`/img/${img.src}`}
                      alt={img.alt}
                      onClick={() => handlePhotoClick(index)}
                      className="photo-thumbnail-img"
                    />
                    <div className="img-caption">{img.alt}</div>
                  </div>
                  <PhotoModal
                    key={`modal-${selectedAlbum}-${index}`}
                    show={show}
                    setShow={setShow}
                    alt={selectedPhotoAlt}
                    url={selectedPhotoUrl}
                    images={albums[selectedAlbum].images} // Pasar todas las imágenes del álbum a PhotoModal
                    selectedPhotoIndex={selectedPhotoIndex}
                    setSelectedPhotoIndex={setSelectedPhotoIndex}
                  />
                </React.Fragment>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Photos;
