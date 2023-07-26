import { useState } from "react";

import "./Photos.css";

function Photos() {
  const albums = [
    {
      name: "Álbum 1",
      coverImage: "/img/header1.jpg",
      images: [
        {
          src: "/img/header1.jpg",
          alt: "header1",
        },
        // Agrega más imágenes para este álbum
      ],
    },
    {
      name: "Álbum 2",
      coverImage: "/img/header4.jpg",
      images: [
        {
          src: "/img/header4.jpg",
          alt: "Maximiliano",
        },
        {
          src: "/img/Santiago.jpg",
          alt: "Santiago",
        },
        // Agrega más imágenes para este álbum
      ],
    },
    // Puedes agregar más álbumes aquí
  ];

  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const handleAlbumClick = (albumIndex) => {
    setSelectedAlbum(albumIndex);
  };

  return (
    <>
      <div className="gallery-container">
        <h1 className="text-center mb-5 gallery-text">Galería de fotos</h1>
        {selectedAlbum === null ? (
          <div className="gallery-grid">
            {albums.map((album, index) => (
              <div key={index} className="album-thumbnail">
                <img
                  src={album.coverImage}
                  alt={album.name}
                  onClick={() => handleAlbumClick(index)}
                  className="thumbnail-img"
                />
                <div className="album-caption">{album.name}</div>
              </div>
            ))}
          </div>
        ) : (
          // Mostrar las fotos del álbum seleccionado
          <>
            <button
              className="back-button"
              onClick={() => setSelectedAlbum(null)}
            >
              Volver a la galería
            </button>
            <h2>{albums[selectedAlbum].name}</h2>

            <div className="gallery-grid">
              {albums[selectedAlbum].images.map((img, index) => (
                <div key={index} className="img-thumbnail">
                  <img
                    src={img.src}
                    alt={img.alt}
                    onClick={() => handleAlbumClick(index)}
                    className="thumbnail-img"
                  />
                  <div className="img-caption">{img.alt}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Photos;
