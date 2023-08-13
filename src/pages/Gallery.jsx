import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import CreateAlbumModal from "../components/CreateAlbumModal";
import Loader from "../components/Loader";
import "./Gallery.css";

function Gallery() {
  const admin = useSelector((state) => state.admin);
  const [albums, setAlbums] = useState([]);
  const [show, setShow] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [render, setRender] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAlbums = async () => {
      try {
        setIsLoading(true);
        const response = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_API_DOMAIN}/albums`,
        });
        setAlbums(response.data);
      } catch (error) {
        console.error("Error getting albums:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getAlbums();
  }, [render]);

  const handleCreateClick = () => {
    setShow(true);
  };

  const reversedAlbums = [...albums].reverse();

  return (
    <>
      <h1 className="text-center mt-5 mb-5 gallery-text">Galería de fotos</h1>
      <div className="gallery-container mb-5">
        {isLoading && <Loader />}
        <div className="gallery-grid">
          {admin && (
            <div className="add-container" onClick={handleCreateClick}>
              <div className="gallery-album-effect-line gallery-album-effect-line2" />
              <div className="gallery-album-effect-line" />

              <div className="gallery-album-thumbnail-container">
                <p className="gallery-plus-icon">+</p>
                <h4 className="gallery-album-text">Crear album</h4>
              </div>
            </div>
          )}

          {reversedAlbums.map((album) => (
            <div className={admin ? "" : ""} key={album.id}>
              <Link to={`/album/${album.slug}`}>
                <div className="gallery-album-effect-line gallery-album-effect-line2" />
                <div className="gallery-album-effect-line" />

                <div className="gallery-album-thumbnail-container">
                  <img
                    src={`${import.meta.env.VITE_SUPABASE_IMG_URL}${
                      album.coverImage
                    }`}
                    alt={album.name}
                    className="gallery-album-thumbnail-img"
                  />

                  <h4 className="gallery-album-text">{album.name}</h4>
                </div>
              </Link>
              <p className="text-center text-white">
                {album.images.length}{" "}
                {album.images.length > 1 ? "fotos" : "foto"}
              </p>
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
