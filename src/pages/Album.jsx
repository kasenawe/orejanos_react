import { useState, useEffect } from "react";
import React from "react";
import { useParams, Link } from "react-router-dom";
import PhotoModal from "./PhotoModal";
import axios from "axios";

import "./Album.css";

function Album() {
  const params = useParams();
  const [album, setAlbum] = useState({});

  useEffect(() => {
    const getAlbum = async () => {
      console.log(params);
      const response = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_DOMAIN}/album/${params.name}`,
      });
      setAlbum(response.data.album);
    };
    getAlbum();
  }, []);

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [show, setShow] = useState(null);

  const handlePhotoClick = (photoIndex) => {
    setSelectedPhotoIndex(photoIndex);
    setShow(true);
  };

  return (
    <div className="album-container">
      <Link to={`/galeria`} key={album.id}>
        <button className="button-gallery">VOLVER</button>
      </Link>

      {album && (
        <h2 className="text-center gallery-text mt-4 mb-5">{album.name}</h2>
      )}

      <div className="photo-grid">
        {album.images &&
          album.images.map((img, index) => (
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
                key={`modal-${index}`}
                show={show}
                setShow={setShow}
                images={album.images} // Pasar todas las imágenes del álbum a PhotoModal
                selectedPhotoIndex={selectedPhotoIndex}
                setSelectedPhotoIndex={setSelectedPhotoIndex}
              />
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}

export default Album;
